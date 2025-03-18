import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  type Model,
  modelSchema,
} from '../../../migrations/00002-createTableModels';

export type ModelResponseBodyPost =
  | {
      model: Model;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<ModelResponseBodyPost>> {
  // get body from client and parse it
  const requestBody = await request.json();

  // validate information from client
  const result = modelSchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain animal object',
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const newModel =
    sessionTokenCookie &&
    (await createModel(sessionTokenCookie.value, {
      firstName: result.data.firstName,
      type: result.data.type,
      accessory: result.data.accessory || null,
      birthDate: result.data.birthDate,
    }));

  if (!newModel) {
    return NextResponse.json(
      {
        error: 'Model not created or access denied for creating model',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ model: newModel });
}
