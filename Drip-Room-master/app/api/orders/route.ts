import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth/require-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { user } = await requireAuth();

    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(orders || []);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
