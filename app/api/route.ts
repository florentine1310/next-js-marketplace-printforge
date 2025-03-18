import { NextResponse } from 'next/server';

export type RootResponseBodyGet =
  | {
      message: string;
    }
  | {
      error: string;
    };
export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ message: 'Hello World' });
}
