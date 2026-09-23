import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth/require-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    productId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { user } = await requireAuth();
    const { productId } = params;

    const { error } = await supabaseAdmin
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Removed from wishlist',
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
