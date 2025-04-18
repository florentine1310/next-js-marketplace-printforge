'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { WishlistEntryResponseBody } from '../../../api/wishlist/route';
import ErrorMessage from '../../../ErrorMessage';

type Props = {
  modelId: number;
};

export default function DeleteModelButton({ modelId }: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>();
  const router = useRouter();

  async function handleDeleteModel() {
    const response = await fetch(`/api/models/`, {
      method: 'DELETE',
      body: JSON.stringify({
        modelId,
      }),
    });
    const data: WishlistEntryResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <button className="btn btn-square btn-ghost" onClick={handleDeleteModel}>
        <Image src="/icons/trash-2.svg" width={25} height={25} alt="delete" />
      </button>

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
