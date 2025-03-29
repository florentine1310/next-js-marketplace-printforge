import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { getModelInsecure } from '../../../../database/models';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser } from '../../../../database/users';
import { getWishlistItemsInsecure } from '../../../../database/wishlist';
import ModelDetailsButton from '../../../components/ModelDetailsButton';
import AddToCartButton from './AddToCartButton';
import DeleteFromWishlistButton from './DeleteFromWishlistButton';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function WishlistPage(props: Props) {
  const { username } = await props.params;

  // get the session token from the cookie
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // if the session token is invalid or doesn't exist redirect user to login page

  // if the session cookie is valid redirect to homepage
  if (!session) {
    redirect(`/login?returnTo=profile/${username}`);
  }

  const user = await getUser(sessionTokenCookie.value);

  if (!user) {
    notFound();
  }

  const wishlistItems = await getWishlistItemsInsecure(user.id);
  const wishlistModels = await Promise.all(
    wishlistItems.map(async (wishlistItem) => {
      const [model] = await getModelInsecure(Number(wishlistItem.modelId));

      return { model, wishlistItem: wishlistItem };
    }),
  );

  return (
    <section>
      <h3>My Wishlist</h3>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {wishlistModels.map(({ model, wishlistItem }) => {
          return (
            <li key={`wishlist-${wishlistItem.id}`} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={
                    wishlistItem.modelImageUrl ??
                    'https://placehold.co/400x400?text=No+Image+Available&font=roboto'
                  }
                  alt="model"
                />
              </div>
              <div>
                <div>{wishlistItem.modelName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {wishlistItem.modelCategory}
                </div>
              </div>
              <div className="content-center text-xs uppercase font-semibold opacity-60">
                Print price: {wishlistItem.modelPrintPrice}
              </div>
              <Link href={`/models/${wishlistItem.modelId}`}>
                <ModelDetailsButton />
              </Link>
              {model && <AddToCartButton selectedModel={model} />}
              <DeleteFromWishlistButton
                modelId={wishlistItem.modelId}
                userId={user.id}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
