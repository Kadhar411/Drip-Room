-- ==============================================================================
-- 003_storage_policies.sql: Supabase Storage Configuration for Drip Room
-- ==============================================================================

-- 1. Insert product-images bucket if not already existing
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  TRUE,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = TRUE,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']::text[];

-- 2. Storage Policies for product-images bucket

-- Allow public read of product images
CREATE POLICY "Public Read Product Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Only admins can upload files into product-images
CREATE POLICY "Admin Upload Product Images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- Only admins can update product images
CREATE POLICY "Admin Update Product Images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- Only admins can delete product images
CREATE POLICY "Admin Delete Product Images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
