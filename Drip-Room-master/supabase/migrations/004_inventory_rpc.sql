-- ==============================================================================
-- 004_inventory_rpc.sql: Atomic Inventory Locking & Reservation Functions
-- ==============================================================================

-- 1. Reserve cart items atomically with row-locking to prevent race conditions
CREATE OR REPLACE FUNCTION public.reserve_cart_inventory(
  p_cart_id UUID,
  p_user_id UUID,
  p_session_id TEXT,
  p_ttl_minutes INTEGER DEFAULT 15
)
RETURNS JSONB AS $$
DECLARE
  v_item RECORD;
  v_product RECORD;
  v_expires_at TIMESTAMPTZ;
  v_reserved_count INTEGER := 0;
  v_reservation_ids UUID[] := '{}';
  v_reservation_id UUID;
BEGIN
  -- Automatically clean up any expired reservations first
  PERFORM public.release_expired_reservations();

  v_expires_at := NOW() + (p_ttl_minutes || ' minutes')::INTERVAL;

  -- Iterate through each item in the cart
  FOR v_item IN
    SELECT ci.id AS cart_item_id, ci.product_id, ci.quantity
    FROM public.cart_items ci
    WHERE ci.cart_id = p_cart_id
  LOOP
    -- Lock the product row FOR UPDATE to prevent concurrent checkouts
    SELECT id, title, price, quantity, status, is_one_of_one
    INTO v_product
    FROM public.products
    WHERE id = v_item.product_id
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product % not found.', v_item.product_id;
    END IF;

    -- Validate that product is active and has sufficient stock
    IF v_product.status != 'active' THEN
      RAISE EXCEPTION 'Item "%" is no longer available (current status: %).', v_product.title, v_product.status;
    END IF;

    IF v_product.quantity < v_item.quantity THEN
      RAISE EXCEPTION 'Insufficient stock for "%". Requested: %, Available: %.', v_product.title, v_item.quantity, v_product.quantity;
    END IF;

    -- Insert active reservation record
    INSERT INTO public.inventory_reservations (
      product_id,
      cart_id,
      user_id,
      stripe_checkout_session_id,
      expires_at,
      status
    )
    VALUES (
      v_product.id,
      p_cart_id,
      p_user_id,
      p_session_id,
      v_expires_at,
      'active'
    )
    RETURNING id INTO v_reservation_id;

    v_reservation_ids := array_append(v_reservation_ids, v_reservation_id);

    -- Mark product as reserved if one-of-one or depleted
    UPDATE public.products
    SET status = 'reserved', updated_at = NOW()
    WHERE id = v_product.id;

    v_reserved_count := v_reserved_count + 1;
  END LOOP;

  IF v_reserved_count = 0 THEN
    RAISE EXCEPTION 'Cart is empty. Nothing to reserve.';
  END IF;

  RETURN jsonb_build_object(
    'success', TRUE,
    'reserved_items', v_reserved_count,
    'expires_at', v_expires_at,
    'reservation_ids', to_jsonb(v_reservation_ids)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Release expired reservations and return products to active status
CREATE OR REPLACE FUNCTION public.release_expired_reservations()
RETURNS INTEGER AS $$
DECLARE
  v_res RECORD;
  v_released_count INTEGER := 0;
BEGIN
  FOR v_res IN
    SELECT r.id, r.product_id
    FROM public.inventory_reservations r
    WHERE r.status = 'active' AND r.expires_at <= NOW()
    FOR UPDATE
  LOOP
    -- Update reservation status to expired
    UPDATE public.inventory_reservations
    SET status = 'expired'
    WHERE id = v_res.id;

    -- Only restore product to active if it's currently reserved (do not overwrite sold_out)
    UPDATE public.products
    SET status = 'active', updated_at = NOW()
    WHERE id = v_res.product_id AND status = 'reserved';

    v_released_count := v_released_count + 1;
  END LOOP;

  RETURN v_released_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Release reservations explicitly (e.g. checkout cancellation or failed payment)
CREATE OR REPLACE FUNCTION public.release_reservation_by_session(p_stripe_session_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  v_res RECORD;
  v_released_count INTEGER := 0;
BEGIN
  FOR v_res IN
    SELECT id, product_id
    FROM public.inventory_reservations
    WHERE stripe_checkout_session_id = p_stripe_session_id AND status = 'active'
    FOR UPDATE
  LOOP
    UPDATE public.inventory_reservations
    SET status = 'released'
    WHERE id = v_res.id;

    UPDATE public.products
    SET status = 'active', updated_at = NOW()
    WHERE id = v_res.product_id AND status = 'reserved';

    v_released_count := v_released_count + 1;
  END LOOP;

  RETURN v_released_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Finalize order inventory on successful payment webhook
CREATE OR REPLACE FUNCTION public.finalize_order_inventory(p_order_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_order RECORD;
  v_item RECORD;
  v_converted_count INTEGER := 0;
BEGIN
  SELECT id, user_id, stripe_checkout_session_id
  INTO v_order
  FROM public.orders
  WHERE id = p_order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % not found.', p_order_id;
  END IF;

  FOR v_item IN
    SELECT product_id, quantity
    FROM public.order_items
    WHERE order_id = p_order_id
  LOOP
    IF v_item.product_id IS NOT NULL THEN
      -- Convert reservation to converted
      UPDATE public.inventory_reservations
      SET status = 'converted'
      WHERE product_id = v_item.product_id
        AND (stripe_checkout_session_id = v_order.stripe_checkout_session_id OR status = 'active');

      -- Mark product as permanently sold out with 0 quantity
      UPDATE public.products
      SET status = 'sold_out',
          quantity = GREATEST(0, quantity - v_item.quantity),
          updated_at = NOW()
      WHERE id = v_item.product_id;

      -- Remove item from any user cart so it no longer sits in carts
      DELETE FROM public.cart_items
      WHERE product_id = v_item.product_id;

      v_converted_count := v_converted_count + 1;
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'success', TRUE,
    'converted_items', v_converted_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
