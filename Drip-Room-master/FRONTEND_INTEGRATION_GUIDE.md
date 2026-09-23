# 🔌 Drip Room: Frontend-to-Backend Integration Guide

This guide details how the existing Drip Room frontend (`index.html`, `product-listing.html`, `product-detail.html`, `cart.html`, `checkout.html`, and `main.js`) connects to the new Next.js App Router and Supabase/Stripe backend.

---

## 1. Feature-to-API Route Mapping

| Existing Frontend Feature | Current Implementation (Mock) | New Backend API Route | Method |
|---|---|---|---|
| **Product Vault (Catalog & Filters)** | `DRIP_PRODUCTS` in `main.js` | `/api/products` | `GET` |
| **Product Detail Page (PDP)** | `DRIP_PRODUCTS.find()` | `/api/products/[slug]` | `GET` |
| **Category List & Navigation** | Hardcoded category links | `/api/categories` | `GET` |
| **Brands Directory** | Hardcoded brand names | `/api/brands` | `GET` |
| **Active Cart Retrieval** | `CartManager.getItems()` in `localStorage` | `/api/cart` | `GET` |
| **Add to Bag (1-of-1 Enforced)** | `CartManager.addItem()` in `localStorage` | `/api/cart/items` | `POST` |
| **Update Bag Item Quantity** | `CartManager.updateQty()` | `/api/cart/items/[id]` | `PATCH` |
| **Remove Bag Item** | `CartManager.removeItem()` | `/api/cart/items/[id]` | `DELETE` |
| **Promo Code Validation** | Hardcoded `DRIP10` string check | `/api/coupons/validate` | `POST` |
| **Stripe Checkout Initiation** | Simulated 3-step checkout form | `/api/checkout/create-session` | `POST` |
| **Wishlist Persistence** | `WishlistManager` in `localStorage` | `/api/wishlist` | `GET`, `POST` |
| **Customer Authentication** | Simulated toast login in header | `/api/auth/login`, `/api/auth/register`, `/api/auth/me` | `POST`, `GET` |
| **Customer Order History** | None (Static) | `/api/orders` | `GET` |
| **Order Confirmation / Status** | Static confirmation card | `/api/orders/[orderNumber]` | `GET` |

---

## 2. Universal API Client Adapter (`drip-api.js`)

Add this lightweight adapter script or include it in `main.js` to enable smooth asynchronous calls to your backend:

