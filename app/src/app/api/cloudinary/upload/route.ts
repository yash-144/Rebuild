import { NextRequest, NextResponse } from 'next/server';
import { isCloudinaryConfigured, uploadEvidenceBuffer } from '@/lib/cloudinaryServer';

export async function POST(req: NextRequest) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error: 'Cloudinary server credentials (CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not set in .env.local.',
          configured: false,
        },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided in upload request.' },
        { status: 400 }
      );
    }

    // Limit file size (max 8MB for student photo evidence)
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image file exceeds maximum 8MB limit.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadEvidenceBuffer(buffer, file.name);

    return NextResponse.json({
      success: true,
      publicId: result.publicId,
      previewUrl: result.previewUrl,
      filename: file.name,
      bytes: result.bytes,
      source: 'cloudinary',
      uploadedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Cloudinary upload error:', err);
    return NextResponse.json(
      {
        error: err?.message || 'Failed to securely upload asset to Cloudinary.',
      },
      { status: 500 }
    );
  }
}
