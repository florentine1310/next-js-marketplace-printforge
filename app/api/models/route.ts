import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createModel } from '../../../database/models';
import {
  type Model,
  modelSchema,
} from '../../../migrations/00002-createTableModels';

export type ModelUploadResponseBody =
  | {
      model: Omit<Model, 'id'>;
    }
  | {
      errors: {
        message: string;
      }[];
    };

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
      userId: result.data.userId,
      category: result.data.category,
      name: result.data.name,
      description: result.data.description,
      stlUrl: result.data.stlUrl,
      imageUrl: result.data.imageUrl,
      printPrice: result.data.printPrice,
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
