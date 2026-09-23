import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = params;

    if (!slug) {
      return apiError('Product slug is required', 400);
    }

    // Fetch product with brand, category, and images
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .select('*, brand:brands(*), category:categories(*), images:product_images(*)')
      .eq('slug', slug)
      .single();

    if (error || !product) {
      return apiError('Product not found', 404);
    }

    // Hide draft or archived products from public
    if (product.status === 'draft' || product.status === 'archived') {
      return apiError('Product not found or unavailable', 404);
    }

    // Sort images by sort_order
    product.images = (product.images || []).sort(
      (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    );

    // Fetch related products (same category or brand, excluding current product)
    const { data: related } = await supabaseAdmin
      .from('products')
      .select('*, brand:brands(*), category:categories(*), images:product_images(*)')
      .eq('category_id', product.category_id)
      .neq('id', product.id)
      .in('status', ['active', 'reserved'])
      .limit(4);

    return apiSuccess({
      product,
      related: related || [],
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
