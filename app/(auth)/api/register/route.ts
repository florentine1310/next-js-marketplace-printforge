import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
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

export async function POST(
  request: Request,
): Promise<NextResponse<RegisterResponseBody>> {
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
  const user = await getUserInsecure(result.data.userName);

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

  // Save user information with password hash in database
  const newUser = await createUserInsecure(result.data, passwordHash);

  if (!newUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'Error when trying to create new user' }],
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ user: newUser });
}
