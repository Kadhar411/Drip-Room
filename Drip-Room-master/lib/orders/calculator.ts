import { supabaseAdmin } from '../supabase/admin';
import { getShippingRate } from '../stripe/config';
import { Coupon, Product } from '../../types/database';

export interface CalculatedCartItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number; // Server-fetched price in minor units
  lineTotal: number;
}

export interface OrderCalculationResult {
  items: CalculatedCartItem[];
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  taxTotal: number;
  grandTotal: number;
  currency: string;
  appliedCoupon: Coupon | null;
}

/**
 * Validates and calculates order totals strictly server-side.
 */
export async function calculateOrderTotals(params: {
  cartItems: Array<{ product_id: string; quantity: number }>;
  shippingTier?: string;
  couponCode?: string;
}): Promise<OrderCalculationResult> {
  const { cartItems, shippingTier = 'standard', couponCode } = params;

  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart cannot be empty for checkout calculation.');
  }

  // 1. Fetch latest canonical products directly from database
  const productIds = cartItems.map((item) => item.product_id);
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('*, brand:brands(*), category:categories(*), images:product_images(*)')
    .in('id', productIds);

  if (error || !products) {
    throw new Error('Failed to retrieve product details from database.');
  }

  const productMap = new Map<string, Product>();
  products.forEach((p) => productMap.set(p.id, p as Product));

  let subtotal = 0;
  const items: CalculatedCartItem[] = [];

  for (const item of cartItems) {
    const product = productMap.get(item.product_id);

    if (!product) {
      throw new Error(`Product ${item.product_id} no longer exists.`);
    }

    if (product.status !== 'active' && product.status !== 'reserved') {
      throw new Error(`Item "${product.title}" is ${product.status.replace('_', ' ')}.`);
    }

    // For 1-of-1 products, enforce quantity of 1
    const qty = product.is_one_of_one ? 1 : Math.max(1, item.quantity);
    const lineTotal = product.price * qty;

    subtotal += lineTotal;

    items.push({
      productId: product.id,
      product,
      quantity: qty,
      unitPrice: product.price,
      lineTotal,
    });
  }

  // 2. Validate Coupon if provided
  let discountTotal = 0;
  let appliedCoupon: Coupon | null = null;

  if (couponCode) {
    const { data: coupon } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase().trim())
      .eq('active', true)
      .single();

    if (coupon) {
      const now = new Date();
      const startsAt = coupon.starts_at ? new Date(coupon.starts_at) : null;
      const expiresAt = coupon.expires_at ? new Date(coupon.expires_at) : null;

      const isValidTime = (!startsAt || startsAt <= now) && (!expiresAt || expiresAt >= now);
      const isUnderLimit = !coupon.usage_limit || coupon.usage_count < coupon.usage_limit;
      const meetsMinOrder = !coupon.minimum_order_value || subtotal >= coupon.minimum_order_value;

      if (isValidTime && isUnderLimit && meetsMinOrder) {
        appliedCoupon = coupon as Coupon;
        if (coupon.type === 'percentage') {
          discountTotal = Math.round((subtotal * coupon.value) / 100);
        } else if (coupon.type === 'fixed') {
          discountTotal = Math.min(coupon.value, subtotal);
        }
      }
    }
  }

  // 3. Calculate Shipping
  const taxableSubtotal = Math.max(0, subtotal - discountTotal);
  const shipping = getShippingRate(shippingTier, taxableSubtotal);
  const shippingTotal = shipping.amount;

  // 4. Tax (VAT included in UK prices, tax_total = 0 or calculated as needed)
  const taxTotal = 0;

  // 5. Grand Total (never negative)
  const grandTotal = Math.max(0, subtotal - discountTotal + shippingTotal + taxTotal);
  const currency = items[0]?.product.currency || process.env.STORE_CURRENCY || 'GBP';

  return {
    items,
    subtotal,
    discountTotal,
    shippingTotal,
    taxTotal,
    grandTotal,
    currency,
    appliedCoupon,
  };
}
