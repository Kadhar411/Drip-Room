import { z } from 'zod';

export const ConditionGradeEnum = z.enum([
  'New with tags',
  'Like new',
  'Excellent',
  'Very good',
  'Good',
  'Fair',
]);

export const ProductStatusEnum = z.enum([
  'draft',
  'active',
  'reserved',
  'sold_out',
  'archived',
]);

export const OrderStatusEnum = z.enum([
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
  'payment_failed',
]);

export const FulfillmentStatusEnum = z.enum([
  'unfulfilled',
  'processing',
  'shipped',
  'delivered',
  'returned',
]);

// 1. PRODUCTS QUERY SCHEMA
export const ProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  category: z.string().optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  colour: z.string().optional(),
  condition: z.string().optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
  search: z.string().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc', 'featured']).default('newest'),
});

// 2. PRODUCT WRITE SCHEMA (ADMIN)
export const ProductWriteSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug must be lower-case alphanumeric with dashes').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  brand_id: z.string().uuid('Invalid Brand ID').nullable().optional(),
  category_id: z.string().uuid('Category is required'),
  gender: z.string().optional().default('Unisex'),
  size: z.string().min(1, 'Size is required'),
  colour: z.string().optional(),
  material: z.string().optional(),
  era_or_year: z.string().optional(),
  condition_grade: ConditionGradeEnum,
  condition_notes: z.string().optional().nullable(),
  defects: z.string().optional().nullable(),
  measurements: z.record(z.unknown()).optional().default({}),
  original_price: z.number().int().min(0).nullable().optional(),
  price: z.number().int().min(0, 'Price must be non-negative integer minor units'),
  currency: z.string().default('GBP'),
  quantity: z.number().int().min(0).default(1),
  status: ProductStatusEnum.default('draft'),
  featured: z.boolean().default(false),
  is_one_of_one: z.boolean().default(true),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
});

export const ProductUpdateSchema = ProductWriteSchema.partial();

// 3. CART SCHEMAS
export const AddCartItemSchema = z.object({
  product_id: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1).default(1),
});

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(10),
});

export const MergeCartSchema = z.object({
  guest_session_id: z.string().min(5, 'Invalid guest session ID'),
});

// 4. CHECKOUT SCHEMAS
export const CreateCheckoutSessionSchema = z.object({
  cart_id: z.string().uuid().optional(),
  shipping_tier: z.enum(['standard', 'express', 'international']).default('standard'),
  coupon_code: z.string().optional(),
  success_url: z.string().url().optional(),
  cancel_url: z.string().url().optional(),
});

// 5. COUPON SCHEMAS
export const ValidateCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  order_subtotal: z.number().int().min(0),
});

export const AdminCreateCouponSchema = z.object({
  code: z.string().min(2).toUpperCase(),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().int().min(1),
  minimum_order_value: z.number().int().min(0).nullable().optional(),
  starts_at: z.string().datetime().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  usage_limit: z.number().int().min(1).nullable().optional(),
  active: z.boolean().default(true),
});

// 6. CATEGORY & BRAND WRITE SCHEMAS
export const CategoryWriteSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().nullable(),
  image_url: z.string().url().optional().nullable(),
  is_active: z.boolean().default(true),
});

export const BrandWriteSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  logo_url: z.string().url().optional().nullable(),
});

// 7. ORDER ADMIN UPDATE SCHEMA
export const AdminOrderUpdateSchema = z.object({
  fulfillment_status: FulfillmentStatusEnum.optional(),
  status: OrderStatusEnum.optional(),
  tracking_number: z.string().optional(),
  notes: z.string().optional(),
});

// 8. PROFILE UPDATE SCHEMA
export const UpdateProfileSchema = z.object({
  full_name: z.string().min(2).optional(),
  phone: z.string().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
});

// 9. AUTH SCHEMAS
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});
