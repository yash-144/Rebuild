import { NextRequest, NextResponse } from 'next/server';
import { isCloudinaryConfigured, deleteEvidenceAsset } from '@/lib/cloudinaryServer';

export async function POST(req: NextRequest) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: 'Cloudinary server credentials are not configured.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { publicId } = body;

    if (!publicId || typeof publicId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid publicId.' },
        { status: 400 }
      );
    }

    const success = await deleteEvidenceAsset(publicId);

    return NextResponse.json({
      success,
      message: success
        ? 'Asset removed from Cloudinary authenticated storage.'
        : 'Cloudinary reported asset not found or already deleted.',
    });
  } catch (err: any) {
    console.error('Cloudinary deletion error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to delete asset from Cloudinary.' },
      { status: 500 }
    );
  }
}
