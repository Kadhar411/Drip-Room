import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { BrandWriteSchema } from '@/lib/validation/schemas';
import { slugify } from '@/lib/utils/slugify';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const json = await request.json();
    const parseResult = BrandWriteSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { name, slug, logo_url } = parseResult.data;
    const cleanSlug = slugify(slug || name);

    const { data: brand, error } = await supabaseAdmin
      .from('brands')
      .insert({
        name,
        slug: cleanSlug,
        logo_url,
      })
      .select('*')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: 'Brand created', brand }, 201);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
