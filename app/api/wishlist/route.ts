import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  createWishlistEntry,
  deleteWishlistItem,
} from '../../../database/wishlist';
import {
  type WishlistEntry,
  wishlistEntrySchema,
} from '../../../migrations/00005-createTableWishlist';

export type WishlistEntryResponseBody =
  | {
      wishlistEntry: Omit<WishlistEntry, 'id'>;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export type WishlistEntryResponseBodyPost =
  | {
      wishlistEntry: WishlistEntry;
    }
  | {
      error: string;
    };

export type WishlistEntryResponseBodyDelete =
  | {
      deletedWishlistEntry: WishlistEntry;
    }
  | {
      error: string;
    };

// Add to Wishlist Entry Endpoint

export async function POST(
  request: Request,
): Promise<NextResponse<WishlistEntryResponseBodyPost>> {
  // get body from client and parse it
  const requestBody = await request.json();

  // validate information from client
  const result = wishlistEntrySchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain wishlist object',
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const newWishlistEntry =
    sessionTokenCookie &&
    (await createWishlistEntry(sessionTokenCookie.value, {
      userId: result.data.userId,
      modelId: result.data.modelId,
    }));

  if (!newWishlistEntry) {
    return NextResponse.json(
      {
        error: 'Wishlist entry not created or access denied for creating model',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ wishlistEntry: newWishlistEntry });
}

// Delete from wishlist endpoint

export async function DELETE(
  request: Request,
): Promise<NextResponse<WishlistEntryResponseBodyDelete>> {
  // get body from client and parse it
  const requestBody = await request.json();

  // validate information from client
  const result = wishlistEntrySchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain wishlist object',
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const wishlistEntry =
    sessionTokenCookie &&
    (await deleteWishlistItem(
      sessionTokenCookie.value,
      result.data.modelId,
      result.data.userId,
    ));

  if (!wishlistEntry) {
    return NextResponse.json(
      {
        error: 'Wishlist entry not deleted or access denied for creating model',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ deletedWishlistEntry: wishlistEntry });
}
