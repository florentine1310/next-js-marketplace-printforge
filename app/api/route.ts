import { NextResponse } from 'next/server';

export type RootResponseBodyGet = {
  message: string;
};

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(
  request: Request,
): Promise<NextResponse<RootResponseBodyGet>> {
  const requestBody = await request.json();
  console.log('POST request', requestBody);
  return NextResponse.json();
}
