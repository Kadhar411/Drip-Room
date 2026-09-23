import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    // 1. Total orders count
    const { count: totalOrders } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true });

    // 2. Paid revenue
    const { data: paidOrders } = await supabaseAdmin
      .from('orders')
      .select('grand_total')
      .eq('payment_status', 'paid');

    const paidRevenue = (paidOrders || []).reduce((acc, curr) => acc + (curr.grand_total || 0), 0);

    // 3. Orders today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const { count: ordersToday } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfToday.toISOString());

    // 4. Products by status
    const { count: activeProducts } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { count: soldProducts } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'sold_out');

    const { count: lowStockProducts } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .lte('quantity', 1);

    // 5. Recent 5 orders
    const { data: recentOrders } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    return apiSuccess({
      metrics: {
        totalOrders: totalOrders || 0,
        paidRevenue,
        ordersToday: ordersToday || 0,
        activeProducts: activeProducts || 0,
        soldProducts: soldProducts || 0,
        lowStockProducts: lowStockProducts || 0,
        currency: process.env.STORE_CURRENCY || 'GBP',
      },
      recentOrders: recentOrders || [],
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
