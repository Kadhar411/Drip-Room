-- ==============================================================================
-- 002_rls_policies.sql: Row Level Security (RLS) & Auth Triggers for Drip Room
-- ==============================================================================

-- 1. Helper function to check if the current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger to automatically provision customer profile on auth.users creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    'customer' -- Role escalation is strictly prohibited here
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- A. PROFILES POLICIES
-- ==============================================================================
-- Users can view their own profile; admins can view all profiles
CREATE POLICY "Users can read own profile or admin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

-- Users can update only their own profile details (excluding role)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
  );

-- Only admins can insert or delete profiles manually
CREATE POLICY "Admins full manage profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ==============================================================================
-- B. CATEGORIES & BRANDS POLICIES
-- ==============================================================================
-- Anyone can view active categories
CREATE POLICY "Public read active categories"
  ON public.categories FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- Anyone can view brands
CREATE POLICY "Public read brands"
  ON public.brands FOR SELECT
  TO PUBLIC
  USING (TRUE);

CREATE POLICY "Admins manage brands"
  ON public.brands FOR ALL
  USING (public.is_admin());

-- ==============================================================================
-- C. PRODUCTS & PRODUCT_IMAGES POLICIES
-- ==============================================================================
-- Public read: Only active, published products (and not draft or archived)
CREATE POLICY "Public read active published products"
  ON public.products FOR SELECT
  USING (
    (status IN ('active', 'reserved', 'sold_out') AND published_at IS NOT NULL)
    OR public.is_admin()
  );

-- Admins can create, update, and delete products
CREATE POLICY "Admins manage products"
  ON public.products FOR ALL
  USING (public.is_admin());

-- Public can view images for visible products
CREATE POLICY "Public read product images"
  ON public.product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id
        AND (p.status IN ('active', 'reserved', 'sold_out') OR public.is_admin())
    )
  );

-- Admins manage product images
CREATE POLICY "Admins manage product images"
  ON public.product_images FOR ALL
  USING (public.is_admin());

-- ==============================================================================
-- D. CARTS & CART_ITEMS POLICIES
-- ==============================================================================
-- Authenticated users can view and manage their own cart
CREATE POLICY "Users read own cart"
  ON public.carts FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users insert own cart"
  ON public.carts FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users update own cart"
  ON public.carts FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users delete own cart"
  ON public.carts FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin());

-- Cart items policies
CREATE POLICY "Users read own cart items"
  ON public.cart_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.carts c
      WHERE c.id = cart_items.cart_id
        AND (c.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Users manage own cart items"
  ON public.cart_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.carts c
      WHERE c.id = cart_items.cart_id
        AND (c.user_id = auth.uid() OR public.is_admin())
    )
  );

-- ==============================================================================
-- E. WISHLISTS POLICIES
-- ==============================================================================
CREATE POLICY "Users read own wishlist"
  ON public.wishlists FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users manage own wishlist"
  ON public.wishlists FOR ALL
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- ==============================================================================
-- F. ORDERS & ORDER_ITEMS POLICIES
-- ==============================================================================
-- Customers can view only their own orders; admins can view all
CREATE POLICY "Users read own orders or admin"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

-- Order creation and modification is handled exclusively via secure Server Handlers (Service Role)
CREATE POLICY "Admins manage orders"
  ON public.orders FOR ALL
  USING (public.is_admin());

CREATE POLICY "Users read own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id
        AND (o.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Admins manage order items"
  ON public.order_items FOR ALL
  USING (public.is_admin());

-- ==============================================================================
-- G. INVENTORY RESERVATIONS & WEBHOOK EVENTS (Strictly Server / Admin Only)
-- ==============================================================================
CREATE POLICY "Admins manage inventory reservations"
  ON public.inventory_reservations FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public read active coupons"
  ON public.coupons FOR SELECT
  USING (active = TRUE AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Admins manage coupons"
  ON public.coupons FOR ALL
  USING (public.is_admin());

CREATE POLICY "Admins manage webhook events"
  ON public.webhook_events FOR ALL
  USING (public.is_admin());