```javascript
/**
 * Drip Room Universal Backend Client
 */
const DripAPI = {
  baseUrl: window.location.origin, // or your deployed Next.js URL

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Automatically passes auth cookies & guest session cookie
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || `HTTP error ${response.status}`);
      }
      return json;
    } catch (err) {
      console.error(`[API Error] ${endpoint}:`, err);
      throw err;
    }
  },

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/products${query ? '?' + query : ''}`);
  },

  async getProductBySlug(slug) {
    return this.request(`/api/products/${slug}`);
  },

  // Cart
  async getCart() {
    return this.request('/api/cart');
  },

  async addToCart(productId, quantity = 1) {
    return this.request('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },

  async updateCartItem(cartItemId, quantity) {
    return this.request(`/api/cart/items/${cartItemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  },

  async removeCartItem(cartItemId) {
    return this.request(`/api/cart/items/${cartItemId}`, {
      method: 'DELETE',
    });
  },

  async mergeCart(guestSessionId) {
    return this.request('/api/cart/merge', {
      method: 'POST',
      body: JSON.stringify({ guest_session_id: guestSessionId }),
    });
  },

  // Coupons
  async validateCoupon(code, subtotalMinorUnits) {
    return this.request('/api/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, order_subtotal: subtotalMinorUnits }),
    });
  },

  // Checkout
  async beginCheckout(shippingTier = 'standard', couponCode = null) {
    return this.request('/api/checkout/create-session', {
      method: 'POST',
      body: JSON.stringify({
        shipping_tier: shippingTier,
        coupon_code: couponCode,
      }),
    });
  },

  // Customer Account & Wishlist
  async getCurrentUser() {
    return this.request('/api/auth/me');
  },

  async signIn(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async signOut() {
    return this.request('/api/auth/logout', { method: 'POST' });
  },

  async getOrders() {
    return this.request('/api/orders');
  },

  async getWishlist() {
    return this.request('/api/wishlist');
  },

  async toggleWishlist(productId) {
    return this.request('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    });
  },
};
```

---

## 3. Step-by-Step Code Integration Examples

### A. Dynamic Product Catalog (`product-listing.html`)

Replace the static `DRIP_PRODUCTS` array loop with live API fetching:

```javascript
async function loadProductVault() {
  const container = document.getElementById('productGrid');
  if (!container) return;

  // Read URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const search = urlParams.get('search');
  const sort = urlParams.get('sort') || 'newest';

  try {
    container.innerHTML = `<div style="color: var(--accent-cream); padding: 3rem; text-align: center;">Loading archive drops...</div>`;

    const res = await DripAPI.getProducts({
      category: category || undefined,
      search: search || undefined,
      sort: sort,
      limit: 12,
    });

    const products = res.data;
    if (products.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); padding: 3rem; text-align: center;">No archive items found matching your criteria.</div>`;
      return;
    }

    container.innerHTML = products.map(product => {
      const primaryImage = product.images?.[0]?.public_url || 'hero-jackets-hanging.jpg';
      const formattedPrice = `£${(product.price / 100).toFixed(2)}`;
      const isSold = product.status === 'sold_out';

      return `
        <article class="product-card ${isSold ? 'product-card-sold' : ''}">
          <div class="product-image-wrap">
            <img src="${primaryImage}" alt="${product.title}" loading="lazy" />
            <div class="product-badge-group">
              <span class="badge condition-${product.condition_grade.toLowerCase().replace(/\s+/g, '-')}">
                ${product.condition_grade}
              </span>
              ${isSold ? '<span class="badge badge-sold">SOLD</span>' : ''}
            </div>
          </div>
          <div class="product-info">
            <span class="brand-tag">${product.brand?.name || 'Archive'}</span>
            <h3 class="product-title">
              <a href="product-detail.html?slug=${product.slug}">${product.title}</a>
            </h3>
            <div class="product-price-row">
              <span class="price-current">${formattedPrice}</span>
              ${product.original_price ? `<span class="price-original">£${(product.original_price / 100).toFixed(2)}</span>` : ''}
            </div>
            ${isSold 
              ? `<button class="nm-btn nm-btn-full" disabled style="opacity: 0.5;">Archived / Sold</button>`
              : `<button class="nm-btn nm-btn-full" onclick="handleAddToCart('${product.id}')">Add to Bag</button>`
            }
          </div>
        </article>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = `<div style="color: #ff6b6b; padding: 2rem;">Failed to load catalog: ${err.message}</div>`;
  }
}
```

---

### B. Add to Bag with 1-of-1 Concurrency Handling

Connect button clicks to the live server cart:

```javascript
async function handleAddToCart(productId) {
  try {
    const res = await DripAPI.addToCart(productId, 1);
    
    // Show toast confirmation
    showToast(res.data.message || 'Added to your archive bag', '🧥');

    // Update cart badge in header
    updateCartBadge();
  } catch (err) {
    showToast(err.message, '⚠️');
  }
}

async function updateCartBadge() {
  try {
    const res = await DripAPI.getCart();
    const count = res.data.itemCount || 0;
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    });
  } catch {
    // Ignore error silently
  }
}
```

---

### C. Stripe Checkout Initiation (`checkout.html`)

Redirect customer to the Stripe Hosted Checkout session:

```javascript
async function triggerStripeCheckout(shippingTier = 'standard', couponCode = null) {
  const checkoutBtn = document.getElementById('proceedToPaymentBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Securing 1-of-1 items...';
  }

  try {
    const res = await DripAPI.beginCheckout(shippingTier, couponCode);
    const { url, expiresAt } = res.data;

    showToast('Redirecting to Stripe Bank-Grade Encrypted Checkout...', '🔒');
    
    // Redirect customer directly to Stripe
    window.location.href = url;
  } catch (err) {
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.textContent = 'Retry Checkout';
    }
    showToast(err.message, '⚠️');
  }
}
```

---

### D. Single Product Detail Page (`product-detail.html`)

Fetch product specifications, measurements, and condition inspection reports:

```javascript
async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) return;

  try {
    const res = await DripAPI.getProductBySlug(slug);
    const { product, related } = res.data;

    // Populate title, price, brand
    document.title = `${product.title} | Drip Room Archive Vault`;
    document.querySelector('.pdp-title').textContent = product.title;
    document.querySelector('.pdp-brand').textContent = product.brand?.name || 'Archive';
    document.querySelector('.pdp-price').textContent = `£${(product.price / 100).toFixed(2)}`;
    document.querySelector('.pdp-condition-badge').textContent = product.condition_grade;

    // Condition notes & defects disclosure
    document.querySelector('.condition-report-text').textContent = product.condition_notes || 'Clean archival state.';
    document.querySelector('.defects-report-text').textContent = product.defects || 'No noticeable flaws or structural issues detected.';

    // Measurements table
    if (product.measurements) {
      document.querySelector('#measurementPitToPit').textContent = product.measurements.pit_to_pit_in ? `${product.measurements.pit_to_pit_in}"` : '-';
      document.querySelector('#measurementLength').textContent = product.measurements.length_in ? `${product.measurements.length_in}"` : '-';
      document.querySelector('#measurementShoulder').textContent = product.measurements.shoulder_in ? `${product.measurements.shoulder_in}"` : '-';
    }

    // Gallery images
    const galleryContainer = document.querySelector('.pdp-gallery-main');
    if (galleryContainer && product.images?.length > 0) {
      galleryContainer.src = product.images[0].public_url;
    }
  } catch (err) {
    console.error('Failed to load PDP:', err);
  }
}
```

---

### E. Admin Product Creation Hook (React or Next.js)

```typescript
// Example React / Next.js Admin Creation Hook
export async function createAdminProduct(productData: any, imageFiles: File[]) {
  // 1. Create product record
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });

  const { data: createdProduct, error } = await res.json();
  if (error) throw new Error(error);

  // 2. Upload images sequentially to Supabase Storage
  for (let i = 0; i < imageFiles.length; i++) {
    const formData = new FormData();
    formData.append('file', imageFiles[i]);
    formData.append('sort_order', i.toString());
    formData.append('alt_text', `${createdProduct.title} photo ${i + 1}`);

    await fetch(`/api/admin/products/${createdProduct.id}/images`, {
      method: 'POST',
      body: formData,
    });
  }

  return createdProduct;
}
```
