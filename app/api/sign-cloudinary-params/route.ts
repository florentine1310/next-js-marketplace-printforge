import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

interface RequestBody {
  paramsToSign: Record<string, string>;
}

export type RootResponseBodyPost =
  | {
      signature: string;
    }
  | {
      error: string;
    };

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(
  request: Request,
): Promise<NextResponse<RootResponseBodyPost>> {
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: 'API secret not set' }, { status: 500 });
  }

  const body: RequestBody | undefined = await request.json();

  if (!body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  );

  return NextResponse.json({ signature });
}
