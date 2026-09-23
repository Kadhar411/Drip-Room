import { cookies } from 'next/headers';
import crypto from 'crypto';

export const GUEST_SESSION_COOKIE = 'drip_guest_session_id';

/**
 * Retrieve or generate a cryptographically secure guest session ID from cookies.
 */
export function getOrCreateGuestSessionId(): { sessionId: string; isNew: boolean } {
  const cookieStore = cookies();
  const existing = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (existing && existing.length >= 16) {
    return { sessionId: existing, isNew: false };
  }

  const newSessionId = 'guest_' + crypto.randomBytes(16).toString('hex');
  cookieStore.set(GUEST_SESSION_COOKIE, newSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return { sessionId: newSessionId, isNew: true };
}

/**
 * Get guest session ID if present in cookies without generating a new one.
 */
export function getGuestSessionId(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(GUEST_SESSION_COOKIE)?.value;
}

/**
 * Clear guest session cookie upon cart merge.
 */
export function clearGuestSessionId(): void {
  const cookieStore = cookies();
  cookieStore.delete(GUEST_SESSION_COOKIE);
}
