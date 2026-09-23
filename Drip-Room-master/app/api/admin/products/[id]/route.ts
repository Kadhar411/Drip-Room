import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ProductUpdateSchema } from '@/lib/validation/schemas';
import { slugify } from '@/lib/utils/slugify';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = params;

    const json = await request.json();
    const parseResult = ProductUpdateSchema.safeParse(json);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const payload = parseResult.data;

    // If updating slug, format it
    const updatePayload: Record<string, unknown> = {
      ...payload,
      updated_at: new Date().toISOString(),
    };

    if (payload.slug) {
      updatePayload.slug = slugify(payload.slug);
    }

    // If activating product, check that at least one image exists
    if (payload.status === 'active') {
      const { count: imageCount } = await supabaseAdmin
        .from('product_images')
        .select('*', { count: 'exact', head: true })
        .eq('product_id', id);

      if (!imageCount || imageCount === 0) {
        return apiError('Product must have at least one image before it can be published as active.', 400);
      }

      updatePayload.published_at = new Date().toISOString();
    }

    const { data: updated, error } = await supabaseAdmin
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .select('*, brand:brands(*), category:categories(*), images:product_images(*)')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Product updated successfully.',
      product: updated,
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = params;

    // Archive product rather than destructive delete to preserve order snapshot integrity
    const { data: archived, error } = await supabaseAdmin
      .from('products')
      .update({
        status: 'archived',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('id, title, status')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Product successfully archived.',
      product: archived,
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
