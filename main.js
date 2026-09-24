/**
 * DRIP ROOM — Master E-Commerce Engine
 * Exclusively Curated Archive & Thrift Jackets
 * Features: Dark Fashion + Subtle Neumorphic Interactions,
 * Product Catalog with Thrift Condition System, Persistent Cart & Wishlist,
 * Dynamic Filters, Search, PDP Multi-Angle Gallery, and Multi-Step Checkout.
 */

// ==========================================================================
// 1. PRODUCT CATALOG: 100% CURATED ARCHIVE & THRIFT JACKETS
// ==========================================================================
const DRIP_PRODUCTS = [
  {
    id: "drip-01",
    brand: "Nike",
    name: "90s Center Swoosh Ripstop Windbreaker Jacket",
    category: "windbreakers",
    price: 3499,
    origPrice: 8999,
    size: "L",
    fit: "Oversized Vintage Boxy Fit",
    condition: "EXCELLENT",
    defectNote: "Flawless vintage nylon; minimal patina on YKK zipper pull.",
    conditionReport: "Inspected by Drip Room curators. Flawless vintage nylon ripstop weave with vibrant two-tone color blocking. The embroidered center swoosh is pristine with zero loose threading. Minimal cosmetic patina on the metal YKK zipper pull consistent with 90s heritage outerwear wear.",
    measurements: {
      chest: { cm: 124, in: 48.8 },
      length: { cm: 72, in: 28.3 },
      shoulder: { cm: 54, in: 21.2 },
      sleeve: { cm: 64, in: 25.2 },
      waist: { cm: 118, in: 46.5 }
    },
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "Acquired from a curated Tokyo archive district drop. This early-to-mid 1990s Nike windbreaker represents the golden era of collegiate track aesthetics with wind-resistant nylon and breathable inner mesh lining.",
    fabric: "100% Water-repellent Recycled Nylon shell; Polyester mesh lining. Machine wash cold, hang dry.",
    featured: true
  },
  {
    id: "drip-02",
    brand: "Carhartt",
    name: "Vintage Detroit Duck Canvas Work Jacket",
    category: "workwear",
    price: 4799,
    origPrice: 12500,
    size: "XL",
    fit: "Boxy Heritage Workwear Cut",
    condition: "GOOD",
    defectNote: "Natural sun-fade patina & light distress on left cuff seam.",
    conditionReport: "Authentic American heritage duck canvas with natural worker fade and softening. Features authentic distressed patina along the lower hem and minor fray on the left cuff seam (stabilized, no tearing). Corduroy collar is plush and completely intact.",
    measurements: {
      chest: { cm: 130, in: 51.2 },
      length: { cm: 69, in: 27.2 },
      shoulder: { cm: 56, in: 22.0 },
      sleeve: { cm: 66, in: 26.0 },
      waist: { cm: 126, in: 49.6 }
    },
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "A true staple of modern Japanese and Parisian streetwear, the Carhartt Detroit Jacket earned its reputation from decades of genuine utility. The canvas has softened naturally to deliver that sought-after drape.",
    fabric: "12-oz Heavyweight 100% Ring-Spun Cotton Duck with Blanket lining. Spot clean or cold cycle.",
    featured: true
  },
  {
    id: "drip-03",
    brand: "Stüssy",
    name: "Archive Reversible Sherpa Fleece Jacket",
    category: "fleece",
    price: 3899,
    origPrice: 14500,
    size: "M",
    fit: "Relaxed Streetwear Silhouette",
    condition: "LIKE NEW",
    defectNote: "Flawless plush sherpa; clean ripstop reverse side.",
    conditionReport: "Near deadstock condition. High-loft deep pile sherpa on one side, reversible into water-resistant matte nylon shell. Ribbed hem and storm flap collar retain factory tightness. Zero pilling.",
    measurements: {
      chest: { cm: 118, in: 46.5 },
      length: { cm: 70, in: 27.6 },
      shoulder: { cm: 51, in: 20.1 },
      sleeve: { cm: 64, in: 25.2 },
      waist: { cm: 114, in: 44.9 }
    },
    images: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "Stüssy's revered outerwear drops combine California surf-skate DNA with alpine warmth. Sourced from a collector in London's Soho district.",
    fabric: "100% Polyester High-Pile Sherpa reverse 100% Nylon Ripstop.",
    featured: true
  },
  {
    id: "drip-04",
    brand: "Arc'teryx",
    name: "Beta LT GORE-TEX Tactical Mountain Shell",
    category: "technical",
    price: 5999,
    origPrice: 28000,
    size: "L",
    fit: "Technical Streamlined Fit",
    condition: "EXCELLENT",
    defectNote: "DWR water-beading refreshed; taped seams fully sealed.",
    conditionReport: "High-performance technical shell jacket verified for waterproof integrity. Seam tape is 100% intact with zero delamination. Pit ventilation zips operate smoothly. DWR water-beading coating professionally rejuvenated.",
    measurements: {
      chest: { cm: 120, in: 47.2 },
      length: { cm: 74, in: 29.1 },
      shoulder: { cm: 52, in: 20.5 },
      sleeve: { cm: 67, in: 26.4 },
      waist: { cm: 114, in: 44.9 }
    },
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "The definitive pinnacle of Gorpcore aesthetic. Lightweight, packable, and storm-proof — seamlessly moving from mountain summits to urban underground scenes.",
    fabric: "3-Layer GORE-TEX with Paclite Plus technology. Technical wash only.",
    featured: true
  },
  {
    id: "drip-05",
    brand: "Diesel",
    name: "90s Distressed Biker Leather Moto Jacket",
    category: "leather",
    price: 4999,
    origPrice: 24000,
    size: "L",
    fit: "Fitted Biker Cut",
    condition: "GOOD",
    defectNote: "Authentic grain distressing across elbows; treated with leather balm.",
    conditionReport: "Heavyweight genuine Italian cowhide leather jacket from Diesel's 90s archive. Beautiful natural patina and distressing along elbow creases and collar lapels. Heavy-gauge metal hardware and asymmetric front zip fully functioning.",
    measurements: {
      chest: { cm: 114, in: 44.9 },
      length: { cm: 66, in: 26.0 },
      shoulder: { cm: 49, in: 19.3 },
      sleeve: { cm: 65, in: 25.6 },
      waist: { cm: 106, in: 41.7 }
    },
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "Sourced from an archive dealer in Milan. Embodying late-90s subcultural rebellion, this leather moto jacket has decades of life ahead.",
    fabric: "100% Genuine Full-Grain Italian Leather with quilted satin inner lining.",
    featured: true
  },
  {
    id: "drip-06",
    brand: "Ralph Lauren",
    name: "Vintage Wool Varsity Letterman Jacket",
    category: "bombers",
    price: 4499,
    origPrice: 22000,
    size: "XL",
    fit: "Classic American Varsity Boxy Fit",
    condition: "EXCELLENT",
    defectNote: "Melton wool body immaculate; supple full-grain leather sleeves.",
    conditionReport: "Coveted Polo Ralph Lauren Letterman jacket. Heavy Melton wool body with supple off-white leather sleeves. Striped rib-knit cuffs and hem have retained elastic tension. Chain-stitched chest patch is crisp.",
    measurements: {
      chest: { cm: 128, in: 50.4 },
      length: { cm: 70, in: 27.6 },
      shoulder: { cm: 55, in: 21.7 },
      sleeve: { cm: 66, in: 26.0 },
      waist: { cm: 120, in: 47.2 }
    },
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "One of Ralph Lauren's most iconic archive silhouettes, worn in 90s hip-hop culture by NYC's Lo-Life movement. A genuine museum-grade thrift grail.",
    fabric: "80% Virgin Wool, 20% Nylon body; 100% Cowhide Leather sleeves.",
    featured: true
  },
  {
    id: "drip-07",
    brand: "The North Face",
    name: "1996 Retro Nuptse 700-Down Puffer Jacket",
    category: "puffers",
    price: 4999,
    origPrice: 26000,
    size: "L",
    fit: "Oversized Boxy Puffer Silhouette",
    condition: "EXCELLENT",
    defectNote: "Down loft is ultra-fluffy; minor stow pocket zipper pull wear.",
    conditionReport: "Iconic 700-fill goose down jacket with enormous baffle loft. Shell is durable shiny ripstop nylon. Packable hood stows neatly into the stand collar. Zero down leakage or feathers shedding.",
    measurements: {
      chest: { cm: 126, in: 49.6 },
      length: { cm: 69, in: 27.2 },
      shoulder: { cm: 54, in: 21.3 },
      sleeve: { cm: 66, in: 26.0 },
      waist: { cm: 120, in: 47.2 }
    },
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "The definitive winter jacket in NYC and London streetwear history. From Manhattan streets to high alpine base camps, the Nuptse remains untouchable.",
    fabric: "100% Recycled Nylon Ripstop with 700-fill RDS Goose Down insulation.",
    featured: true
  },
  {
    id: "drip-08",
    brand: "Adidas Originals",
    name: "80s Trefoil Track Jacket 'Challenger'",
    category: "track",
    price: 2499,
    origPrice: 6500,
    size: "M",
    fit: "Vintage Athletic Slim Fit",
    condition: "EXCELLENT",
    defectNote: "Bright tricolor stripes; flawless YKK runner.",
    conditionReport: "Archival European track jacket from the late 80s. Tricolor chest blocking in deep obsidian, cream, and burgundy. Ribbed hem and cuffs maintain original elasticity.",
    measurements: {
      chest: { cm: 112, in: 44.1 },
      length: { cm: 67, in: 26.4 },
      shoulder: { cm: 48, in: 18.9 },
      sleeve: { cm: 62, in: 24.4 },
      waist: { cm: 104, in: 40.9 }
    },
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "Classic B-Boy and terrace culture uniform. Hand-sourced from a Berlin vintage fair, this track jacket brings pure retro energy.",
    fabric: "52% Cotton, 48% Polyester vintage poly-cotton interlock jersey.",
    featured: true
  },
  {
    id: "drip-09",
    brand: "Dickies",
    name: "Insulated Eisenhower Work Jacket",
    category: "workwear",
    price: 2699,
    origPrice: 7200,
    size: "L",
    fit: "Clean Boxy Utility Cut",
    condition: "LIKE NEW",
    defectNote: "Crisp black poly-cotton twill with quilted lining.",
    conditionReport: "Quintessential American work jacket named after General Dwight D. Eisenhower. Features slash front pockets, industrial brass zipper, and pencil pocket on left sleeve. Quilted nylon lining is warm and clean.",
    measurements: {
      chest: { cm: 122, in: 48.0 },
      length: { cm: 68, in: 26.8 },
      shoulder: { cm: 52, in: 20.5 },
      sleeve: { cm: 64, in: 25.2 },
      waist: { cm: 116, in: 45.7 }
    },
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "Originally developed for US military mechanics during WWII, the Eisenhower jacket transitioned into 90s skate and mechanic subculture worldwide.",
    fabric: "65% Polyester, 35% Cotton Twill shell with polyurethane foam insulation.",
    featured: false
  },
  {
    id: "drip-10",
    brand: "Stone Island",
    name: "Vintage Raso Gommato Weatherproof Jacket",
    category: "technical",
    price: 5499,
    origPrice: 38000,
    size: "L",
    fit: "Structured Field Jacket Cut",
    condition: "MINOR FLAW",
    defectNote: "Inner polyurethane coating peeled and professionally removed.",
    conditionReport: "Massimo Osti era grail. Military-grade satin cotton shell with authentic garment-dyed olive hue. Defect notice: Classic vintage Raso Gommato inner rubberized lining has been completely stripped and cleaned (a standard restoration for vintage Stone Island). Outer shell and compass arm badge are pristine.",
    measurements: {
      chest: { cm: 118, in: 46.5 },
      length: { cm: 74, in: 29.1 },
      shoulder: { cm: 50, in: 19.7 },
      sleeve: { cm: 65, in: 25.6 },
      waist: { cm: 112, in: 44.1 }
    },
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "One of the most legendary jacket textile innovations ever engineered in Italy. Acquired directly from a private collector in London.",
    fabric: "100% Garment-Dyed Cotton Canvas. Specialist dry clean.",
    featured: false
  },
  {
    id: "drip-11",
    brand: "Starter",
    name: "90s Chicago Bulls Satin Pro Varsity Jacket",
    category: "bombers",
    price: 3899,
    origPrice: 16000,
    size: "XL",
    fit: "Oversized 90s Satin Bomber Silhouette",
    condition: "EXCELLENT",
    defectNote: "Glossy red satin; authentic snap closures; zero pulls.",
    conditionReport: "Genuine vintage 1990s Starter NBA licensed jacket. Radiant red and black heavyweight satin with embroidered Chicago Bulls back banner. Snap buttons retain full gloss and snap tightly.",
    measurements: {
      chest: { cm: 132, in: 52.0 },
      length: { cm: 72, in: 28.3 },
      shoulder: { cm: 56, in: 22.0 },
      sleeve: { cm: 66, in: 26.0 },
      waist: { cm: 122, in: 48.0 }
    },
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "Starter satin jackets ruled 90s hip-hop and basketball culture during Michael Jordan's championship dynasty. A high-voltage statement piece.",
    fabric: "100% Heavyweight Nylon Satin with insulated diamond quilted polyester lining.",
    featured: false
  },
  {
    id: "drip-12",
    brand: "Levi's",
    name: "Type III 70506 Vintage Washed Denim Trucker Jacket",
    category: "denim",
    price: 2999,
    origPrice: 8500,
    size: "M",
    fit: "Timeless Boxy Trucker Cut",
    condition: "GOOD",
    defectNote: "Natural sun-bleach whisker fade; authentic copper patina.",
    conditionReport: "Made in USA vintage 70506 Trucker jacket featuring hand pockets (introduced in the 80s). Authentic washed blue with natural whisker wear and honeycombing along the inner elbows.",
    measurements: {
      chest: { cm: 112, in: 44.1 },
      length: { cm: 64, in: 25.2 },
      shoulder: { cm: 48, in: 18.9 },
      sleeve: { cm: 62, in: 24.4 },
      waist: { cm: 104, in: 40.9 }
    },
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
    ],
    story: "The definitive blueprint for all denim jackets worldwide. Worn by rock icons and subcultures for over half a century.",
    fabric: "14-oz 100% Non-Stretch Rigid Denim Cotton.",
    featured: false
  }
];

