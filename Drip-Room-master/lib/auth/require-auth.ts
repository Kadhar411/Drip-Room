import { createServerSupabaseClient } from '../supabase/server';
import { supabaseAdmin } from '../supabase/admin';
import { Profile } from '../../types/database';
import { User } from '@supabase/supabase-js';

export class AuthError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

export async function requireAuth(): Promise<{ user: User; profile: Profile }> {
  const supabase = createServerSupabaseClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AuthError('Authentication required. Please sign in.', 401);
  }

  // Fetch corresponding profile using admin client to ensure bypass of recursive RLS checks
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    // If profile was missing, fallback to provisioning on the fly
    const { data: newProfile, error: createError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email!,
        full_name: (user.user_metadata?.full_name || user.user_metadata?.name || '') as string,
        role: 'customer',
      })
      .select('*')
      .single();

    if (createError || !newProfile) {
      throw new AuthError('User profile could not be loaded.', 500);
    }
    return { user, profile: newProfile as Profile };
  }

  return { user, profile: profile as Profile };
}

export async function getOptionalAuth(): Promise<{ user: User | null; profile: Profile | null }> {
  try {
    const { user, profile } = await requireAuth();
    return { user, profile };
  } catch {
    return { user: null, profile: null };
  }
}
