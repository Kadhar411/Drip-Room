import { supabaseAdmin } from '../supabase/admin';
import { OrderCalculationResult } from './calculator';
import { Order } from '../../types/database';
import crypto from 'crypto';

export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `DRIP-${dateStr}-${randomSuffix}`;
}

export async function createPendingOrder(params: {
  userId: string | null;
  customerEmail: string;
  customerName?: string;
  calculation: OrderCalculationResult;
  stripeSessionId?: string;
}): Promise<Order> {
  const { userId, customerEmail, customerName, calculation, stripeSessionId } = params;
  const orderNumber = generateOrderNumber();

  // 1. Insert master order row
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: userId,
      customer_email: customerEmail,
      customer_name: customerName || null,
      status: 'pending',
      payment_status: 'unpaid',
      fulfillment_status: 'unfulfilled',
      currency: calculation.currency,
      subtotal: calculation.subtotal,
      discount_total: calculation.discountTotal,
      shipping_total: calculation.shippingTotal,
      tax_total: calculation.taxTotal,
      grand_total: calculation.grandTotal,
      stripe_checkout_session_id: stripeSessionId || null,
    })
    .select('*')
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order record: ${orderError?.message}`);
  }

  // 2. Insert immutable order_items records with full product snapshots
  const orderItemsPayload = calculation.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_title: item.product.title,
    product_slug: item.product.slug,
    product_image_url: item.product.images?.[0]?.public_url || null,
    brand_name: item.product.brand?.name || null,
    size: item.product.size || null,
    condition_grade: item.product.condition_grade || null,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    line_total: item.lineTotal,
    product_snapshot: {
      id: item.product.id,
      title: item.product.title,
      slug: item.product.slug,
      price: item.product.price,
      condition_grade: item.product.condition_grade,
      condition_notes: item.product.condition_notes,
      defects: item.product.defects,
      measurements: item.product.measurements,
      material: item.product.material,
      era_or_year: item.product.era_or_year,
      brand: item.product.brand?.name,
      category: item.product.category?.name,
    },
  }));

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItemsPayload);

  if (itemsError) {
    console.error('Error inserting order items:', itemsError);
  }

  return order as Order;
}

export async function incrementCouponUsage(couponId: string): Promise<void> {
  const { error } = await supabaseAdmin.rpc('increment_coupon_usage', { p_coupon_id: couponId });
  if (error) {
    // If RPC doesn't exist, fallback to direct increment
    const { data: coupon } = await supabaseAdmin
      .from('coupons')
      .select('usage_count')
      .eq('id', couponId)
      .single();

    await supabaseAdmin
      .from('coupons')
      .update({ usage_count: (coupon?.usage_count ?? 0) + 1 })
      .eq('id', couponId);
  }
}
