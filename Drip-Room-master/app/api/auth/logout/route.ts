import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function POST() {
  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return apiError(error.message, 400);
    }

    return apiSuccess({ message: 'Signed out successfully.' });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
