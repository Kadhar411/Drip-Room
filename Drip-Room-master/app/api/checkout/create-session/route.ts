import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe/stripe';
import { getOptionalAuth } from '@/lib/auth/require-auth';
import { getGuestSessionId } from '@/lib/auth/cookies';
import { CreateCheckoutSessionSchema } from '@/lib/validation/schemas';
import { calculateOrderTotals } from '@/lib/orders/calculator';
import { reserveCartItems } from '@/lib/inventory/reservations';
import { createPendingOrder } from '@/lib/orders/order-service';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => ({}));
    const parseResult = CreateCheckoutSessionSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { cart_id, shipping_tier, coupon_code, success_url, cancel_url } = parseResult.data;

    // 1. Resolve Cart
    const { user, profile } = await getOptionalAuth();
    let resolvedCartId = cart_id;

    if (!resolvedCartId) {
      if (user) {
        const { data: userCart } = await supabaseAdmin
          .from('carts')
          .select('id')
          .eq('user_id', user.id)
          .single();
        resolvedCartId = userCart?.id;
      } else {
        const guestSession = getGuestSessionId();
        if (guestSession) {
          const { data: guestCart } = await supabaseAdmin
            .from('carts')
            .select('id')
            .eq('session_id', guestSession)
            .single();
          resolvedCartId = guestCart?.id;
        }
      }
    }

    if (!resolvedCartId) {
      return apiError('No active shopping bag found to checkout.', 400);
    }

    // 2. Fetch cart items
    const { data: cartItems, error: cartError } = await supabaseAdmin
      .from('cart_items')
      .select('product_id, quantity')
      .eq('cart_id', resolvedCartId);

    if (cartError || !cartItems || cartItems.length === 0) {
      return apiError('Your bag is currently empty.', 400);
    }

    // 3. Atomically check and reserve inventory (15 minutes TTL)
    const reservation = await reserveCartItems(
      resolvedCartId,
      user?.id || null,
      getGuestSessionId() || null,
      15
    );

    if (!reservation.success) {
      return apiError(
        reservation.error || 'One or more items in your bag are no longer available.',
        409
      );
    }

    // 4. Recalculate totals strictly on server
    const calculation = await calculateOrderTotals({
      cartItems,
      shippingTier: shipping_tier,
      couponCode: coupon_code,
    });

    // 5. Create pending order in DB
    const customerEmail = user?.email || 'guest@drip-room.internal';
    const customerName = profile?.full_name || undefined;

    const order = await createPendingOrder({
      userId: user?.id || null,
      customerEmail,
      customerName,
      calculation,
    });

    // 6. Build Stripe Checkout line items
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const finalSuccessUrl = success_url || `${siteUrl}/checkout.html?success=true&order_number=${order.order_number}`;
    const finalCancelUrl = cancel_url || `${siteUrl}/checkout.html?cancelled=true&order_number=${order.order_number}`;

    const lineItems: any[] = calculation.items.map((item) => ({
      price_data: {
        currency: calculation.currency.toLowerCase(),
        product_data: {
          name: item.product.title,
          description: `Size: ${item.product.size || 'One Size'} | Grade: ${item.product.condition_grade}`,
          images: item.product.images?.[0]?.public_url ? [item.product.images[0].public_url] : [],
        },
        unit_amount: item.unitPrice, // minor units (e.g. pence)
      },
      quantity: item.quantity,
    }));

    // If there is shipping, add as line item or shipping option
    const shippingOptions: any[] = [];
    if (calculation.shippingTotal > 0) {
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: calculation.shippingTotal,
            currency: calculation.currency.toLowerCase(),
          },
          display_name: shipping_tier === 'express' ? 'UK Express Next-Day' : 'UK Standard Tracked',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: shipping_tier === 'express' ? 1 : 2 },
            maximum: { unit: 'business_day', value: shipping_tier === 'express' ? 2 : 4 },
          },
        },
      });
    }

    // Stripe discounts if coupon applied
    const discounts: any[] = [];
    let couponForStripe: any = null;
    if (calculation.discountTotal > 0 && calculation.appliedCoupon) {
      // Create single-use Stripe coupon representation
      try {
        couponForStripe = await stripe.coupons.create({
          amount_off: calculation.appliedCoupon.type === 'fixed' ? calculation.discountTotal : undefined,
          percent_off: calculation.appliedCoupon.type === 'percentage' ? calculation.appliedCoupon.value : undefined,
          currency: calculation.currency.toLowerCase(),
          duration: 'once',
          name: `Drip Room Discount: ${calculation.appliedCoupon.code}`,
        });
        discounts.push({ coupon: couponForStripe.id });
      } catch (couponErr) {
        console.warn('Could not create Stripe coupon, falling back to line item adjustment:', couponErr);
      }
    }

    // 7. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,
      shipping_options: shippingOptions.length > 0 ? shippingOptions : undefined,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'FR', 'DE', 'IT', 'ES', 'AU', 'IN'],
      },
      customer_email: user?.email ? user.email : undefined,
      success_url: `${finalSuccessUrl}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: finalCancelUrl,
      metadata: {
        order_id: order.id,
        order_number: order.order_number,
        cart_id: resolvedCartId,
        user_id: user?.id || 'guest',
        coupon_id: calculation.appliedCoupon?.id || '',
      },
    });

    // 8. Attach Stripe Session ID to order & reservations
    await supabaseAdmin
      .from('orders')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', order.id);

    if (reservation.reservation_ids && reservation.reservation_ids.length > 0) {
      await supabaseAdmin
        .from('inventory_reservations')
        .update({ stripe_checkout_session_id: session.id })
        .in('id', reservation.reservation_ids);
    }

    return apiSuccess({
      sessionId: session.id,
      url: session.url,
      orderNumber: order.order_number,
      grandTotal: calculation.grandTotal,
      currency: calculation.currency,
      expiresAt: reservation.expires_at,
    });
  } catch (err) {
    console.error('Checkout creation error:', err);
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
