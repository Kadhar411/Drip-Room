# 🧥 Drip Room — Headless E-Commerce Backend & Archive Storefront

A high-performance, dark-fashion thrift store e-commerce engine built for curated, 1-of-1 archive clothing. Built with **Next.js App Router**, **TypeScript**, **Supabase (PostgreSQL + RLS + Auth + Storage)**, **Stripe Checkout**, and **Zod**.

---

## ⚡ Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │    Drip Room Client (HTML / Next.js)   │
                      └───────────────────┬────────────────────┘
                                          │  HTTPS / Cookie Auth
                                          ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               Next.js App Router API Routes                            │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌────────────────────────────┐  │
│  │    Public Catalog     │  │      Cart Engine      │  │     Stripe Checkout        │  │
│  │   /api/products       │  │   /api/cart           │  │   /api/checkout/create-    │  │
│  │   /api/categories     │  │   /api/cart/items     │  │    session                 │  │
│  │   /api/brands         │  │   /api/cart/merge     │  │   /api/webhooks/stripe     │  │
│  └───────────────────────┘  └───────────────────────┘  └────────────────────────────┘  │
│  ┌───────────────────────┐  ┌───────────────────────────────────────────────────────┐  │
│  │     Customer Auth     │  │               Admin Control Suite                     │  │
│  │   /api/auth/me        │  │   /api/admin/dashboard   /api/admin/products          │  │
│  │   /api/orders         │  │   /api/admin/orders      /api/admin/coupons           │  │
│  └───────────────────────┘  └───────────────────────────────────────────────────────┘  │
└───────────────────┬───────────────────────────────────────────┬────────────────────────┘
                    │                                           │
                    ▼                                           ▼
┌───────────────────────────────────────┐   ┌────────────────────────────────────────────┐
│      Supabase Cloud PostgreSQL        │   │          Stripe Hosted Checkout            │
│  - Row Level Security (RLS)           │   │  - 256-bit SSL encrypted card processing   │
│  - 1-of-1 Atomic Row-Locking RPCs     │   │  - Line items in minor integer units (GBP) │
│  - 15-Minute Reservation TTL          │   │  - Idempotent signature-verified webhook   │
│  - Product Media Storage Bucket       │   └────────────────────────────────────────────┘
└───────────────────────────────────────┘
```

---

## 🛡️ Critical Inventory & Concurrency Guarantee

Because Drip Room sells 1-of-1 vintage pieces, **inventory must never be oversold**:

1. **Atomic PostgreSQL Locking**: When a checkout session starts, the PostgreSQL RPC function `reserve_cart_inventory` locks the product rows (`SELECT ... FOR UPDATE`), verifies active status and quantity, and sets status to `reserved` with a 15-minute expiration timestamp (`expires_at`).
2. **Server-Side Price Calculation**: Client-side prices, totals, or discount totals are never trusted. All totals, taxes, and shipping are computed on the server from canonical database rows.
3. **Integer Minor Units**: Money values are strictly stored as integers in minor units (e.g. £34.99 is stored as `3499` pence), preventing floating-point rounding errors.
4. **Idempotent Webhook Processing**: Every incoming Stripe webhook event ID is recorded in `webhook_events`. On `checkout.session.completed`, the RPC function `finalize_order_inventory` converts reservations to `converted`, marks products `sold_out`, zeroes the quantity, and clears items from carts.
5. **Auto-Release on Cancellation / Expiry**: If a checkout expires or is cancelled, `release_expired_reservations` automatically restores reserved items to `active`.

---

## 🚀 Setup & Installation

### 1. Prerequisites
- Node.js 18+ installed
- A free [Supabase](https://supabase.com) account & project
- A free [Stripe](https://stripe.com) account

### 2. Environment Variables Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5c... # SECRET! Server only
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STORE_CURRENCY=GBP
```

### 3. Supabase Database Migrations
Run the SQL scripts in order via your Supabase Dashboard **SQL Editor**:

1. `supabase/migrations/001_initial_schema.sql` (Creates all 13 tables, enums, triggers, and indexes)
2. `supabase/migrations/002_rls_policies.sql` (Sets up Row Level Security and user triggers)
3. `supabase/migrations/003_storage_policies.sql` (Creates the `product-images` storage bucket and security policies)
4. `supabase/migrations/004_inventory_rpc.sql` (Installs atomic reservation and settlement functions)
5. `supabase/seed.sql` (Populates 11 categories, 12 brands, 12 curated thrift jackets, and promo coupons)

