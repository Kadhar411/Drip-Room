import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiPaginated, apiError } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('payment_status');
    const fulfillmentStatus = searchParams.get('fulfillment_status');
    const search = searchParams.get('search');

    let query = supabaseAdmin
      .from('orders')
      .select('*, items:order_items(*)', { count: 'exact' });

    if (status) query = query.eq('status', status);
    if (paymentStatus) query = query.eq('payment_status', paymentStatus);
    if (fulfillmentStatus) query = query.eq('fulfillment_status', fulfillmentStatus);
    if (search) {
      query = query.or(`order_number.ilike.%${search}%,customer_email.ilike.%${search}%,customer_name.ilike.%${search}%`);
    }

    query = query.order('created_at', { ascending: false });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: orders, error, count } = await query;

    if (error) {
      return apiError(error.message, 500);
    }

    return apiPaginated(
      orders || [],
      { page, limit, total: count || 0 },
      { status, paymentStatus, fulfillmentStatus, search }
    );
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
