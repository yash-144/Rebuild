import { v2 as cloudinary } from 'cloudinary';

// Server-side initialization
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dkhi90k6e';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'rebuild_student_evidence';

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  return cloudinary;
}

export interface UploadResult {
  publicId: string;
  previewUrl: string;
  bytes: number;
  format: string;
  createdAt: string;
}

/**
 * Generate authenticated signed delivery URL
 */
export function generateSignedDeliveryUrl(publicId: string): string {
  const cld = configureCloudinary();
  return cld.url(publicId, {
    sign_url: true,
    type: 'authenticated',
    resource_type: 'image',
    secure: true,
  });
}

/**
 * Perform server-side authenticated upload using signed preset & credentials
 */
export async function uploadEvidenceBuffer(
  buffer: Buffer,
  filename: string
): Promise<UploadResult> {
  const cld = configureCloudinary();

  return new Promise((resolve, reject) => {
    const uploadStream = cld.uploader.upload_stream(
      {
        upload_preset: uploadPreset,
        folder: 'rebuild/evidence',
        type: 'authenticated',
        resource_type: 'image',
        context: {
          original_filename: filename,
          app: 'rebuild_prototype',
          purpose: 'student_practice_evidence',
        },
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Upload to Cloudinary failed.'));
        }

        const signedUrl = generateSignedDeliveryUrl(result.public_id);
        resolve({
          publicId: result.public_id,
          previewUrl: signedUrl,
          bytes: result.bytes,
          format: result.format,
          createdAt: result.created_at,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Securely delete an authenticated evidence asset
 */
export async function deleteEvidenceAsset(publicId: string): Promise<boolean> {
  const cld = configureCloudinary();
  const res = await cld.uploader.destroy(publicId, {
    type: 'authenticated',
    resource_type: 'image',
  });
  return res.result === 'ok';
}