// ==========================================================================
// 2. STATE MANAGERS (LOCALSTORAGE CART, WISHLIST & ORDER HISTORY)
// ==========================================================================
const OrderHistoryManager = {
  KEY: "drip_order_history",

  getOrders() {
    try {
      const stored = localStorage.getItem(this.KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  getOrderById(orderId) {
    return this.getOrders().find(order => order.id === orderId) || null;
  },

  saveOrder(order) {
    try {
      const orders = this.getOrders();
      orders.unshift(order);
      localStorage.setItem(this.KEY, JSON.stringify(orders));
    } catch (e) {
      console.error("Order save error", e);
    }
  }
};

const CartManager = {
  KEY: "drip_cart_items",
  PROMO_KEY: "drip_promo_code",

  getItems() {
    try {
      const stored = localStorage.getItem(this.KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Cart retrieval error", e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(items));
      this.updateHeaderBadge();
    } catch (e) {
      console.error("Cart save error", e);
    }
  },

  addItem(productId, qty = 1) {
    const items = this.getItems();
    const product = DRIP_PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const existingIndex = items.findIndex(i => i.id === productId);
    if (existingIndex > -1) {
      items[existingIndex].qty += qty;
    } else {
      items.push({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        origPrice: product.origPrice,
        size: product.size,
        condition: product.condition,
        image: product.images[0],
        qty: qty
      });
    }

    this.saveItems(items);
    showToast(`Added "${product.name}" to cart`, "✓");
    return true;
  },

  updateQty(productId, newQty) {
    let items = this.getItems();
    if (newQty <= 0) {
      this.removeItem(productId);
      return;
    }
    const target = items.find(i => i.id === productId);
    if (target) {
      target.qty = newQty;
      this.saveItems(items);
    }
  },

  removeItem(productId) {
    let items = this.getItems();
    const removedItem = items.find(i => i.id === productId);
    items = items.filter(i => i.id !== productId);
    this.saveItems(items);
    if (removedItem) {
      showToast(`Removed "${removedItem.name}"`, "×");
    }
  },

  clear() {
    localStorage.removeItem(this.KEY);
    this.updateHeaderBadge();
  },

  getTotalCount() {
    return this.getItems().reduce((acc, item) => acc + item.qty, 0);
  },

  getSubtotal() {
    return this.getItems().reduce((acc, item) => acc + (item.price * item.qty), 0);
  },

  getDiscountAmount(subtotal) {
    const promo = this.getPromoCode();
    if (promo === "DRIP10") {
      return Math.round(subtotal * 0.10);
    } else if (promo === "VINTAGE20") {
      return Math.round(subtotal * 0.20);
    }
    return 0;
  },

  getShipping(subtotal) {
    if (subtotal === 0) return 0;
    return subtotal >= 2499 ? 0 : 199;
  },

  getFinalTotal() {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount(subtotal);
    const shipping = this.getShipping(subtotal);
    return Math.max(0, subtotal - discount + shipping);
  },

  applyPromo(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "DRIP10" || cleanCode === "VINTAGE20") {
      localStorage.setItem(this.PROMO_KEY, cleanCode);
      return { success: true, message: `Promo code ${cleanCode} applied!` };
    }
    return { success: false, message: "Invalid code. Try DRIP10 for 10% off." };
  },

  getPromoCode() {
    return localStorage.getItem(this.PROMO_KEY) || "";
  },

  updateHeaderBadge() {
    const count = this.getTotalCount();
    document.querySelectorAll(".cart-count-badge").forEach(badge => {
      badge.textContent = count;
      badge.classList.remove("pop");
      void badge.offsetWidth;
      badge.classList.add("pop");
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }
};

const WishlistManager = {
  KEY: "drip_wishlist_ids",

  getIds() {
    try {
      const stored = localStorage.getItem(this.KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  toggle(productId) {
    let ids = this.getIds();
    const exists = ids.includes(productId);

    if (exists) {
      ids = ids.filter(id => id !== productId);
      showToast(`Removed from wishlist`, "♡");
    } else {
      ids.push(productId);
      showToast(`Saved to wishlist`, "♥");
    }

    localStorage.setItem(this.KEY, JSON.stringify(ids));
    this.updateHeaderBadge();
    this.syncHeartButtons();
    return !exists;
  },

  isWishlisted(productId) {
    return this.getIds().includes(productId);
  },

  updateHeaderBadge() {
    const count = this.getIds().length;
    document.querySelectorAll(".wishlist-count-badge").forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  },

  syncHeartButtons() {
    const ids = this.getIds();
    document.querySelectorAll("[data-wishlist-id]").forEach(btn => {
      const id = btn.getAttribute("data-wishlist-id");
      if (ids.includes(id)) {
        btn.classList.add("active");
        btn.innerHTML = `♥`;
      } else {
        btn.classList.remove("active");
        btn.innerHTML = `♡`;
      }
    });
  }
};

// ==========================================================================
// 3. TOAST NOTIFICATION UTILITY
// ==========================================================================
function showToast(message, icon = "✓") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ==========================================================================
// 3B. CUSTOMER ACCOUNT MODAL
const DRIP_API_BASE = window.location.port === "5500" ? "http://localhost:3000" : "";

function openAccountModal() {
  let modal = document.getElementById("accountModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "accountModal";
    modal.className = "modal-overlay";
    modal.innerHTML = `<div class="modal-content-card" style="max-width:460px"><button class="modal-close-btn" aria-label="Close account form">✕</button><h3 style="margin-bottom:.4rem">Create your account</h3><p style="color:var(--text-secondary);font-size:.88rem;margin-bottom:1.25rem">Save your details for faster checkout and archive drops.</p><form id="accountForm" style="display:grid;gap:.55rem"><label>Name</label><input name="full_name" class="nm-input" type="text" autocomplete="name" required><label>Mobile number</label><input name="phone" class="nm-input" type="tel" autocomplete="tel" required><label>Email address</label><input name="email" class="nm-input" type="email" autocomplete="email" required><button class="nm-btn nm-btn-primary" type="submit">Create account <span>→</span></button><p id="accountFormMessage" role="status" style="min-height:1.5rem;color:var(--accent-cream);font-size:.82rem"></p></form></div>`;
    document.body.appendChild(modal);
    modal.querySelector(".modal-close-btn").addEventListener("click", closeAccountModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeAccountModal(); });
    modal.querySelector("form").addEventListener("submit", submitAccountForm);
  }
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAccountModal() {
  const modal = document.getElementById("accountModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

async function submitAccountForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("accountFormMessage");
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  message.textContent = "Creating your account...";
  try {
    const response = await fetch(`${DRIP_API_BASE}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "Unable to create your account.");
    message.textContent = result.data?.message || "Check your email to finish creating your account.";
    form.reset();
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : "Unable to create your account.";
  } finally {
    button.disabled = false;
  }
}

// 4. QUICK VIEW MODAL
// ==========================================================================
function initQuickViewModal() {
  let modalOverlay = document.getElementById("quickViewModal");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "quickViewModal";
    modalOverlay.className = "modal-overlay";
    modalOverlay.innerHTML = `
      <div class="modal-content-card">
        <button class="modal-close-btn" id="closeQuickView" aria-label="Close modal">✕</button>
        <div id="quickViewBody"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeQuickViewModal();
    });

    document.getElementById("closeQuickView").addEventListener("click", closeQuickViewModal);
  }
}

function openQuickView(productId) {
  const product = DRIP_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalOverlay = document.getElementById("quickViewModal");
  const modalBody = document.getElementById("quickViewBody");
  if (!modalOverlay || !modalBody) return;

  const conditionClass = "cond-" + product.condition.toLowerCase().replace(/\s+/g, "-");

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
      <div style="border-radius: var(--radius-md); overflow: hidden; background: #111214; border: 1px solid var(--border-subtle);">
        <img src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 380px; object-fit: cover;">
      </div>
      <div>
        <div class="product-brand" style="margin-bottom: 0.4rem;">${product.brand} • Archive Jacket</div>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.75rem;">${product.name}</h3>
        
        <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1rem;">
          <span style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800;">₹${product.price.toLocaleString("en-IN")}</span>
          <span style="color: var(--text-muted); text-decoration: line-through;">₹${product.origPrice.toLocaleString("en-IN")}</span>
        </div>

        <div style="margin-bottom: 1.25rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <span class="cond-badge ${conditionClass}">${product.condition}</span>
          <span class="product-size-pill">Size: ${product.size}</span>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${product.fit}</span>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 0.85rem 1rem; border-radius: 8px; border-left: 3px solid var(--accent-cream); margin-bottom: 1.5rem; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 0.2rem;">Inspection Note:</strong>
          ${product.defectNote}
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
          <button class="nm-btn nm-btn-primary" style="flex: 1;" onclick="CartManager.addItem('${product.id}'); closeQuickViewModal();">
            Add to Bag
          </button>
          <a href="product-detail.html?id=${product.id}" class="nm-btn" style="flex: 1;">
            Full Jacket Specs →
          </a>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickViewModal() {
  const modalOverlay = document.getElementById("quickViewModal");
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// 5. GLOBAL SEARCH OVERLAY
// ==========================================================================
function initSearchModal() {
  let searchModal = document.getElementById("searchModal");
  if (!searchModal) {
    searchModal = document.createElement("div");
    searchModal.id = "searchModal";
    searchModal.className = "modal-overlay";
    searchModal.innerHTML = `
      <div class="modal-content-card search-modal-box">
        <button class="modal-close-btn" id="closeSearchModal" aria-label="Close search">✕</button>
        <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Search Archive Jackets</h3>
        <input type="text" id="globalSearchInput" class="nm-input" placeholder="Search jackets by brand, style, era... (e.g. Carhartt, Windbreaker, XL)" autofocus>
        <div id="searchResultsList" class="search-results-list"></div>
      </div>
    `;
    document.body.appendChild(searchModal);

    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) closeSearchModal();
    });

    document.getElementById("closeSearchModal").addEventListener("click", closeSearchModal);

    const input = document.getElementById("globalSearchInput");
    input.addEventListener("input", (e) => {
      renderSearchSuggestions(e.target.value.trim());
    });
  }

  document.querySelectorAll(".header-search-trigger").forEach(btn => {
    btn.addEventListener("click", openSearchModal);
  });
}

function openSearchModal() {
  const modal = document.getElementById("searchModal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    const input = document.getElementById("globalSearchInput");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
      renderSearchSuggestions("");
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById("searchModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function renderSearchSuggestions(query) {
  const list = document.getElementById("searchResultsList");
  if (!list) return;

  if (!query) {
    list.innerHTML = `
      <div style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem; text-align: center;">
        Trending jacket searches: 
        <span style="color: var(--accent-cream); cursor: pointer;" onclick="document.getElementById('globalSearchInput').value='windbreaker'; renderSearchSuggestions('windbreaker');">Windbreaker</span>, 
        <span style="color: var(--accent-cream); cursor: pointer;" onclick="document.getElementById('globalSearchInput').value='Carhartt'; renderSearchSuggestions('Carhartt');">Carhartt</span>, 
        <span style="color: var(--accent-cream); cursor: pointer;" onclick="document.getElementById('globalSearchInput').value='bomber'; renderSearchSuggestions('bomber');">Bomber</span>,
        <span style="color: var(--accent-cream); cursor: pointer;" onclick="document.getElementById('globalSearchInput').value='Arc\'teryx'; renderSearchSuggestions('Arc\'teryx');">Arc'teryx</span>
      </div>
    `;
    return;
  }

  const matches = DRIP_PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q) ||
      p.size.toLowerCase() === q
    );
  });

  if (matches.length === 0) {
    list.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No archive jackets found matching "${query}".</div>`;
    return;
  }

  list.innerHTML = matches.map(p => `
    <a href="product-detail.html?id=${p.id}" class="search-result-row" onclick="closeSearchModal()">
      <img src="${p.images[0]}" alt="${p.name}" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px;">
      <div style="flex-grow: 1;">
        <div style="font-size: 0.72rem; color: var(--accent-cream); font-weight: 700; text-transform: uppercase;">${p.brand} • Size ${p.size}</div>
        <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">${p.name}</div>
        <div style="font-size: 0.76rem; color: var(--text-muted);">${p.condition} Condition • ${p.category}</div>
      </div>
      <div style="font-family: var(--font-display); font-weight: 700; font-size: 1.05rem;">
        ₹${p.price.toLocaleString("en-IN")}
      </div>
    </a>
  `).join("");
}

// ==========================================================================
// 6. CARD TEMPLATE GENERATOR
// ==========================================================================
function createProductCardHTML(product) {
  const isFav = WishlistManager.isWishlisted(product.id);
  const conditionClass = "cond-" + product.condition.toLowerCase().replace(/\s+/g, "-");

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-media">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        
        <div class="product-badges-top">
          <span class="cond-badge ${conditionClass}">${product.condition}</span>
        </div>

        <button class="product-wishlist-btn ${isFav ? 'active' : ''}" 
                data-wishlist-id="${product.id}" 
                aria-label="Save ${product.name} to wishlist" 
                onclick="event.stopPropagation(); WishlistManager.toggle('${product.id}')">
          ${isFav ? '♥' : '♡'}
        </button>

        <div class="quick-view-overlay">
          <button class="nm-btn nm-btn-sm" onclick="event.stopPropagation(); openQuickView('${product.id}')">
            Quick View
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-brand-row">
          <span class="product-brand">${product.brand}</span>
          <span class="product-size-pill">Size: ${product.size}</span>
        </div>

        <h3 class="product-title">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>

        ${product.condition === "MINOR FLAW" ? `
          <div class="product-defect-note">
            <span>⚠</span> ${product.defectNote}
          </div>
        ` : ''}

        <div class="product-price-row">
          <div>
            <span class="product-price">₹${product.price.toLocaleString("en-IN")}</span>
            <span class="product-orig-price">₹${product.origPrice.toLocaleString("en-IN")}</span>
          </div>

          <button class="product-add-btn" 
                  aria-label="Add ${product.name} to bag" 
                  onclick="event.stopPropagation(); CartManager.addItem('${product.id}')">
            +
          </button>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// 7. HOMEPAGE HYDRATION (`index.html`)
// ==========================================================================
function hydrateHomepage() {
  const trendingGrid = document.getElementById("trendingProductGrid");
  if (!trendingGrid) return;

  const featured = DRIP_PRODUCTS.slice(0, 8);
  trendingGrid.innerHTML = featured.map(createProductCardHTML).join("");
  WishlistManager.syncHeartButtons();
}

// ==========================================================================
// 8. SHOP CATALOG HYDRATION (`product-listing.html`)
// ==========================================================================
function hydrateShopPage() {
  const shopGrid = document.getElementById("shopProductGrid");
  if (!shopGrid) return;

  const state = {
    category: "all",
    brands: [],
    sizes: [],
    conditions: [],
    maxPrice: 6000,
    sort: "featured",
    search: ""
  };

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("category")) state.category = urlParams.get("category");
  if (urlParams.get("q")) state.search = urlParams.get("q");

  const priceSlider = document.getElementById("priceSlider");
  const priceDisplay = document.getElementById("priceDisplay");
  const searchInput = document.getElementById("shopSearchInput");
  const sortSelect = document.getElementById("shopSortSelect");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      priceDisplay.textContent = `₹${state.maxPrice.toLocaleString("en-IN")}`;
      applyFiltersAndRender();
    });
  }

  if (searchInput) {
    if (state.search) searchInput.value = state.search;
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      applyFiltersAndRender();
    });
  }

  document.querySelectorAll("input[name='filter-category']").forEach(cb => {
    cb.addEventListener("change", (e) => {
      state.category = e.target.value;
      applyFiltersAndRender();
    });
  });

  document.querySelectorAll("input[name='filter-brand']").forEach(cb => {
    cb.addEventListener("change", () => {
      state.brands = Array.from(document.querySelectorAll("input[name='filter-brand']:checked")).map(c => c.value);
      applyFiltersAndRender();
    });
  });

  document.querySelectorAll("input[name='filter-condition']").forEach(cb => {
    cb.addEventListener("change", () => {
      state.conditions = Array.from(document.querySelectorAll("input[name='filter-condition']:checked")).map(c => c.value);
      applyFiltersAndRender();
    });
  });

  document.querySelectorAll(".size-chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const size = btn.getAttribute("data-size");
      btn.classList.toggle("active");
      if (state.sizes.includes(size)) {
        state.sizes = state.sizes.filter(s => s !== size);
      } else {
        state.sizes.push(size);
      }
      applyFiltersAndRender();
    });
  });

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      state.category = "all";
      state.brands = [];
      state.sizes = [];
      state.conditions = [];
      state.maxPrice = 6000;
      state.search = "";
      if (priceSlider) priceSlider.value = 6000;
      if (priceDisplay) priceDisplay.textContent = "₹6,000";
      if (searchInput) searchInput.value = "";
      document.querySelectorAll("input[name='filter-category']").forEach(c => c.checked = (c.value === "all"));
      document.querySelectorAll("input[name='filter-brand']:checked").forEach(c => c.checked = false);
      document.querySelectorAll("input[name='filter-condition']:checked").forEach(c => c.checked = false);
      document.querySelectorAll(".size-chip-btn.active").forEach(b => b.classList.remove("active"));
      applyFiltersAndRender();
    });
  }

  const mobileFilterBtn = document.getElementById("mobileFilterTrigger");
  const filterDrawer = document.getElementById("mobileFilterDrawer");
  const closeFilterDrawerBtn = document.getElementById("closeFilterDrawer");

  if (mobileFilterBtn && filterDrawer) {
    mobileFilterBtn.addEventListener("click", () => {
      filterDrawer.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeFilterDrawerBtn && filterDrawer) {
    closeFilterDrawerBtn.addEventListener("click", () => {
      filterDrawer.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  function applyFiltersAndRender() {
    let filtered = DRIP_PRODUCTS.filter(p => {
      if (state.category !== "all" && p.category.toLowerCase() !== state.category.toLowerCase()) {
        return false;
      }
      if (state.brands.length > 0 && !state.brands.includes(p.brand)) {
        return false;
      }
      if (state.conditions.length > 0 && !state.conditions.includes(p.condition)) {
        return false;
      }
      if (state.sizes.length > 0 && !state.sizes.includes(p.size)) {
        return false;
      }
      if (p.price > state.maxPrice) {
        return false;
      }
      if (state.search) {
        const text = `${p.name} ${p.brand} ${p.category} ${p.condition} ${p.fit}`.toLowerCase();
        if (!text.includes(state.search)) return false;
      }
      return true;
    });

    if (state.sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sort === "condition") {
      const order = { "NEW": 1, "LIKE NEW": 2, "EXCELLENT": 3, "GOOD": 4, "MINOR FLAW": 5 };
      filtered.sort((a, b) => (order[a.condition] || 9) - (order[b.condition] || 9));
    }

    const countEl = document.getElementById("shopResultsCount");
    if (countEl) {
      countEl.textContent = `${filtered.length} Archive Jackets Found`;
    }

    if (filtered.length === 0) {
      shopGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No Archive Jackets Matched Your Criteria</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Try clearing your brand or condition filters to see all available jackets.</p>
          <button class="nm-btn nm-btn-primary" onclick="document.getElementById('clearFiltersBtn').click();">Reset Jacket Filters</button>
        </div>
      `;
    } else {
      shopGrid.innerHTML = filtered.map(createProductCardHTML).join("");
      WishlistManager.syncHeartButtons();
    }
  }

  applyFiltersAndRender();
}

// ==========================================================================
// 9. PRODUCT DETAIL PAGE HYDRATION (`product-detail.html`)
// ==========================================================================
function hydrateProductDetailPage() {
  const pdpContainer = document.getElementById("pdpMainContainer");
  if (!pdpContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "drip-01";
  const product = DRIP_PRODUCTS.find(p => p.id === productId) || DRIP_PRODUCTS[0];

  const conditionClass = "cond-" + product.condition.toLowerCase().replace(/\s+/g, "-");

  pdpContainer.innerHTML = `
    <div class="container">
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 2rem; display: flex; gap: 0.5rem; align-items: center;">
        <a href="index.html" style="color: var(--text-secondary);">Home</a> / 
        <a href="product-listing.html" style="color: var(--text-secondary);">Jackets Vault</a> / 
        <a href="product-listing.html?category=${product.category}" style="color: var(--text-secondary); text-transform: capitalize;">${product.category}</a> / 
        <span style="color: var(--accent-cream);">${product.name}</span>
      </div>

      <div class="product-detail-layout">
        <!-- Media Gallery -->
        <div class="pdp-gallery-wrap">
          <div class="pdp-thumbnails" id="pdpThumbnails">
            ${product.images.map((img, idx) => `
              <div class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" data-thumb-idx="${idx}">
                <img src="${img}" alt="${product.name} angle ${idx + 1}">
              </div>
            `).join("")}
          </div>

          <div class="pdp-main-image-box">
            <img id="pdpMainImage" src="${product.images[0]}" alt="${product.name}">
          </div>
        </div>

        <!-- Purchase & Condition Info -->
        <div class="pdp-info-col">
          <div>
            <span class="pdp-brand-tag">${product.brand} • Archive Outerwear</span>
            <h1 class="pdp-title">${product.name}</h1>
          </div>

          <div class="pdp-price-wrap">
            <span class="pdp-price-current">₹${product.price.toLocaleString("en-IN")}</span>
            <span class="pdp-price-orig">₹${product.origPrice.toLocaleString("en-IN")}</span>
            <span class="pdp-save-badge">Save ₹${(product.origPrice - product.price).toLocaleString("en-IN")}</span>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <span class="cond-badge ${conditionClass}">${product.condition}</span>
            <span class="product-size-pill">Tag Size: ${product.size}</span>
            <span style="font-size: 0.84rem; color: var(--text-secondary);">Fit: ${product.fit}</span>
            <span style="font-size: 0.76rem; color: var(--accent-amber); margin-left: auto;">⚡ 1-of-1 Piece • Only 1 in Vault</span>
          </div>

          <!-- Condition Transparency Report -->
          <div class="pdp-condition-report">
            <div class="pdp-report-header">
              <span style="font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;">Jacket Condition Inspection Report</span>
              <span class="cond-badge ${conditionClass}">${product.condition}</span>
            </div>
            <p class="pdp-report-body">${product.conditionReport}</p>
            ${product.condition === "MINOR FLAW" ? `
              <div class="pdp-defect-breakdown">
                <strong>Honest Flaw Disclosure:</strong> ${product.defectNote}
              </div>
            ` : ''}
          </div>

          <!-- Exact Garment Measurements -->
          <div class="pdp-measurements-box">
            <div class="pdp-measure-head">
              <div>
                <span style="font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;">Hand-Measured Flat Specs</span>
                <p style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.2rem;">Compare with your best fitting jacket laid flat</p>
              </div>
              <div class="measure-toggle-group">
                <button class="measure-toggle-btn active" id="unitCmBtn">CM</button>
                <button class="measure-toggle-btn" id="unitInBtn">INCHES</button>
              </div>
            </div>

            <table class="measure-table" id="measurementsTable">
              ${renderMeasurementsTable(product.measurements, "cm")}
            </table>
          </div>

          <!-- Purchase Action Buttons -->
          <div class="pdp-actions-row">
            <button class="nm-btn nm-btn-primary" id="pdpAddToCart">
              Add Jacket to Bag
            </button>
            <button class="nm-btn nm-btn-secondary" id="pdpBuyNow">
              Instant Buy Now
            </button>
            <button class="nm-icon-btn ${WishlistManager.isWishlisted(product.id) ? 'active' : ''}" 
                    id="pdpWishlistBtn" 
                    data-wishlist-id="${product.id}"
                    aria-label="Wishlist">
              ${WishlistManager.isWishlisted(product.id) ? '♥' : '♡'}
            </button>
          </div>

          <!-- Accordion Tabs -->
          <div class="pdp-accordion-group">
            <div class="pdp-accordion-item open">
              <button class="pdp-accordion-trigger">
                Archive Provenance & Jacket History
                <span class="accordion-icon">▾</span>
              </button>
              <div class="pdp-accordion-content">
                ${product.story}
              </div>
            </div>

            <div class="pdp-accordion-item">
              <button class="pdp-accordion-trigger">
                Outerwear Fabric & Care Guide
                <span class="accordion-icon">▾</span>
              </button>
              <div class="pdp-accordion-content">
                ${product.fabric}
              </div>
            </div>

            <div class="pdp-accordion-item">
              <button class="pdp-accordion-trigger">
                Drip Room Outerwear Guarantee & Shipping
                <span class="accordion-icon">▾</span>
              </button>
              <div class="pdp-accordion-content">
                Every vintage jacket is individually hand-inspected, steam-sanitized, and verified for authenticity. Shipped with heavy-duty garment protection in biodegradable packaging. Orders above ₹2,499 qualify for Free Express Shipping across India.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Items Carousel/Grid -->
      <div style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle);">
        <h2 style="font-size: 1.8rem; margin-bottom: 2rem;">More Curated Archive Jackets</h2>
        <div class="product-grid" id="relatedProductsGrid"></div>
      </div>
    </div>
  `;

  const mainImg = document.getElementById("pdpMainImage");
  const thumbs = document.querySelectorAll(".pdp-thumb-item");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const idx = thumb.getAttribute("data-thumb-idx");
      if (mainImg && product.images[idx]) {
        mainImg.src = product.images[idx];
      }
    });
  });

  const cmBtn = document.getElementById("unitCmBtn");
  const inBtn = document.getElementById("unitInBtn");
  const table = document.getElementById("measurementsTable");

  cmBtn.addEventListener("click", () => {
    cmBtn.classList.add("active");
    inBtn.classList.remove("active");
    table.innerHTML = renderMeasurementsTable(product.measurements, "cm");
  });

  inBtn.addEventListener("click", () => {
    inBtn.classList.add("active");
    cmBtn.classList.remove("active");
    table.innerHTML = renderMeasurementsTable(product.measurements, "in");
  });

  document.getElementById("pdpAddToCart").addEventListener("click", () => {
    CartManager.addItem(product.id);
  });

  document.getElementById("pdpBuyNow").addEventListener("click", () => {
    CartManager.addItem(product.id);
    window.location.href = "checkout.html";
  });

  const wishBtn = document.getElementById("pdpWishlistBtn");
  wishBtn.addEventListener("click", () => {
    WishlistManager.toggle(product.id);
  });

  document.querySelectorAll(".pdp-accordion-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("open");
    });
  });

  const relatedGrid = document.getElementById("relatedProductsGrid");
  if (relatedGrid) {
    const related = DRIP_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(createProductCardHTML).join("");
    WishlistManager.syncHeartButtons();
  }
}

