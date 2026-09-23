import { supabaseAdmin } from '../supabase/admin';

export interface ReservationResult {
  success: boolean;
  reserved_items?: number;
  expires_at?: string;
  reservation_ids?: string[];
  error?: string;
}

/**
 * Atomically locks product rows, checks availability and 1-of-1 rules,
 * marks products 'reserved', and creates 15-min TTL records in PostgreSQL.
 */
export async function reserveCartItems(
  cartId: string,
  userId: string | null,
  sessionId: string | null,
  ttlMinutes = 15
): Promise<ReservationResult> {
  const { data, error } = await supabaseAdmin.rpc('reserve_cart_inventory', {
    p_cart_id: cartId,
    p_user_id: userId,
    p_session_id: sessionId,
    p_ttl_minutes: ttlMinutes,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return data as ReservationResult;
}

/**
 * Periodically releases reservations that have exceeded their expires_at TTL.
 */
export async function cleanupExpiredReservations(): Promise<number> {
  const { data, error } = await supabaseAdmin.rpc('release_expired_reservations');
  if (error) {
    console.error('Error cleaning up expired reservations:', error);
    return 0;
  }
  return (data as number) || 0;
}

/**
 * Releases reservation explicitly when checkout session is cancelled or expires.
 */
export async function releaseCheckoutReservations(stripeSessionId: string): Promise<number> {
  const { data, error } = await supabaseAdmin.rpc('release_reservation_by_session', {
    p_stripe_session_id: stripeSessionId,
  });

  if (error) {
    console.error(`Error releasing reservations for Stripe session ${stripeSessionId}:`, error);
    return 0;
  }
  return (data as number) || 0;
}

/**
 * Converts active reservations to 'converted', marks products 'sold_out' (quantity = 0),
 * and removes sold items from shopping carts.
 */
export async function finalizeOrderInventory(orderId: string): Promise<{ success: boolean; error?: string }> {
  const { data, error } = await supabaseAdmin.rpc('finalize_order_inventory', {
    p_order_id: orderId,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