### 4. Stripe Webhook Setup (Local Development)
Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and forward events:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copy the webhook signing secret printed by the CLI (`whsec_...`) into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### 5. Running the Application Locally
Install dependencies and start the development server:
```bash
npm install
npm run dev
```
- Open `http://localhost:3000` to view the server status and API test links.
- Open `http://localhost:3000/index.html` to view the static Drip Room storefront.

---

## 📚 API Endpoint Reference

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Paginated product vault with search, category, brand, size, condition, and price filters |
| `GET` | `/api/products/[slug]` | Product details, ordered images, condition report, measurements, and related products |
| `GET` | `/api/categories` | Active category list |
| `GET` | `/api/brands` | Brands directory |

### Cart Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cart` | Active user or guest cart with revalidated pricing and availability |
| `POST` | `/api/cart/items` | Add product to bag (enforces 1-of-1 maximum quantity 1) |
| `PATCH` | `/api/cart/items/[id]` | Update item quantity in bag |
| `DELETE` | `/api/cart/items/[id]` | Remove item from bag |
| `POST` | `/api/cart/merge` | Merges guest cookie cart into user account upon sign-in |

### Checkout & Webhooks
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/checkout/create-session` | Atomically locks stock, recalculates totals, creates pending order & Stripe Checkout session |
| `POST` | `/api/webhooks/stripe` | Raw signature verification, idempotent event logging, converts reservation to sold out |
| `POST` | `/api/coupons/validate` | Validates promo code (`DRIP10`, `ARCHIVE20`) and computes discount |

### Customer Account
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Customer registration (creates Supabase auth & customer profile) |
| `POST` | `/api/auth/login` | Email/password sign-in |
| `POST` | `/api/auth/logout` | Clears auth session |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `PATCH` | `/api/auth/me` | Update customer name, phone, or avatar |
| `GET` | `/api/orders` | Customer's order history |
| `GET` | `/api/orders/[orderNumber]` | Single order inspection (restricted to owner or admin) |
| `GET` | `/api/wishlist` | Retrieve saved wishlist |
| `POST` | `/api/wishlist` | Add item to wishlist |
| `DELETE` | `/api/wishlist/[productId]` | Remove item from wishlist |

### Admin Endpoints (Requires `role: 'admin'`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Metric KPIs: total revenue, order count, active products, low stock |
| `GET` | `/api/admin/products` | Browse all products including drafts & archived |
| `POST` | `/api/admin/products` | Create product (title, condition, measurements, price) |
| `PATCH` | `/api/admin/products/[id]` | Update product details |
| `DELETE` | `/api/admin/products/[id]` | Safely archives a product |
| `POST` | `/api/admin/products/[id]/images` | Upload product media to Supabase Storage bucket |
| `DELETE` | `/api/admin/products/[id]/images/[imageId]` | Remove image from bucket and database |
| `POST` | `/api/admin/categories` | Add product category |
| `POST` | `/api/admin/brands` | Add fashion brand |
| `GET` | `/api/admin/orders` | View all customer orders |
| `PATCH` | `/api/admin/orders/[id]` | Update order fulfillment status (processing, shipped, delivered) |
| `GET` | `/api/admin/coupons` | List promo discount coupons |
| `POST` | `/api/admin/coupons` | Create percentage or fixed discount coupon |
| `PATCH` | `/api/admin/coupons/[id]` | Disable or edit coupon limits |

---

## 🚢 Production Deployment Guidance

1. **Deploy to Vercel**: Connect your GitHub repository to Vercel. Set the Root Directory to `./` and copy all variables from `.env.local` into the Vercel Project Settings.
2. **Supabase Production**: Run the migrations against your production Supabase instance.
3. **Stripe Production**:
   - Swap test keys (`sk_test_...`, `pk_test_...`) for live keys (`sk_live_...`, `pk_live_...`).
   - Register the production webhook URL: `https://your-domain.com/api/webhooks/stripe` listening for `checkout.session.completed`, `checkout.session.expired`, and `payment_intent.payment_failed`.
   - Set the production `STRIPE_WEBHOOK_SECRET`.
