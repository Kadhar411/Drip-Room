import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ProductsQuerySchema } from '@/lib/validation/schemas';
import { apiPaginated, apiValidationError, apiError } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryResult = ProductsQuerySchema.safeParse({
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      category: searchParams.get('category') || undefined,
      brand: searchParams.get('brand') || undefined,
      size: searchParams.get('size') || undefined,
      colour: searchParams.get('colour') || undefined,
      condition: searchParams.get('condition') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || undefined,
    });

    if (!queryResult.success) {
      return apiValidationError(queryResult.error);
    }

    const {
      page,
      limit,
      category,
      brand,
      size,
      colour,
      condition,
      minPrice,
      maxPrice,
      search,
      sort,
    } = queryResult.data;

    let query = supabaseAdmin
      .from('products')
      .select('*, brand:brands(*), category:categories(*), images:product_images(*)', { count: 'exact' })
      .in('status', ['active', 'reserved', 'sold_out'])
      .not('published_at', 'is', null);

    // Filters
    if (category) {
      // Check if UUID or slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(category);
      if (isUuid) {
        query = query.eq('category_id', category);
      } else {
        const { data: catData } = await supabaseAdmin
          .from('categories')
          .select('id')
          .eq('slug', category.toLowerCase())
          .single();
        if (catData) {
          query = query.eq('category_id', catData.id);
        }
      }
    }

    if (brand) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(brand);
      if (isUuid) {
        query = query.eq('brand_id', brand);
      } else {
        const { data: brandData } = await supabaseAdmin
          .from('brands')
          .select('id')
          .ilike('name', brand)
          .single();
        if (brandData) {
          query = query.eq('brand_id', brandData.id);
        }
      }
    }

    if (size) {
      query = query.ilike('size', `%${size}%`);
    }

    if (colour) {
      query = query.ilike('colour', `%${colour}%`);
    }

    if (condition) {
      query = query.ilike('condition_grade', `%${condition}%`);
    }

    if (minPrice !== undefined) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,colour.ilike.%${search}%`);
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'featured':
        query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: products, error, count } = await query;

    if (error) {
      return apiError(error.message, 500);
    }

    // Sort images by sort_order
    const formattedProducts = (products || []).map((p) => ({
      ...p,
      images: (p.images || []).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order),
    }));

    return apiPaginated(
      formattedProducts,
      {
        page,
        limit,
        total: count || 0,
      },
      {
        category,
        brand,
        size,
        colour,
        condition,
        minPrice,
        maxPrice,
        sort,
      }
    );
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
