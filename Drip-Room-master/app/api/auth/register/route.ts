import { NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { RegisterSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parseResult = RegisterSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { email, password, full_name } = parseResult.data;
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    });

    if (error) {
      return apiError(error.message, 400);
    }

    return apiSuccess(
      {
        user: data.user,
        session: data.session,
        message: 'Account successfully registered.',
      },
      201
    );
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
