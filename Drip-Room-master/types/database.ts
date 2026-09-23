export type UserRole = 'customer' | 'admin';

export type ProductConditionGrade =
  | 'New with tags'
  | 'Like new'
  | 'Excellent'
  | 'Very good'
  | 'Good'
  | 'Fair';

export type ProductStatus = 'draft' | 'active' | 'reserved' | 'sold_out' | 'archived';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'payment_failed';

export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export type FulfillmentStatus = 'unfulfilled' | 'processing' | 'shipped' | 'delivered' | 'returned';

export type ReservationStatus = 'active' | 'converted' | 'expired' | 'released';

export type CouponType = 'percentage' | 'fixed';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProductMeasurements {
  pit_to_pit_in?: number;
  length_in?: number;
  shoulder_in?: number;
  sleeve_in?: number;
  waist_in?: number;
  chest_cm?: number;
  length_cm?: number;
  [key: string]: unknown;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand_id: string | null;
  category_id: string;
  gender: string | null;
  size: string | null;
  colour: string | null;
  material: string | null;
  era_or_year: string | null;
  condition_grade: ProductConditionGrade;
  condition_notes: string | null;
  defects: string | null;
  measurements: ProductMeasurements | null;
  original_price: number | null;
  price: number; // Integer minor units (pence / cents)
  currency: string;
  quantity: number;
  status: ProductStatus;
  featured: boolean;
  is_one_of_one: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;

  // Joined relations
  brand?: Brand | null;
  category?: Category | null;
  images?: ProductImage[];
}

export interface Cart {
  id: string;
  user_id: string | null;
  session_id: string | null;
  created_at: string;
  updated_at: string;
  items?: CartItemWithProduct[];
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  currency: string;
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  grand_total: number;
  shipping_address: ShippingAddress | null;
  billing_address: ShippingAddress | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_title: string;
  product_slug: string | null;
  product_image_url: string | null;
  brand_name: string | null;
  size: string | null;
  condition_grade: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
  product_snapshot: Record<string, unknown>;
  created_at: string;
}

export interface InventoryReservation {
  id: string;
  product_id: string;
  cart_id: string | null;
  user_id: string | null;
  stripe_checkout_session_id: string | null;
  expires_at: string;
  status: ReservationStatus;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minimum_order_value: number | null;
  starts_at: string | null;
  expires_at: string | null;
  usage_limit: number | null;
  usage_count: number;
  active: boolean;
  created_at: string;
}

export interface WebhookEvent {
  id: string;
  provider: string;
  event_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  processed_at: string | null;
  created_at: string;
}
