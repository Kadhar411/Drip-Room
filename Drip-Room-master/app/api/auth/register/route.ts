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

    const { email, full_name, phone } = parseResult.data;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (
      !supabaseUrl ||
      supabaseUrl.includes('placeholder') ||
      !supabaseAnonKey ||
      supabaseAnonKey.includes('placeholder')
    ) {
      return apiError('Account service is not configured. Add valid Supabase settings first.', 503);
    }

    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          full_name,
          phone,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/api/auth/callback`,
      },
    });

    if (error) {
      return apiError(error.message, 400);
    }

    return apiSuccess(
      {
        message: 'Check your email to finish creating your Drip Room account.',
      },
      200
    );
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
