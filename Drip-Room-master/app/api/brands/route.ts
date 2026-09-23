import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const { data: brands, error } = await supabaseAdmin
      .from('brands')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(brands);
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
