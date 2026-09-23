import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { apiSuccess, apiError } from '@/lib/utils/api-response';
import crypto from 'crypto';

interface RouteContext {
  params: {
    id: string; // product_id
  };
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id: productId } = params;

    // Verify product exists
    const { data: product, error: prodError } = await supabaseAdmin
      .from('products')
      .select('id, title')
      .eq('id', productId)
      .single();

    if (prodError || !product) {
      return apiError('Product not found', 404);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('alt_text') as string) || product.title;
    const sortOrder = parseInt((formData.get('sort_order') as string) || '0', 10);

    if (!file) {
      return apiError('No file provided in form-data ("file").', 400);
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return apiError(`Invalid image type (${file.type}). Allowed: JPEG, PNG, WebP.`, 400);
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      return apiError('File size exceeds maximum allowed limit of 5MB.', 400);
    }

    // Sanitize filename
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const fileExtension = sanitizedFilename.split('.').pop() || 'jpg';
    const uniqueId = crypto.randomUUID();
    const storagePath = `products/${productId}/${uniqueId}.${fileExtension}`;

    // Upload to Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabaseAdmin.storage
      .from('product-images')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return apiError(`Storage upload failed: ${uploadError.message}`, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(storagePath);

    // Save image metadata into product_images table
    const { data: imageRecord, error: dbError } = await supabaseAdmin
      .from('product_images')
      .insert({
        product_id: productId,
        storage_path: storagePath,
        public_url: publicUrl,
        alt_text: altText,
        sort_order: sortOrder,
      })
      .select('*')
      .single();

    if (dbError) {
      return apiError(`Failed to save image metadata: ${dbError.message}`, 500);
    }

    return apiSuccess(
      {
        message: 'Product image uploaded successfully.',
        image: imageRecord,
      },
      201
    );
  } catch (err: any) {
    return apiError(err.message || 'Unauthorized', err.statusCode || 401);
  }
}
