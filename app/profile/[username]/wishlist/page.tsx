import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser } from '../../../../database/users';
import { getWishlistItemsInsecure } from '../../../../database/wishlist';
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

  return (
    <section>
      <h3>My Wishlist</h3>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {wishlistItems.map((wishlistItem) => {
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
              <button className="btn btn-secondary">Model Details</button>
              <button className="btn btn-primary">
                <Image
                  src="/icons/printer-white.svg"
                  alt="printer"
                  width={25}
                  height={25}
                  className="cursor-pointer mr-1"
                />
                Get It Printed
              </button>
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
