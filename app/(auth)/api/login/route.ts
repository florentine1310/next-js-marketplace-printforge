import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  loginSchema,
  type User,
} from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type LoginResponseBody =
  | {
      user: { userName: User['userName'] };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  // get user data from the request
  const requestBody = await request.json();

  // validate user data with zod
  const result = loginSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // verify user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.email,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        errors: [{ message: 'Email or password is invalid' }],
      },
      {
        status: 400,
      },
    );
  }

  // Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        errors: [{ message: 'Username or Password is invalid' }],
      },
      {
        status: 400,
      },
    );
  }
  // At this stage the user is validated
  // Create a session token

  const token = crypto.randomBytes(100).toString('base64');

  // Create the session record

  const session = await createSessionInsecure(token, userWithPasswordHash.id);

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

  return NextResponse.json({
    user: {
      userName: userWithPasswordHash.userName,
    },
  });
}
