import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { UpdateCartItemSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    id: string; // cart_item_id
  };
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const json = await request.json();
    const parseResult = UpdateCartItemSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { quantity } = parseResult.data;

    // Fetch item with product info
    const { data: item, error: fetchError } = await supabaseAdmin
      .from('cart_items')
      .select('*, product:products(is_one_of_one, status)')
      .eq('id', id)
      .single();

    if (fetchError || !item) {
      return apiError('Cart item not found', 404);
    }

    // 1-of-1 validation
    let finalQty = quantity;
    if (item.product?.is_one_of_one && quantity > 1) {
      finalQty = 1;
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('cart_items')
      .update({ quantity: finalQty, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return apiError(updateError.message, 500);
    }

    return apiSuccess({
      message: 'Cart item updated',
      item: updated,
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;

    const { error } = await supabaseAdmin
      .from('cart_items')
      .delete()
      .eq('id', id);

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Item removed from bag',
    });
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
}
