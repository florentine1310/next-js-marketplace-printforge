import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
import {
  registerSchema,
  type User,
} from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

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

  // Create a session token

  const token = crypto.randomBytes(100).toString('base64');

  // Create the session record

  const session = await createSessionInsecure(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Session creation failed' }],
      },
      {
        status: 400,
      },
    );
  }

  // Send cookie to the header

  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json({ user: newUser });
}
