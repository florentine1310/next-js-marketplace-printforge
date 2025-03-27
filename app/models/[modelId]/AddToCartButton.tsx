'use client';

import Image from 'next/image';
import React from 'react';
import type { Model } from '../../../migrations/00002-createTableModels';
import reduceCookieValue from '../../../util/reduceCookieValue';
import { createCookie } from './actions';

type Props = {
  selectedModel: Model;
};

export default function AddToCartButton({ selectedModel }: Props) {
  const quantity = 1;
  const cookieValue = reduceCookieValue(selectedModel, quantity);

  console.log('selectedModel', selectedModel);

  return (
    <div>
      <form>
        <button
          formAction={() => createCookie(cookieValue)}
          className="btn btn-primary ml-5"
        >
          <Image
            src="/icons/printer-white.svg"
            alt="printer"
            width={25}
            height={25}
            className="cursor-pointer mr-1"
          />
          Get It Printed
        </button>
      </form>
    </div>
  );
}
