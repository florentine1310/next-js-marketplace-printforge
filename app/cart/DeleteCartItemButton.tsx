'use client';

import Image from 'next/image';
import { deleteCookie } from './actions';

type Props = {
  itemId: number;
};

export default function DeleteCartItemButton({ itemId }: Props) {
  return (
    <div>
      <button
        className="btn btn-square btn-ghost"
        onClick={() => deleteCookie({ itemId })}
      >
        <Image src="/icons/trash-2.svg" width={25} height={25} alt="delete" />
      </button>
    </div>
  );
}
