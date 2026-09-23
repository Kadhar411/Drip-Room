import {
  Product,
  CartItemWithProduct,
  Order,
  Profile,
  Category,
  Brand,
  Coupon,
  Wishlist,
} from './database';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  filters?: Record<string, unknown>;
}

export interface CartResponse {
  id: string;
  items: CartItemWithProduct[];
  subtotal: number;
  currency: string;
  itemCount: number;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
  orderNumber: string;
}

export interface AdminDashboardMetrics {
  totalOrders: number;
  paidRevenue: number;
  ordersToday: number;
  activeProducts: number;
  soldProducts: number;
  lowStockProducts: number;
  currency: string;
}
