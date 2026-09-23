import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { AdminOrderUpdateSchema } from '@/lib/validation/schemas';
import { apiSuccess, apiError, apiValidationError } from '@/lib/utils/api-response';

interface RouteContext {
  params: {
    id: string; // order_id
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = params;

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('id', id)
      .single();

    if (error || !order) {
      return apiError('Order not found', 404);
    }

    return apiSuccess(order);
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = params;

    const json = await request.json();
    const parseResult = AdminOrderUpdateSchema.safeParse(json);
    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { fulfillment_status, status, notes } = parseResult.data;

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (fulfillment_status !== undefined) updatePayload.fulfillment_status = fulfillment_status;
    if (status !== undefined) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;

    const { data: updated, error } = await supabaseAdmin
      .from('orders')
      .update(updatePayload)
      .eq('id', id)
      .select('*, items:order_items(*)')
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      message: 'Order updated successfully.',
      order: updated,
    });
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}

// NOTE: Hard DELETE is prohibited on orders to guarantee complete financial auditability.
