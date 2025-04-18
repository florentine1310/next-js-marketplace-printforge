import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { ZodIssue } from 'zod';
import { updateUser } from '../../../../database/users';
import {
  type User,
  userEditSchema,
} from '../../../../migrations/00000-createTableUsers';

export type UserResponseBodyPut =
  | {
      user: Omit<User, 'profileImage'>;
    }
  | {
      error: string;
      errorIssues?: ZodIssue[];
    };

type UserParams = {
  params: Promise<{
    userId: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: UserParams,
): Promise<NextResponse<UserResponseBodyPut>> {
  const requestBody = await request.json();

  const result = userEditSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain valid user object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const updatedUser =
    sessionTokenCookie &&
    (await updateUser(sessionTokenCookie.value, {
      id: Number((await params).userId),
      userName: result.data.userName,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      address: result.data.address,
      zipCode: result.data.zipCode,
      city: result.data.city,
      country: result.data.country,
      offersPrinting: result.data.offersPrinting,
    }));

  if (!updatedUser) {
    return NextResponse.json(
      {
        error: 'User could not be updated or access denied',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ user: updatedUser });
}
