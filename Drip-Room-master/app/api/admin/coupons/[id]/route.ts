import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = params;
    const body = await request.json();

    const allowedFields = ['active', 'usage_limit', 'expires_at', 'minimum_order_value'];
    const updatePayload: Record<string, unknown> = {};

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updatePayload[key] = body[key];
      }
    }

    const { data: updated, error } = await supabaseAdmin
      .from('coupons')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: 'Coupon updated', coupon: updated });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
