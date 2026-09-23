import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { CategoryWriteSchema } from '@/lib/validation/schemas';
import { slugify } from '@/lib/utils/slugify';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const json = await request.json();
    const parseResult = CategoryWriteSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { name, slug, description, image_url, is_active } = parseResult.data;
    const cleanSlug = slugify(slug || name);

    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .insert({
        name,
        slug: cleanSlug,
        description,
        image_url,
        is_active: is_active ?? true,
      })
      .select('*')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: 'Category created', category }, 201);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
