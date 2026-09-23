import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getOptionalAuth } from '@/lib/auth/require-auth';
import { getOrCreateGuestSessionId } from '@/lib/auth/cookies';
import { AddCartItemSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parseResult = AddCartItemSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { product_id, quantity } = parseResult.data;

    // 1. Fetch live product from DB
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      return apiError('Product not found', 404);
    }

    // Reject unavailable items
    if (product.status === 'sold_out' || product.quantity <= 0) {
      return apiError('Sorry, this archive piece has already been sold.', 400);
    }

    if (product.status !== 'active') {
      return apiError(`This piece is currently unavailable (Status: ${product.status}).`, 400);
    }

    // 2. Resolve or create cart
    const { user } = await getOptionalAuth();
    let cartId: string;

    if (user) {
      const { data: userCart } = await supabaseAdmin
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (userCart) {
        cartId = userCart.id;
      } else {
        const { data: newCart } = await supabaseAdmin
          .from('carts')
          .insert({ user_id: user.id })
          .select('id')
          .single();
        cartId = newCart!.id;
      }
    } else {
      const { sessionId } = getOrCreateGuestSessionId();
      const { data: guestCart } = await supabaseAdmin
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (guestCart) {
        cartId = guestCart.id;
      } else {
        const { data: newCart } = await supabaseAdmin
          .from('carts')
          .insert({ session_id: sessionId })
          .select('id')
          .single();
        cartId = newCart!.id;
      }
    }

    // 3. Check if already in cart
    const { data: existingItem } = await supabaseAdmin
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', product_id)
      .single();

    if (existingItem) {
      if (product.is_one_of_one) {
        // Enforce max 1 for 1-of-1 pieces
        return apiSuccess({
          message: 'Item is already in your bag. As this is a 1-of-1 archive piece, maximum quantity is 1.',
          cart_item_id: existingItem.id,
          quantity: 1,
        });
      }

      const newQty = existingItem.quantity + quantity;
      const { data: updatedItem } = await supabaseAdmin
        .from('cart_items')
        .update({ quantity: newQty, updated_at: new Date().toISOString() })
        .eq('id', existingItem.id)
        .select('*')
        .single();

      return apiSuccess({
        message: 'Cart updated',
        item: updatedItem,
      });
    }

    // 4. Insert new item
    const targetQty = product.is_one_of_one ? 1 : quantity;
    const { data: newItem, error: insertError } = await supabaseAdmin
      .from('cart_items')
      .insert({
        cart_id: cartId,
        product_id,
        quantity: targetQty,
      })
      .select('*')
      .single();

    if (insertError) {
      return apiError(insertError.message, 500);
    }

    return apiSuccess(
      {
        message: 'Added to bag',
        item: newItem,
      },
      201
    );
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
