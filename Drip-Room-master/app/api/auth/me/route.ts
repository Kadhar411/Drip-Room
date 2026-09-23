import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth/require-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { UpdateProfileSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const { user, profile } = await requireAuth();

    return apiSuccess({
      id: user.id,
      email: user.email,
      profile,
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { user, profile } = await requireAuth();
    const json = await request.json();
    const parseResult = UpdateProfileSchema.safeParse(json);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { full_name, phone, avatar_url } = parseResult.data;

    // Never allow role escalation from client
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (full_name !== undefined) updatePayload.full_name = full_name;
    if (phone !== undefined) updatePayload.phone = phone;
    if (avatar_url !== undefined) updatePayload.avatar_url = avatar_url;

    const { data: updated, error } = await supabaseAdmin
      .from('profiles')
      .update(updatePayload)
      .eq('id', user.id)
      .select('*')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Profile updated successfully',
      profile: updated,
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
