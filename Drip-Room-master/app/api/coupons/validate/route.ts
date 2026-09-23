import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ValidateCouponSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parseResult = ValidateCouponSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { code, order_subtotal } = parseResult.data;

    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .eq('active', true)
      .single();

    if (error || !coupon) {
      return apiError('Invalid or expired coupon code.', 404);
    }

    const now = new Date();
    if (coupon.starts_at && new Date(coupon.starts_at) > now) {
      return apiError('This coupon is not active yet.', 400);
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < now) {
      return apiError('This coupon has expired.', 400);
    }

    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return apiError('Coupon usage limit reached.', 400);
    }

    if (coupon.minimum_order_value && order_subtotal < coupon.minimum_order_value) {
      return apiError(
        `This coupon requires a minimum bag value of £${(coupon.minimum_order_value / 100).toFixed(2)}.`,
        400
      );
    }

    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = Math.round((order_subtotal * coupon.value) / 100);
    } else {
      discountAmount = Math.min(coupon.value, order_subtotal);
    }

    return apiSuccess({
      valid: true,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discountAmount,
      formattedDiscount: coupon.type === 'percentage' ? `${coupon.value}% OFF` : `£${(coupon.value / 100).toFixed(2)} OFF`,
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
