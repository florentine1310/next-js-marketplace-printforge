import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  loginSchema,
  type User,
} from '../../../../migrations/00000-createTableUsers';

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

  return NextResponse.json({
    user: {
      userName: userWithPasswordHash.userName,
    },
  });
}
