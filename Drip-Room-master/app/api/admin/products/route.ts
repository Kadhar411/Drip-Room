import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ProductWriteSchema } from '@/lib/validation/schemas';
import { slugify } from '@/lib/utils/slugify';
import { apiSuccess, apiPaginated, apiError, apiValidationError } from '@/lib/utils/api-response';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');

    let query = supabaseAdmin
      .from('products')
      .select('*, brand:brands(*), category:categories(*), images:product_images(*)', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }
    if (category) {
      query = query.eq('category_id', category);
    }
    if (brand) {
      query = query.eq('brand_id', brand);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`);
    }

    query = query.order('created_at', { ascending: false });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: products, error, count } = await query;

    if (error) {
      return apiError(error.message, 500);
    }

    return apiPaginated(
      products || [],
      { page, limit, total: count || 0 },
      { status, category, brand, search }
    );
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const json = await request.json();
    const parseResult = ProductWriteSchema.safeParse(json);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const payload = parseResult.data;

    // Generate safe, unique slug
    let baseSlug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
    if (!baseSlug) baseSlug = 'archive-item';

    // Verify slug uniqueness
    const { data: existingSlug } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('slug', baseSlug)
      .single();

    let finalSlug = baseSlug;
    if (existingSlug) {
      finalSlug = `${baseSlug}-${crypto.randomBytes(2).toString('hex')}`;
    }

    const publishedAt = payload.status === 'active' ? new Date().toISOString() : null;

    const { data: newProduct, error } = await supabaseAdmin
      .from('products')
      .insert({
        ...payload,
        slug: finalSlug,
        published_at: publishedAt,
      })
      .select('*, brand:brands(*), category:categories(*)')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(
      {
        message: 'Product successfully created.',
        product: newProduct,
      },
      201
    );
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
