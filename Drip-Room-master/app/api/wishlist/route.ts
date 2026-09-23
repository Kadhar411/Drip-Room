import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth/require-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const { user } = await requireAuth();

    const { data: wishlist, error } = await supabaseAdmin
      .from('wishlists')
      .select('*, product:products(*, brand:brands(*), category:categories(*), images:product_images(*))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(wishlist || []);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAuth();
    const json = await request.json();
    const productId = json.product_id;

    if (!productId) {
      return apiError('Product ID is required', 400);
    }

    // Insert or ignore if duplicate
    const { data, error } = await supabaseAdmin
      .from('wishlists')
      .upsert({
        user_id: user.id,
        product_id: productId,
      })
      .select('*, product:products(*)')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Added to wishlist',
      item: data,
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
