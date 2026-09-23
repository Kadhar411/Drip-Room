-- ==============================================================================
-- seed.sql: Realistic Seed Data for Drip Room
-- Categories, Brands, 12 Curated Thrift Products with Images & Measurements, Coupons
-- ==============================================================================

-- 1. CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, is_active) VALUES
('11111111-1111-1111-1111-111111111101', 'Jackets', 'jackets', 'Curated vintage, workwear, and archival jackets.', 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111102', 'Hoodies', 'hoodies', 'Heavyweight boxy vintage hoodies and fleece.', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111103', 'T-Shirts', 't-shirts', 'Single-stitch and graphic thrift archive tees.', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111104', 'Shirts', 'shirts', 'Flannels, overshirts, and utility button-downs.', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111105', 'Trousers', 'trousers', 'Vintage carpenter pants and pleated trousers.', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111106', 'Jeans', 'jeans', 'Heritage denim washes and selvedge cuts.', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111107', 'Knitwear', 'knitwear', 'Chunky wool knit sweaters and cardigans.', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111108', 'Footwear', 'footwear', 'Archive boots and authenticated sneakers.', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111109', 'Accessories', 'accessories', 'Vintage caps, belts, and leather accessories.', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111110', 'Vintage', 'vintage', 'Rare 80s and 90s curated collectible drops.', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80', TRUE),
('11111111-1111-1111-1111-111111111111', 'New Arrivals', 'new-arrivals', 'Fresh archive vault drops sourced globally.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 2. BRANDS
INSERT INTO public.brands (id, name, slug, logo_url) VALUES
('22222222-2222-2222-2222-222222222201', 'Nike', 'nike', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg'),
('22222222-2222-2222-2222-222222222202', 'Carhartt', 'carhartt', NULL),
('22222222-2222-2222-2222-222222222203', 'Arc''teryx', 'arcteryx', NULL),
('22222222-2222-2222-2222-222222222204', 'Diesel', 'diesel', NULL),
('22222222-2222-2222-2222-222222222205', 'Ralph Lauren', 'ralph-lauren', NULL),
('22222222-2222-2222-2222-222222222206', 'Stüssy', 'stussy', NULL),
('22222222-2222-2222-2222-222222222207', 'Stone Island', 'stone-island', NULL),
('22222222-2222-2222-2222-222222222208', 'Patagonia', 'patagonia', NULL),
('22222222-2222-2222-2222-222222222209', 'Levi''s', 'levis', NULL),
('22222222-2222-2222-2222-222222222210', 'Starter', 'starter', NULL),
('22222222-2222-2222-2222-222222222211', 'Barbour', 'barbour', NULL),
('22222222-2222-2222-2222-222222222212', 'Prada Sport', 'prada-sport', NULL)
ON CONFLICT (slug) DO NOTHING;

-- 3. PRODUCTS (12 Curated 1-of-1 Vault Pieces)
-- Note: prices stored as integer minor units in GBP (£34.99 = 3499 pence)
INSERT INTO public.products (
  id, title, slug, description, brand_id, category_id, gender, size, colour, material, era_or_year,
  condition_grade, condition_notes, defects, measurements, original_price, price, currency, quantity,
  status, featured, is_one_of_one, seo_title, seo_description, published_at
) VALUES
(
  '33333333-3333-3333-3333-333333333301',
  '90s Center Swoosh Ripstop Windbreaker',
  '90s-center-swoosh-ripstop-windbreaker',
  'Acquired from a curated Tokyo archive district drop. Early-to-mid 1990s Nike windbreaker representing collegiate track aesthetics with wind-resistant nylon and breathable inner mesh lining.',
  '22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111101', 'Unisex', 'L', 'Navy / White', '100% Recycled Nylon Shell', '1994',
  'Excellent', 'Flawless vintage nylon ripstop weave with vibrant two-tone color blocking. Embroidered center swoosh is pristine.', 'Minimal cosmetic patina on metal YKK zipper pull.',
  '{"pit_to_pit_in": 24.5, "length_in": 28.5, "shoulder_in": 21.0, "sleeve_in": 25.5}'::jsonb,
  8999, 3499, 'GBP', 1, 'active', TRUE, TRUE,
  'Vintage 90s Nike Center Swoosh Windbreaker | Drip Room', 'Curated 1-of-1 1994 Nike center swoosh nylon windbreaker in size L.', NOW()
),
(
  '33333333-3333-3333-3333-333333333302',
  'Vintage Detroit Duck Canvas Work Jacket',
  'vintage-detroit-duck-canvas-work-jacket',
  'Authentic American heritage duck canvas with natural worker fade and softening. Features distressed patina along lower hem and corduroy collar.',
  '22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111101', 'Men', 'XL', 'Carhartt Brown', '12-oz 100% Ring-Spun Cotton Duck', '1998',
  'Good', 'Heavy canvas has softened naturally to deliver that sought-after drape. Corduroy collar is plush and completely intact.', 'Natural sun-fade patina and minor fray on left cuff seam.',
  '{"pit_to_pit_in": 26.0, "length_in": 27.5, "shoulder_in": 22.0, "sleeve_in": 26.0}'::jsonb,
  12500, 4799, 'GBP', 1, 'active', TRUE, TRUE,
  'Vintage Carhartt Detroit Jacket XL | Drip Room', 'Authentic 90s Carhartt Detroit Duck Canvas jacket with blanket lining.', NOW()
),
(
  '33333333-3333-3333-3333-333333333303',
  'Archive Reversible Sherpa Fleece Jacket',
  'archive-reversible-sherpa-fleece-jacket',
  'Near deadstock condition. High-loft deep pile sherpa on one side, reversible into water-resistant matte nylon shell with minimal Stüssy stock logo embroidery.',
  '22222222-2222-2222-2222-222222222206', '11111111-1111-1111-1111-111111111101', 'Unisex', 'M', 'Natural / Black', '100% High-Pile Polyester Sherpa & Nylon', '2004',
  'Like new', 'Plush sherpa fleece retains full factory loft with zero matting or pilling.', 'None detected. Near-deadstock condition.',
  '{"pit_to_pit_in": 23.0, "length_in": 27.5, "shoulder_in": 20.0, "sleeve_in": 25.0}'::jsonb,
  14500, 3899, 'GBP', 1, 'active', TRUE, TRUE,
  'Stüssy Archive Reversible Sherpa Fleece | Drip Room', 'Archival reversible high-loft sherpa jacket from Stüssy.', NOW()
),
(
  '33333333-3333-3333-3333-333333333304',
  'Beta LT GORE-TEX Tactical Mountain Shell',
  'beta-lt-gore-tex-tactical-mountain-shell',
  'The definitive pinnacle of Gorpcore aesthetic. Lightweight, packable, storm-proof 3-layer GORE-TEX shell with pit ventilation zips and storm hood.',
  '22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', 'Unisex', 'L', 'Black Sapphire', '3-Layer GORE-TEX Paclite Plus', '2019',
  'Excellent', 'Seam tape 100% intact with zero delamination. DWR water-beading performance refreshed.', 'Faint microscopic scuff on left wrist cuff, unnoticeable during wear.',
  '{"pit_to_pit_in": 23.5, "length_in": 29.0, "shoulder_in": 20.5, "sleeve_in": 26.5}'::jsonb,
  28000, 5999, 'GBP', 1, 'active', TRUE, TRUE,
  'Arc''teryx Beta LT GORE-TEX Shell Jacket | Drip Room', 'Technical Arc''teryx Beta LT shell jacket in deep sapphire.', NOW()
),
(
  '33333333-3333-3333-3333-333333333305',
  '90s Distressed Biker Leather Moto Jacket',
  '90s-distressed-biker-leather-moto-jacket',
  'Heavyweight genuine Italian cowhide leather jacket from Diesel''s 90s archive. Beautiful natural patina and distressing along elbow creases and collar lapels.',
  '22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111101', 'Men', 'L', 'Aged Brown', '100% Genuine Full-Grain Italian Leather', '1996',
  'Good', 'Leather is supple and conditioned with professional beeswax balm. Heavy-gauge metal hardware functions smoothly.', 'Authentic wear across elbow creases and collar edges.',
  '{"pit_to_pit_in": 22.5, "length_in": 26.0, "shoulder_in": 19.5, "sleeve_in": 25.5}'::jsonb,
  24000, 4999, 'GBP', 1, 'active', TRUE, TRUE,
  'Vintage 90s Diesel Leather Moto Jacket | Drip Room', 'Genuine heavy distressed cowhide moto leather jacket from 90s Diesel.', NOW()
),
(
  '33333333-3333-3333-3333-333333333306',
  'Vintage Wool Varsity Letterman Jacket',
  'vintage-wool-varsity-letterman-jacket',
  'Coveted Polo Ralph Lauren varsity jacket. Heavy Melton wool body with supple off-white genuine leather sleeves and chain-stitched collegiate crest.',
  '22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111101', 'Unisex', 'XL', 'Forest Green / Cream', 'Melton Wool & Full-Grain Leather', '1993',
  'Excellent', 'Melton wool body is dense with zero moth nibbles. Striped rib knit waistband retains strong tension.', 'Very faint leather crease marks on underarm panels.',
  '{"pit_to_pit_in": 25.5, "length_in": 27.5, "shoulder_in": 21.5, "sleeve_in": 26.0}'::jsonb,
  22000, 4499, 'GBP', 1, 'active', TRUE, TRUE,
  'Ralph Lauren Vintage Wool Varsity Jacket | Drip Room', 'Rare 1993 Ralph Lauren Letterman jacket with leather sleeves.', NOW()
),
(
  '33333333-3333-3333-3333-333333333307',
  'Raso Gommato Vintage Wind-Proof Parka',
  'raso-gommato-vintage-wind-proof-parka',
  'Iconic military-spec cotton satin coated with polyurethane. Features iconic compass sleeve badge, high storm funnel collar, and oversized storm pockets.',
  '22222222-2222-2222-2222-222222222207', '11111111-1111-1111-1111-111111111101', 'Men', 'L', 'Military Olive', 'Raso Gommato Polyurethane Coated Cotton', '2001',
  'Very good', 'Inner coating professionally stabilized. Outer cotton satin has developed a subtle garment-dyed sheen.', 'Minor typical micro-peeling at inner neck seam (stabilized).',
  '{"pit_to_pit_in": 23.5, "length_in": 31.0, "shoulder_in": 20.0, "sleeve_in": 26.0}'::jsonb,
  32000, 6499, 'GBP', 1, 'active', TRUE, TRUE,
  'Stone Island Raso Gommato Archive Parka | Drip Room', '2001 Stone Island Raso Gommato hooded field jacket with original badge.', NOW()
),
(
  '33333333-3333-3333-3333-333333333308',
  'Classic Retro-X Deep-Pile Fleece Jacket',
  'classic-retro-x-deep-pile-fleece-jacket',
  'The quintessential heritage outdoor fleece. 1/4-inch deep-pile sherpa fleece bonded with windproof barrier and nylon contrast chest pocket.',
  '22222222-2222-2222-2222-222222222208', '11111111-1111-1111-1111-111111111101', 'Unisex', 'M', 'Natural / Navy', '100% Polyester (85% Recycled) Sherpa Fleece', '2012',
  'Excellent', 'Sherpa fleece is plush with zero elbow compression. All zippers slide smoothly.', 'Very light linting along inner collar border.',
  '{"pit_to_pit_in": 22.5, "length_in": 26.5, "shoulder_in": 19.5, "sleeve_in": 25.0}'::jsonb,
  16000, 3199, 'GBP', 1, 'active', FALSE, TRUE,
  'Patagonia Classic Retro-X Sherpa Fleece | Drip Room', 'Patagonia Retro-X deep pile windproof fleece jacket.', NOW()
),
(
  '33333333-3333-3333-3333-333333333309',
  'Type III 70506 Washed Denim Trucker',
  'type-iii-70506-washed-denim-trucker',
  'Made in USA vintage 70506 Trucker jacket featuring hand warmer pockets. Authentic washed blue with natural whisker wear along inner elbows.',
  '22222222-2222-2222-2222-222222222209', '11111111-1111-1111-1111-111111111106', 'Unisex', 'M', 'Vintage Washed Indigo', '14-oz 100% Rigid Cotton Denim', '1988',
  'Good', 'Authentic vintage fade that modern reproductions cannot match. Copper buttons fully intact.', 'Gentle fraying on collar crease, reinforcing vintage authenticity.',
  '{"pit_to_pit_in": 21.5, "length_in": 25.0, "shoulder_in": 18.5, "sleeve_in": 24.5}'::jsonb,
  8500, 2999, 'GBP', 1, 'active', FALSE, TRUE,
  'Levi''s Made in USA 70506 Denim Trucker | Drip Room', 'Vintage 80s Levi''s 70506 Type III denim trucker jacket.', NOW()
),
(
  '33333333-3333-3333-3333-333333333310',
  '90s Chicago Bulls Satin Pro Varsity Jacket',
  '90s-chicago-bulls-satin-pro-varsity-jacket',
  'Genuine vintage 1990s Starter NBA licensed jacket. Radiant red and black heavyweight satin with embroidered Chicago Bulls back banner and snap front.',
  '22222222-2222-2222-2222-222222222210', '11111111-1111-1111-1111-111111111101', 'Unisex', 'XL', 'Chicago Red / Black', 'Heavyweight Nylon Satin with Quilted Polyfill', '1995',
  'Excellent', 'Satin weave is high-gloss with no snags or fabric pulls. Snap closures click securely.', 'Minor paint flake on lowest snap button.',
  '{"pit_to_pit_in": 26.5, "length_in": 28.5, "shoulder_in": 22.0, "sleeve_in": 26.0}'::jsonb,
  16000, 3899, 'GBP', 1, 'active', FALSE, TRUE,
  'Starter 90s Chicago Bulls Satin Bomber | Drip Room', 'Authentic 90s Michael Jordan era Starter Chicago Bulls satin jacket.', NOW()
),
(
  '33333333-3333-3333-3333-333333333311',
  'Vintage Beaufort Waxed Cotton Field Jacket',
  'vintage-beaufort-waxed-cotton-field-jacket',
  'Traditional British country hunting jacket made in South Shields, England. Features thornproof mediumweight 6oz waxed cotton with Barbour tartan lining.',
  '22222222-2222-2222-2222-222222222211', '11111111-1111-1111-1111-111111111101', 'Men', 'L', 'Rustic Brown', '6-oz Thornproof Waxed Egyptian Cotton', '1997',
  'Very good', 'Professionally rewaxed with Barbour Thornproof dressing. Tartan lining is pristine and odor-free.', 'Pleasing patina and micro-creasing along rear game pocket flap.',
  '{"pit_to_pit_in": 24.0, "length_in": 32.0, "shoulder_in": 20.5, "sleeve_in": 25.5}'::jsonb,
  26000, 3699, 'GBP', 1, 'active', FALSE, TRUE,
  'Barbour Vintage Beaufort Wax Jacket | Drip Room', 'Made in England Barbour Beaufort waxed field jacket with cord collar.', NOW()
),
(
  '33333333-3333-3333-3333-333333333312',
  'Linea Rossa 90s Technical Half-Zip Pullover',
  'linea-rossa-90s-technical-half-zip-pullover',
  'Rare archival Prada Sport late-90s technical shell. Waterproof nylon construction featuring the signature red rubber Linea Rossa tab on sleeve cuff.',
  '22222222-2222-2222-2222-222222222212', '11111111-1111-1111-1111-111111111101', 'Unisex', 'M', 'Matte Carbon Black', 'Technical Matte Weatherproof Nylon', '1999',
  'Like new', 'Red silicone stripe is pristine. Zippers and toggles retain factory tension.', 'Virtually zero flaws. Acquired from an Italian archive collector.',
  '{"pit_to_pit_in": 22.0, "length_in": 27.0, "shoulder_in": 19.0, "sleeve_in": 25.0}'::jsonb,
  35000, 6999, 'GBP', 1, 'active', TRUE, TRUE,
  'Prada Sport 1999 Linea Rossa Archive Shell | Drip Room', 'Archival 90s Prada Sport Linea Rossa technical pullover shell in matte black.', NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- 4. PRODUCT IMAGES (Ordered gallery per product)
INSERT INTO public.product_images (product_id, storage_path, public_url, alt_text, sort_order) VALUES
-- Product 1
('33333333-3333-3333-3333-333333333301', 'products/drip-01/front.jpg', 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80', 'Nike 90s Center Swoosh Ripstop Windbreaker Front View', 0),
('33333333-3333-3333-3333-333333333301', 'products/drip-01/back.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', 'Nike Windbreaker Back View', 1),
('33333333-3333-3333-3333-333333333301', 'products/drip-01/detail.jpg', 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80', 'Nike Center Swoosh Embroidery Detail', 2),

-- Product 2
('33333333-3333-3333-3333-333333333302', 'products/drip-02/front.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', 'Carhartt Vintage Detroit Jacket Canvas Front', 0),
('33333333-3333-3333-3333-333333333302', 'products/drip-02/collar.jpg', 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80', 'Carhartt Corduroy Collar Close-up', 1),

-- Product 3
('33333333-3333-3333-3333-333333333303', 'products/drip-03/front.jpg', 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80', 'Stüssy Reversible Sherpa Fleece Front View', 0),
('33333333-3333-3333-3333-333333333303', 'products/drip-03/reverse.jpg', 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80', 'Stüssy Nylon Reverse View', 1),

-- Product 4
('33333333-3333-3333-3333-333333333304', 'products/drip-04/front.jpg', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80', 'Arc''teryx Beta LT Mountain Shell Front', 0),
('33333333-3333-3333-3333-333333333304', 'products/drip-04/hood.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', 'Arc''teryx Storm Hood Close-Up', 1),

-- Product 5
('33333333-3333-3333-3333-333333333305', 'products/drip-05/front.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', 'Diesel 90s Distressed Biker Leather Moto Front', 0),

-- Product 6
('33333333-3333-3333-3333-333333333306', 'products/drip-06/front.jpg', 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80', 'Ralph Lauren Wool Varsity Letterman Front', 0),

-- Product 7
('33333333-3333-3333-3333-333333333307', 'products/drip-07/front.jpg', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80', 'Stone Island Raso Gommato Parka Front View', 0),

-- Product 8
('33333333-3333-3333-3333-333333333308', 'products/drip-08/front.jpg', 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80', 'Patagonia Retro-X Sherpa Fleece Front', 0),

-- Product 9
('33333333-3333-3333-3333-333333333309', 'products/drip-09/front.jpg', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80', 'Levi''s Type III Washed Denim Trucker Front', 0),

-- Product 10
('33333333-3333-3333-3333-333333333310', 'products/drip-10/front.jpg', 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80', 'Starter 90s Bulls Satin Jacket Front', 0),

-- Product 11
('33333333-3333-3333-3333-333333333311', 'products/drip-11/front.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', 'Barbour Beaufort Waxed Field Jacket Front', 0),

-- Product 12
('33333333-3333-3333-3333-333333333312', 'products/drip-12/front.jpg', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80', 'Prada Sport Linea Rossa Technical Pullover Front', 0)
ON CONFLICT DO NOTHING;

-- 5. COUPONS
INSERT INTO public.coupons (code, type, value, minimum_order_value, starts_at, expires_at, usage_limit, usage_count, active) VALUES
('DRIP10', 'percentage', 10, 2000, NOW() - INTERVAL '1 day', NOW() + INTERVAL '1 year', 1000, 0, TRUE),
('ARCHIVE20', 'fixed', 2000, 5000, NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 months', 200, 0, TRUE),
('WELCOME5', 'percentage', 5, NULL, NOW() - INTERVAL '1 day', NOW() + INTERVAL '2 years', NULL, 0, TRUE)
ON CONFLICT (code) DO NOTHING;
