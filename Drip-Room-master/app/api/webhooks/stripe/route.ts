import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { finalizeOrderInventory, releaseCheckoutReservations } from '@/lib/inventory/reservations';
import { incrementCouponUsage } from '@/lib/orders/order-service';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  // 1. Read raw body as text for cryptographic signature check
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown'}` },
      { status: 400 }
    );
  }

  // 2. Idempotency Check via webhook_events table
  const { data: existingEvent } = await supabaseAdmin
    .from('webhook_events')
    .select('id, processed_at')
    .eq('event_id', event.id)
    .single();

  if (existingEvent) {
    if (existingEvent.processed_at) {
      // Event has already been completely handled. Acknowledge immediately.
      return NextResponse.json({ received: true, message: 'Already processed' }, { status: 200 });
    }
  } else {
    // Record event in table
    await supabaseAdmin.from('webhook_events').insert({
      event_id: event.id,
      event_type: event.type,
      payload: event as unknown as Record<string, unknown>,
    });
  }

  // 3. Process Events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;
        const cartId = session.metadata?.cart_id;
        const couponId = session.metadata?.coupon_id;

        if (!orderId) {
          console.warn('Checkout session missing order_id in metadata');
          break;
        }

        // Verify that payment actually succeeded
        if (session.payment_status === 'paid') {
          // Extract customer details & shipping
          const customerDetails = session.customer_details;
          const shippingDetails = (session as any).shipping_details;

          // A. Mark order as paid
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'paid',
              payment_status: 'paid',
              fulfillment_status: 'processing',
              paid_at: new Date().toISOString(),
              customer_email: customerDetails?.email || session.customer_email || undefined,
              customer_name: customerDetails?.name || undefined,
              customer_phone: customerDetails?.phone || undefined,
              shipping_address: shippingDetails?.address || undefined,
              billing_address: customerDetails?.address || undefined,
              stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
            })
            .eq('id', orderId);

          // B. Finalize inventory: convert reservations and set products to sold_out
          await finalizeOrderInventory(orderId);

          // C. Clear the cart items if cart_id is available
          if (cartId) {
            await supabaseAdmin.from('cart_items').delete().eq('cart_id', cartId);
          }

          // D. Increment coupon usage count if a coupon was used
          if (couponId) {
            await incrementCouponUsage(couponId);
          }

          console.log(`[ORDER FULFILLED] Order ${orderId} (${session.metadata?.order_number}) successfully marked paid.`);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;

        // Release inventory reservation back to active status
        await releaseCheckoutReservations(session.id);

        if (orderId) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'cancelled',
              payment_status: 'failed',
              notes: 'Stripe Checkout session expired before completion.',
            })
            .eq('id', orderId);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { data: order } = await supabaseAdmin
          .from('orders')
          .select('id')
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .single();

        if (order) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'payment_failed',
              payment_status: 'failed',
              notes: paymentIntent.last_payment_error?.message || 'Payment failed',
            })
            .eq('id', order.id);
        }
        break;
      }

      default:
        // Ignore unhandled event types gracefully
        break;
    }

    // Mark event as processed
    await supabaseAdmin
      .from('webhook_events')
      .update({ processed_at: new Date().toISOString() })
      .eq('event_id', event.id);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (processError) {
    console.error('Error handling webhook business logic:', processError);
    return NextResponse.json(
      { error: 'Error processing webhook event' },
      { status: 500 }
    );
  }
}
