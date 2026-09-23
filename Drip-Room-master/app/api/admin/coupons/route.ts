import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { AdminCreateCouponSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function GET() {
  try {
    await requireAdmin();

    const { data: coupons, error } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(coupons || []);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const json = await request.json();
    const parseResult = AdminCreateCouponSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .insert(parseResult.data)
      .select('*')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: 'Coupon created successfully.', coupon }, 201);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
