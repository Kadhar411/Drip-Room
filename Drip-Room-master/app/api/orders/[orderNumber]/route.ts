import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth/require-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    orderNumber: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { user, profile } = await requireAuth();
    const { orderNumber } = params;

    if (!orderNumber) {
      return apiError('Order number is required', 400);
    }

    let query = supabaseAdmin
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('order_number', orderNumber);

    // If not admin, restrict to user_id
    if (profile.role !== 'admin') {
      query = query.eq('user_id', user.id);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      return apiError('Order not found or access denied.', 404);
    }

    return apiSuccess(order);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
