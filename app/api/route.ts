import { NextResponse } from 'next/server';

export type RootResponseBodyGet = {
  message: string;
};

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
  return NextResponse.json();
}
