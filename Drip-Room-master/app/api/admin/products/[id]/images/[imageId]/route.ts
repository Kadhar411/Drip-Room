import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    id: string; // product_id
    imageId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id: productId, imageId } = params;

    // 1. Fetch image record to retrieve storage_path
    const { data: image, error: fetchError } = await supabaseAdmin
      .from('product_images')
      .select('*')
      .eq('id', imageId)
      .eq('product_id', productId)
      .single();

    if (fetchError || !image) {
      return apiError('Image not found', 404);
    }

    // 2. Remove file from storage
    if (image.storage_path) {
      await supabaseAdmin.storage
        .from('product-images')
        .remove([image.storage_path]);
    }

    // 3. Remove record from database
    const { error: deleteError } = await supabaseAdmin
      .from('product_images')
      .delete()
      .eq('id', imageId);

    if (deleteError) {
      return apiError(deleteError.message, 500);
    }

    return apiSuccess({
      message: 'Product image successfully removed.',
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