function renderMeasurementsTable(measurements, unit) {
  const keys = [
    { label: "Pit to Pit (Chest)", val: measurements.chest },
    { label: "Total Back Collar to Hem Length", val: measurements.length },
    { label: "Shoulder to Shoulder", val: measurements.shoulder },
    { label: "Sleeve Length (Shoulder to Cuff)", val: measurements.sleeve },
    { label: "Bottom Hem Width Flat", val: measurements.waist }
  ].filter(item => item.val[unit] > 0);

  return keys.map(k => `
    <tr>
      <td>${k.label}</td>
      <td>${k.val[unit]} ${unit.toUpperCase()}</td>
    </tr>
  `).join("");
}

// ==========================================================================
// 10. SHOPPING CART PAGE HYDRATION (`cart.html`)
// ==========================================================================
function hydrateCartPage() {
  const container = document.getElementById("cartMainContainer");
  if (!container) return;

  function renderCartView() {
    const items = CartManager.getItems();
    const subtotal = CartManager.getSubtotal();
    const discount = CartManager.getDiscountAmount(subtotal);
    const shipping = CartManager.getShipping(subtotal);
    const finalTotal = CartManager.getFinalTotal();
    const promoCode = CartManager.getPromoCode();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🧥</div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.75rem;">Your Outerwear Bag Is Empty</h2>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 2rem; font-size: 0.95rem;">
            You haven't reserved any curated archive jackets yet. Every jacket in Drip Room is a 1-of-1 piece with genuine patina and history.
          </p>
          <a href="product-listing.html" class="nm-btn nm-btn-primary">
            Explore Curated Jackets Vault
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="cart-layout">
        <!-- Items Column -->
        <div class="cart-items-wrapper">
          <div class="cart-timer-banner">
            <span>⏳</span>
            <span>Jacket reserved for your checkout session (1-of-1 archive piece).</span>
          </div>

          ${items.map(item => `
            <div class="cart-item-card" data-item-id="${item.id}">
              <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
              </div>

              <div class="cart-item-details">
                <span class="cart-item-brand">${item.brand} • Vintage Outerwear</span>
                <a href="product-detail.html?id=${item.id}" class="cart-item-title">${item.name}</a>
                <div class="cart-item-meta">
                  <span>Size: ${item.size}</span>
                  <span>•</span>
                  <span>Condition: ${item.condition}</span>
                </div>

                <div class="cart-qty-ctrl">
                  <button class="cart-qty-btn" onclick="CartManager.updateQty('${item.id}', ${item.qty - 1}); hydrateCartPage();">−</button>
                  <span class="cart-qty-val">${item.qty}</span>
                  <button class="cart-qty-btn" onclick="CartManager.updateQty('${item.id}', ${item.qty + 1}); hydrateCartPage();">+</button>
                </div>
              </div>

              <div class="cart-item-pricing">
                <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
                <button class="cart-item-remove" onclick="CartManager.removeItem('${item.id}'); hydrateCartPage();">
                  ✕ Remove
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Summary Column -->
        <div class="order-summary-box">
          <h3 class="summary-title">Jacket Order Summary</h3>

          <div class="summary-rows">
            <div class="summary-row">
              <span>Jackets Subtotal</span>
              <span>₹${subtotal.toLocaleString("en-IN")}</span>
            </div>

            ${discount > 0 ? `
              <div class="summary-row" style="color: #a4c09d;">
                <span>Archive Discount (${promoCode})</span>
                <span>−₹${discount.toLocaleString("en-IN")}</span>
              </div>
            ` : ''}

            <div class="summary-row">
              <span>Estimated Shipping</span>
              <span>${shipping === 0 ? '<strong style="color: #a4c09d;">FREE</strong>' : '₹' + shipping}</span>
            </div>

            <div class="summary-row total-row">
              <span>Total</span>
              <span>₹${finalTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <!-- Promo Box -->
          <div class="promo-form-wrap">
            <input type="text" id="cartPromoInput" class="nm-input" placeholder="Promo code (e.g. DRIP10)" value="${promoCode}">
            <button class="nm-btn" id="applyPromoBtn">Apply</button>
          </div>

          <a href="checkout.html" class="nm-btn nm-btn-primary" style="width: 100%; text-align: center;">
            Proceed to Checkout
          </a>

          <div style="margin-top: 1.5rem; text-align: center; font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: center; gap: 1rem;">
            <span>🔒 256-Bit SSL</span>
            <span>•</span>
            <span>⚡ UPI / Cards / COD</span>
            <span>•</span>
            <span>7-Day Return</span>
          </div>
        </div>
      </div>
    `;

    const promoBtn = document.getElementById("applyPromoBtn");
    const promoInput = document.getElementById("cartPromoInput");
    if (promoBtn && promoInput) {
      promoBtn.addEventListener("click", () => {
        const res = CartManager.applyPromo(promoInput.value);
        showToast(res.message, res.success ? "✓" : "⚠");
        if (res.success) {
          renderCartView();
        }
      });
    }
  }

  renderCartView();
}

// ==========================================================================
// 11. CHECKOUT FLOW HYDRATION (`checkout.html`)
// ==========================================================================
function hydrateCheckoutPage() {
  const container = document.getElementById("checkoutMainContainer");
  if (!container) return;

  const items = CartManager.getItems();
  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state" style="max-width: 600px; margin: 4rem auto;">
        <div class="empty-cart-icon">🧥</div>
        <h2>No Jackets in Bag</h2>
        <p style="color: var(--text-secondary); margin: 1rem 0 2rem;">Please add a jacket before proceeding to checkout.</p>
        <a href="product-listing.html" class="nm-btn nm-btn-primary">Browse Archive Jackets</a>
      </div>
    `;
    return;
  }

  let currentStep = 1;
  const subtotal = CartManager.getSubtotal();
  const discount = CartManager.getDiscountAmount(subtotal);
  let shippingCost = CartManager.getShipping(subtotal);

  container.innerHTML = `
    <div class="checkout-layout">
      <!-- Checkout Stepper -->
      <div>
        <div class="checkout-stepper">
          <div class="step-item active" id="stepper1">
            <span class="step-bubble">1</span>
            <span>Shipping Address</span>
          </div>
          <div class="step-item" id="stepper2">
            <span class="step-bubble">2</span>
            <span>Delivery Speed</span>
          </div>
          <div class="step-item" id="stepper3">
            <span class="step-bubble">3</span>
            <span>Payment</span>
          </div>
        </div>

        <!-- STEP 1: ADDRESS -->
        <div class="checkout-step-panel active" id="stepPanel1">
          <h2 style="font-size: 1.4rem; margin-bottom: 1.5rem;">Where should we deliver your jacket?</h2>
          <form id="shippingAddressForm" onsubmit="event.preventDefault();">
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="shipFirstName">First Name *</label>
                <input type="text" id="shipFirstName" class="nm-input" required placeholder="Kabir">
              </div>
              <div class="form-group">
                <label class="form-label" for="shipLastName">Last Name *</label>
                <input type="text" id="shipLastName" class="nm-input" required placeholder="Mehta">
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="shipPhone">Phone (with WhatsApp) *</label>
                <input type="tel" id="shipPhone" class="nm-input" required placeholder="+91 98765 43210">
              </div>
              <div class="form-group">
                <label class="form-label" for="shipEmail">Email Address *</label>
                <input type="email" id="shipEmail" class="nm-input" required placeholder="kabir@example.com">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="shipStreet">Street Address & Landmark *</label>
              <input type="text" id="shipStreet" class="nm-input" required placeholder="Market near Taj Hotel">
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="shipCity">City *</label>
                <input type="text" id="shipCity" class="nm-input" required placeholder="Ooty">
              </div>
              <div class="form-group">
                <label class="form-label" for="shipPin">Postal PIN Code *</label>
                <input type="text" id="shipPin" class="nm-input" required placeholder="643001" maxlength="6">
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
              <button type="button" class="nm-btn nm-btn-primary" id="btnToStep2">
                Continue to Delivery →
              </button>
            </div>
          </form>
        </div>

        <!-- STEP 2: DELIVERY METHOD -->
        <div class="checkout-step-panel" id="stepPanel2">
          <h2 style="font-size: 1.4rem; margin-bottom: 1.5rem;">Select Shipping Speed</h2>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            <label class="payment-method-card selected" id="optDeliveryStandard" style="cursor: pointer;">
              <div class="payment-method-header">
                <span>⚡ Standard Express (Bluedart / Delhivery)</span>
                <strong style="color: var(--accent-cream);">${subtotal >= 2499 ? 'FREE' : '₹199'}</strong>
              </div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">3–5 business days with tracked doorstep delivery.</p>
            </label>

            <label class="payment-method-card" id="optDeliveryPriority" style="cursor: pointer;">
              <div class="payment-method-header">
                <span>✈️ Priority Air Courier (Next Day Dispatch)</span>
                <strong style="color: var(--accent-cream);">₹349</strong>
              </div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">1–2 business days guaranteed air priority transit.</p>
            </label>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <button type="button" class="nm-btn" id="btnBackToStep1">← Back</button>
            <button type="button" class="nm-btn nm-btn-primary" id="btnToStep3">Continue to Payment →</button>
          </div>
        </div>

        <!-- STEP 3: PAYMENT -->
        <div class="checkout-step-panel" id="stepPanel3">
          <h2 style="font-size: 1.4rem; margin-bottom: 1.5rem;">Choose Payment Method</h2>

          <div class="payment-methods-grid">
            <div class="payment-method-card selected" data-pay-type="upi">
              <div class="payment-method-header">
                <span>Instant UPI</span>
                <span>⚡</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary);">Google Pay, PhonePe, Paytm, CRED</p>
            </div>

            <div class="payment-method-card" data-pay-type="cards">
              <div class="payment-method-header">
                <span>Credit / Debit Card</span>
                <span>💳</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary);">Visa, Mastercard, RuPay, Amex</p>
            </div>

            <div class="payment-method-card" data-pay-type="cod">
              <div class="payment-method-header">
                <span>Cash on Delivery</span>
                <span>💵</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary);">Pay at doorstep upon delivery</p>
            </div>

            <div class="payment-method-card" data-pay-type="netbanking">
              <div class="payment-method-header">
                <span>Net Banking</span>
                <span>🏛️</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary);">All major Indian banks</p>
            </div>
          </div>

          <div id="paymentDynamicInputs" style="margin-bottom: 2rem;">
            <div class="form-group">
              <label class="form-label" for="upiIdInput">Enter UPI ID</label>
              <input type="text" id="upiIdInput" class="nm-input" placeholder="yourname@okhdfcbank">
            </div>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <button type="button" class="nm-btn" id="btnBackToStep2">← Back</button>
            <button type="button" class="nm-btn nm-btn-primary" id="btnPlaceOrder">
              Confirm & Place Order
            </button>
          </div>
        </div>
      </div>

      <!-- Live Order Review Box -->
      <div class="order-summary-box">
        <h3 class="summary-title">Jacket Bag (${items.length})</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; max-height: 260px; overflow-y: auto;">
          ${items.map(item => `
            <div style="display: flex; gap: 0.75rem; align-items: center;">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 60px; object-fit: cover; border-radius: 6px;">
              <div style="flex-grow: 1;">
                <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); line-height: 1.2;">${item.name}</div>
                <div style="font-size: 0.74rem; color: var(--text-muted);">Size: ${item.size} • Qty: ${item.qty}</div>
              </div>
              <div style="font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;">
                ₹${(item.price * item.qty).toLocaleString("en-IN")}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="summary-rows">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toLocaleString("en-IN")}</span>
          </div>

          ${discount > 0 ? `
            <div class="summary-row" style="color: #a4c09d;">
              <span>Archive Promo</span>
              <span>−₹${discount.toLocaleString("en-IN")}</span>
            </div>
          ` : ''}

          <div class="summary-row">
            <span>Shipping</span>
            <span id="checkoutShippingDisplay">${shippingCost === 0 ? 'FREE' : '₹' + shippingCost}</span>
          </div>

          <div class="summary-row total-row">
            <span>Total Payable</span>
            <span id="checkoutTotalDisplay">₹${Math.max(0, subtotal - discount + shippingCost).toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Confirmation Modal -->
    <div id="orderSuccessModal" class="modal-overlay">
      <div class="modal-content-card" style="text-align: center; max-width: 550px;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(164, 192, 157, 0.2); border: 2px solid #a4c09d; color: #a4c09d; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
          ✓
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Jacket Secured!</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">
          Your 1-of-1 archive jacket has been marked as sold and reserved for you. An order confirmation has been dispatched.
        </p>

        <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 2rem; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem;">
            <span style="color: var(--text-muted);">Order ID:</span>
            <strong id="orderTrackingCode" style="color: var(--accent-cream); font-family: var(--font-display);">—</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-muted);">Estimated Dispatch:</span>
            <span>Within 24 Hours via Express Air</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a id="viewOrderHistoryBtn" href="orders.html" class="nm-btn nm-btn-primary" style="width: 100%; text-align: center;">
            View Order History
          </a>
          <a href="index.html" class="nm-btn" style="width: 100%; text-align: center;">
            Return to Drip Room Home
          </a>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btnToStep2").addEventListener("click", () => {
    const fn = document.getElementById("shipFirstName").value.trim();
    const ln = document.getElementById("shipLastName").value.trim();
    const phone = document.getElementById("shipPhone").value.trim();
    const email = document.getElementById("shipEmail").value.trim();
    const street = document.getElementById("shipStreet").value.trim();
    const city = document.getElementById("shipCity").value.trim();
    const pin = document.getElementById("shipPin").value.trim();

    if (!fn || !ln || !phone || !email || !street || !city || !pin) {
      showToast("Please fill in all required shipping fields.", "⚠");
      return;
    }

    setStep(2);
  });

  document.getElementById("btnBackToStep1").addEventListener("click", () => setStep(1));

  const standardDel = document.getElementById("optDeliveryStandard");
  const priorityDel = document.getElementById("optDeliveryPriority");

  standardDel.addEventListener("click", () => {
    standardDel.classList.add("selected");
    priorityDel.classList.remove("selected");
    shippingCost = CartManager.getShipping(subtotal);
    updateTotals();
  });

  priorityDel.addEventListener("click", () => {
    priorityDel.classList.add("selected");
    standardDel.classList.remove("selected");
    shippingCost = 349;
    updateTotals();
  });

  document.getElementById("btnToStep3").addEventListener("click", () => setStep(3));
  document.getElementById("btnBackToStep2").addEventListener("click", () => setStep(2));

  const payCards = document.querySelectorAll(".payment-method-card[data-pay-type]");
  const payInputs = document.getElementById("paymentDynamicInputs");

  payCards.forEach(card => {
    card.addEventListener("click", () => {
      payCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      const type = card.getAttribute("data-pay-type");

      if (type === "upi") {
        payInputs.innerHTML = `
          <div class="form-group">
            <label class="form-label" for="upiIdInput">Enter UPI ID</label>
            <input type="text" id="upiIdInput" class="nm-input" placeholder="yourname@okhdfcbank">
          </div>
        `;
      } else if (type === "cards") {
        payInputs.innerHTML = `
          <div class="form-group">
            <label class="form-label">Card Number</label>
            <input type="text" class="nm-input" placeholder="4111 2222 3333 4444" maxlength="19">
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Expiry MM/YY</label>
              <input type="text" class="nm-input" placeholder="08/28" maxlength="5">
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input type="password" class="nm-input" placeholder="•••" maxlength="3">
            </div>
          </div>
        `;
      } else if (type === "cod") {
        payInputs.innerHTML = `
          <div style="background: rgba(200, 149, 71, 0.1); border: 1px solid rgba(200, 149, 71, 0.3); padding: 1rem; border-radius: 8px; font-size: 0.85rem; color: #e6b976;">
            ✓ Cash on delivery available. Please keep exact cash of ₹${Math.max(0, subtotal - discount + shippingCost).toLocaleString("en-IN")} ready upon Bluedart arrival.
          </div>
        `;
      } else {
        payInputs.innerHTML = `
          <div class="form-group">
            <label class="form-label">Select Net Banking</label>
            <select class="nm-input" style="cursor: pointer;">
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>State Bank of India</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra</option>
            </select>
          </div>
        `;
      }
    });
  });

  document.getElementById("btnPlaceOrder").addEventListener("click", () => {
    const firstName = (document.getElementById("shipFirstName")?.value || "").trim();
    const lastName = (document.getElementById("shipLastName")?.value || "").trim();
    const phone = (document.getElementById("shipPhone")?.value || "").trim();
    const email = (document.getElementById("shipEmail")?.value || "").trim();
    const street = (document.getElementById("shipStreet")?.value || "").trim();
    const city = (document.getElementById("shipCity")?.value || "").trim();
    const pin = (document.getElementById("shipPin")?.value || "").trim();
    const selectedPayCard = document.querySelector(".payment-method-card.selected[data-pay-type]");
    const paymentMethod = selectedPayCard
      ? (selectedPayCard.querySelector(".payment-method-header span")?.textContent?.trim() || "Paid")
      : "Paid";
    const trackingCode = `DRIP-${Math.floor(100000 + Math.random() * 900000)}`;
    const cartSnapshot = JSON.parse(JSON.stringify(CartManager.getItems()));
    const order = {
      id: trackingCode,
      placedAt: new Date().toISOString(),
      status: "Confirmed",
      items: cartSnapshot,
      subtotal,
      discount,
      shipping: shippingCost,
      total: Math.max(0, subtotal - discount + shippingCost),
      paymentMethod,
      delivery: shippingCost === 349 ? "Priority Express" : "Standard Express",
      address: {
        name: `${firstName} ${lastName}`.trim(),
        phone,
        email,
        street,
        city,
        pin
      }
    };

    OrderHistoryManager.saveOrder(order);
    CartManager.clear();

    const successModal = document.getElementById("orderSuccessModal");
    if (successModal) {
      const trackEl = document.getElementById("orderTrackingCode");
      if (trackEl) trackEl.textContent = trackingCode;
      const viewBtn = document.getElementById("viewOrderHistoryBtn");
      if (viewBtn) viewBtn.href = `orders.html?order=${encodeURIComponent(trackingCode)}`;
      successModal.classList.add("open");
    }
  });

  function updateTotals() {
    const shipEl = document.getElementById("checkoutShippingDisplay");
    const totEl = document.getElementById("checkoutTotalDisplay");
    if (shipEl) shipEl.textContent = shippingCost === 0 ? 'FREE' : `₹${shippingCost}`;
    if (totEl) totEl.textContent = `₹${Math.max(0, subtotal - discount + shippingCost).toLocaleString("en-IN")}`;
  }

  function setStep(step) {
    currentStep = step;
    [1, 2, 3].forEach(s => {
      const stepper = document.getElementById(`stepper${s}`);
      const panel = document.getElementById(`stepPanel${s}`);
      if (stepper) {
        stepper.classList.remove("active", "completed");
        if (s === step) stepper.classList.add("active");
        if (s < step) stepper.classList.add("completed");
      }
      if (panel) {
        panel.classList.remove("active");
        if (s === step) panel.classList.add("active");
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ==========================================================================
// 12. ORDER HISTORY PAGE (`orders.html`)
// ==========================================================================
function formatOrderDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function hydrateOrderHistoryPage() {
  const container = document.getElementById("ordersMainContainer");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("order");
  const orders = OrderHistoryManager.getOrders();

  if (requestedId) {
    const order = OrderHistoryManager.getOrderById(requestedId);
    if (!order) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">📦</div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.75rem;">Order Not Found</h2>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 2rem; font-size: 0.95rem;">
            We couldn't find that order on this device. Open Order History to see jackets you have already checked out.
          </p>
          <a href="orders.html" class="nm-btn nm-btn-primary">Back to Order History</a>
        </div>
      `;
      return;
    }
    container.innerHTML = renderOrderDetail(order);
    return;
  }

  if (!orders.length) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">📦</div>
        <h2 style="font-size: 1.8rem; margin-bottom: 0.75rem;">No Orders Yet</h2>
        <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 2rem; font-size: 0.95rem;">
          After you place an order, every jacket you bought will appear here with its size, price, and delivery address.
        </p>
        <a href="product-listing.html" class="nm-btn nm-btn-primary">Shop Archive Jackets</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="orders-list">
      ${orders.map(order => {
        const firstItem = (order.items && order.items[0]) || {};
        const itemCount = (order.items || []).reduce((sum, item) => sum + (item.qty || 1), 0);
        return `
          <article class="order-card">
            <div class="order-card-media">
              <img src="${firstItem.image || ""}" alt="${escapeAttr(firstItem.name || "Ordered jacket")}">
            </div>
            <div class="order-card-body">
              <div class="order-card-meta">
                <strong class="order-id">${escapeHtml(order.id)}</strong>
                <span class="order-status">${escapeHtml(order.status || "Confirmed")}</span>
              </div>
              <p class="order-card-title">${escapeHtml(firstItem.name || "Archive jacket")}${itemCount > 1 ? ` <span class="order-more">+${itemCount - 1} more</span>` : ""}</p>
              <p class="order-card-sub">${formatOrderDate(order.placedAt)} · ₹${Number(order.total || 0).toLocaleString("en-IN")}</p>
              <a class="nm-btn nm-btn-sm" href="orders.html?order=${encodeURIComponent(order.id)}">View ordered products</a>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderOrderDetail(order) {
  const items = order.items || [];
  const addr = order.address || {};
  return `
    <a href="orders.html" class="order-back-link">← All orders</a>
    <div class="order-detail-layout">
      <div>
        <div class="order-detail-head">
          <div>
            <p class="order-id">${escapeHtml(order.id)}</p>
            <h2 class="order-detail-title">Your ordered jackets</h2>
            <p class="order-card-sub">Placed ${formatOrderDate(order.placedAt)}</p>
          </div>
          <span class="order-status">${escapeHtml(order.status || "Confirmed")}</span>
        </div>
        <div class="order-items">
          ${items.map(item => `
            <article class="order-item-row">
              <a href="product-detail.html?id=${encodeURIComponent(item.id || "")}" class="order-item-img">
                <img src="${item.image || ""}" alt="${escapeAttr(item.name || "Jacket")}">
              </a>
              <div>
                <p class="cart-item-brand">${escapeHtml(item.brand || "Vintage Outerwear")}</p>
                <a href="product-detail.html?id=${encodeURIComponent(item.id || "")}" class="cart-item-title">${escapeHtml(item.name || "Archive jacket")}</a>
                <p class="cart-item-meta">Size: ${escapeHtml(item.size || "—")} · Condition: ${escapeHtml(item.condition || "—")} · Qty: ${item.qty || 1}</p>
              </div>
              <strong class="order-item-price">₹${Number(item.price || 0).toLocaleString("en-IN")}</strong>
            </article>
          `).join("")}
        </div>
      </div>
      <aside class="order-summary-box">
        <h3 class="summary-title">Order summary</h3>
        <div class="summary-rows">
          <div class="summary-row"><span>Subtotal</span><span>₹${Number(order.subtotal || 0).toLocaleString("en-IN")}</span></div>
          ${order.discount > 0 ? `<div class="summary-row" style="color: #a4c09d;"><span>Promo</span><span>−₹${Number(order.discount).toLocaleString("en-IN")}</span></div>` : ""}
          <div class="summary-row"><span>Shipping</span><span>${order.shipping === 0 ? "FREE" : "₹" + Number(order.shipping || 0).toLocaleString("en-IN")}</span></div>
          <div class="summary-row total-row"><span>Paid</span><span>₹${Number(order.total || 0).toLocaleString("en-IN")}</span></div>
        </div>
        <p class="order-ship-label">Delivering to</p>
        <p class="order-ship-address">
          ${escapeHtml(addr.name || "")}<br>
          ${escapeHtml(addr.street || "")}<br>
          ${escapeHtml([addr.city, addr.pin].filter(Boolean).join(" — "))}<br>
          ${escapeHtml(addr.phone || "")}<br>
          ${escapeHtml(addr.email || "")}
        </p>
        <p class="order-card-sub" style="margin-top: 1rem;">${escapeHtml(order.delivery || "Standard Express")} · ${escapeHtml(order.paymentMethod || "Paid")}</p>
      </aside>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

// ==========================================================================
// 13. INITIALIZATION ROUTER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  CartManager.updateHeaderBadge();
  WishlistManager.updateHeaderBadge();

  initQuickViewModal();
  initSearchModal();
  document.querySelectorAll('a[aria-label="Order History"]').forEach(accountLink => {
    accountLink.addEventListener("click", event => {
      event.preventDefault();
      openAccountModal();
    });
  });

  const mobileToggleBtn = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  const closeDrawerBtn = document.getElementById("closeNavDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");

  function openMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.add("open");
    if (drawerBackdrop) drawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.remove("open");
    if (drawerBackdrop) drawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener("click", openMobileNav);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeMobileNav);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeMobileNav);

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input[type='email']");
      if (input && input.value) {
        showToast("You're on the list! First dibs on the next jacket drop.", "✓");
        input.value = "";
      }
    });
  }

  hydrateHomepage();
  hydrateShopPage();
  hydrateProductDetailPage();
  hydrateCartPage();
  hydrateCheckoutPage();
  hydrateOrderHistoryPage();
});
