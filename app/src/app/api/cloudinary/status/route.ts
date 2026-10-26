import { NextResponse } from 'next/server';
import { isCloudinaryConfigured } from '@/lib/cloudinaryServer';

export async function GET() {
  const configured = isCloudinaryConfigured();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dkhi90k6e';
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'rebuild_student_evidence';

  return NextResponse.json({
    configured,
    cloudName,
    uploadPreset,
    deliveryType: 'authenticated',
    folder: 'rebuild/evidence',
    instructions: configured
      ? 'Cloudinary server credentials detected. Signed upload is ready.'
      : 'Cloudinary API credentials missing in .env.local. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to enable live authenticated uploads.',
  });
}
