import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireAuth } from '@/lib/auth/require-auth';
import { getGuestSessionId, clearGuestSessionId } from '@/lib/auth/cookies';
import { MergeCartSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAuth();

    let guestSessionId = getGuestSessionId();
    if (!guestSessionId) {
      // Allow passing guest_session_id in body as fallback
      const body = await request.json().catch(() => ({}));
      const parsed = MergeCartSchema.safeParse(body);
      if (parsed.success) {
        guestSessionId = parsed.data.guest_session_id;
      }
    }

    if (!guestSessionId) {
      return apiSuccess({ message: 'No guest cart to merge.' });
    }

    // 1. Locate guest cart
    const { data: guestCart } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('session_id', guestSessionId)
      .single();

    if (!guestCart) {
      clearGuestSessionId();
      return apiSuccess({ message: 'Guest cart was empty.' });
    }

    // 2. Fetch guest cart items
    const { data: guestItems } = await supabaseAdmin
      .from('cart_items')
      .select('product_id, quantity, product:products(is_one_of_one, status)')
      .eq('cart_id', guestCart.id);

    if (!guestItems || guestItems.length === 0) {
      await supabaseAdmin.from('carts').delete().eq('id', guestCart.id);
      clearGuestSessionId();
      return apiSuccess({ message: 'No items in guest cart.' });
    }

    // 3. Locate or create user cart
    let userCartId: string;
    const { data: userCart } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (userCart) {
      userCartId = userCart.id;
    } else {
      const { data: newCart } = await supabaseAdmin
        .from('carts')
        .insert({ user_id: user.id })
        .select('id')
        .single();
      userCartId = newCart!.id;
    }

    // 4. Merge items
    for (const item of guestItems) {
      const product = Array.isArray(item.product) ? item.product[0] : item.product;

      if (product?.status !== 'active') {
        continue; // Don't merge sold or unavailable items
      }

      const { data: existingUserItem } = await supabaseAdmin
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', userCartId)
        .eq('product_id', item.product_id)
        .single();

      if (existingUserItem) {
        if (!product.is_one_of_one) {
          await supabaseAdmin
            .from('cart_items')
            .update({ quantity: existingUserItem.quantity + item.quantity })
            .eq('id', existingUserItem.id);
        }
      } else {
        await supabaseAdmin
          .from('cart_items')
          .insert({
            cart_id: userCartId,
            product_id: item.product_id,
            quantity: product.is_one_of_one ? 1 : item.quantity,
          });
      }
    }

    // 5. Clean up guest cart
    await supabaseAdmin.from('carts').delete().eq('id', guestCart.id);
    clearGuestSessionId();

    return apiSuccess({
      message: 'Guest cart successfully merged into user bag.',
      cartId: userCartId,
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
