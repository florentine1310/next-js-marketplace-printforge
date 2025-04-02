'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { WishlistEntryResponseBody } from '../../api/wishlist/route';
import ErrorMessage from '../../ErrorMessage';

type Props = {
  modelId: number;
  userId: number;
  initialIsWishlisted: boolean;
};

export default function AddToWishlistButton({
  modelId,
  userId,
  initialIsWishlisted,
}: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>();
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const router = useRouter();

  async function handleAddToWishlist() {
    const response = await fetch(`/api/wishlist/`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        modelId,
      }),
    });
    const data: WishlistEntryResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    setIsWishlisted(true);
  }

  async function handleDeleteFromWishlist() {
    const response = await fetch(`/api/wishlist/`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId,
        modelId,
      }),
    });
    const data: WishlistEntryResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    setIsWishlisted(false);
    router.refresh();
  }

  return (
    <div className="flex gap-2 p-2 mb-2 mt-2">
      {isWishlisted ? (
        <Image
          src="/icons/heart-filled.svg"
          alt="heart"
          width={25}
          height={25}
          onClick={handleDeleteFromWishlist}
          className="cursor-pointer"
        />
      ) : (
        <Image
          src="/icons/heart.svg"
          alt="heart"
          width={25}
          height={25}
          onClick={handleAddToWishlist}
          className="cursor-pointer"
        />
      )}

      <p>Add to Wishlist</p>
      {errors?.map((error) => {
        return (
          <div key={`error-${error.message}-${Math.random()}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        );
      })}
    </div>
  );
}
