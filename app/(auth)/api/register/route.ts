import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { getUserInsecure } from '../../../../database/users';
import {
  registerSchema,
  type User,
} from '../../../../migrations/00000-createTableUsers';

export type RegisterResponseBody =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(request: Request): Promise<NextResponse<any>> {
  // get user data from the request
  const requestBody = await request.json();

  // validate user data with zod
  const result = registerSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // check if user already exists in database

  const user = await getUserInsecure(result.data.username);

  if (user) {
    return NextResponse.json(
      {
        errors: [{ message: 'Username already exists' }],
      },
      {
        status: 400,
      },
    );
  }

  // Hash plain password from user

  const passwordHash = await bcrypt.hash(result.data.password, 12);

  console.log('passwordHash:', passwordHash);

  return NextResponse.json({ user: 'new user' });
}
