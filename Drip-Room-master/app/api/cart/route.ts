import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getOptionalAuth } from '@/lib/auth/require-auth';
import { getOrCreateGuestSessionId } from '@/lib/auth/cookies';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { user } = await getOptionalAuth();
    let cartId: string | null = null;
    let sessionId: string | null = null;

    if (user) {
      // Find or create user cart
      const { data: userCart } = await supabaseAdmin
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (userCart) {
        cartId = userCart.id;
      } else {
        const { data: newCart, error: createError } = await supabaseAdmin
          .from('carts')
          .insert({ user_id: user.id })
          .select('id')
          .single();
        if (createError) throw createError;
        cartId = newCart.id;
      }
    } else {
      // Guest cart session
      const { sessionId: guestSession } = getOrCreateGuestSessionId();
      sessionId = guestSession;

      const { data: guestCart } = await supabaseAdmin
        .from('carts')
        .select('id')
        .eq('session_id', guestSession)
        .single();

      if (guestCart) {
        cartId = guestCart.id;
      } else {
        const { data: newCart, error: createError } = await supabaseAdmin
          .from('carts')
          .insert({ session_id: guestSession })
          .select('id')
          .single();
        if (createError) throw createError;
        cartId = newCart.id;
      }
    }

    // Fetch cart items with full product details
    const { data: items, error: itemsError } = await supabaseAdmin
      .from('cart_items')
      .select('*, product:products(*, brand:brands(*), category:categories(*), images:product_images(*))')
      .eq('cart_id', cartId);

    if (itemsError) {
      return apiError(itemsError.message, 500);
    }

    // Server-side validation: filter out any invalid or sold-out items
    let subtotal = 0;
    let itemCount = 0;
    const validItems = [];

    for (const item of items || []) {
      const p = item.product;
      if (!p || p.status === 'archived' || p.status === 'draft') {
        // Automatically prune dead products
        await supabaseAdmin.from('cart_items').delete().eq('id', item.id);
        continue;
      }

      // Quantity clamp for 1-of-1
      const qty = p.is_one_of_one ? 1 : item.quantity;
      if (item.quantity !== qty) {
        await supabaseAdmin.from('cart_items').update({ quantity: qty }).eq('id', item.id);
        item.quantity = qty;
      }

      // Sort images
      if (p.images) {
        p.images.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      }

      const lineTotal = p.price * qty;
      subtotal += lineTotal;
      itemCount += qty;

      validItems.push({
        ...item,
        lineTotal,
      });
    }

    return apiSuccess({
      cartId,
      items: validItems,
      itemCount,
      subtotal,
      currency: process.env.STORE_CURRENCY || 'GBP',
      isGuest: !user,
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
