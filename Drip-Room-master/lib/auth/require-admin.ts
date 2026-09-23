import { requireAuth, AuthError } from './require-auth';
import { Profile } from '../../types/database';
import { User } from '@supabase/supabase-js';

/**
 * Reusable admin guard ensuring caller is an authenticated user with role = 'admin'.
 * Throws AuthError(403) if unauthorized.
 */
export async function requireAdmin(): Promise<{ user: User; profile: Profile }> {
  const { user, profile } = await requireAuth();

  if (profile.role !== 'admin') {
    // Log unauthorized admin attempt for security auditing
    console.warn(`[SECURITY AUDIT] Unauthorized admin access attempt by user ${user.id} (${profile.email})`);
    throw new AuthError('Forbidden: Administrator privileges required.', 403);
  }

  return { user, profile };
}
