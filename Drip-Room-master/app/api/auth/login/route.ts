import { NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { LoginSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parseResult = LoginSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { email, password } = parseResult.data;
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return apiError(error.message, 401);
    }

    return apiSuccess({
      user: data.user,
      session: data.session,
      message: 'Signed in successfully.',
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
