import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createModel, deleteModelById } from '../../../database/models';
import {
  type Model,
  modelDeleteSchema,
  modelUploadSchema,
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

export type ModelResponseBodyDelete =
  | {
      deletedModel: Model;
    }
  | {
      error: string;
    };

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Model API

export async function POST(
  request: Request,
): Promise<NextResponse<ModelResponseBodyPost>> {
  // get body from client and parse it
  const formData = await request.formData();
  const file = formData.get('stlFile') as File;
  const modelData = {
    userId: Number(formData.get('userId')),
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    printPrice: formData.get('printPrice') as string,
  };

  if (!file.name) {
    return NextResponse.json({ error: 'Please select a file' });
  }
  if (file.size > 1024 * 1024 * 5) {
    return NextResponse.json({ error: 'File is too large' });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const response = await new Promise<CloudinaryResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'raw',
            public_id: file.name.replace(/\.[^/.]+$/, ''),
            use_filename: true,
            unique_filename: false,
            filename_override: file.name,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  if (!response) {
    return NextResponse.json({ error: 'File upload failed' });
  }

  const stlFileUrl = response.secure_url;

  // validate information from client
  const result = modelUploadSchema.safeParse(modelData);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain model object',
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const newModel =
    sessionTokenCookie &&
    (await createModel(sessionTokenCookie.value, {
      userId: result.data.userId,
      name: result.data.name,
      category: result.data.category,
      description: result.data.description,
      stlUrl: stlFileUrl,
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

// Delete Model by ID API

export async function DELETE(
  request: Request,
): Promise<NextResponse<ModelResponseBodyDelete>> {
  // get body from client and parse it
  const requestBody = await request.json();

  // validate information from client
  const result = modelDeleteSchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain model id',
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const modelToDelete =
    sessionTokenCookie &&
    (await deleteModelById(sessionTokenCookie.value, result.data.modelId));

  if (!modelToDelete) {
    return NextResponse.json(
      {
        error: 'Model not deleted or access denied for deleting model',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ deletedModel: modelToDelete });
}
