'use client';

import React, { useState, useTransition } from 'react';

type CartItem = {
  id: number;
  name: string;
  printPrice: number;
  imageUrl: string | null;
  quantity: number;
};

type Props = {
  userId: number;
  cartItems: CartItem[];
  orderTotal: number;
};

export default function CheckoutForm({ userId, cartItems, orderTotal }: Props) {
  const [isPending, startTransition] = useTransition();

  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingZipCode, setShippingZipCode] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');

  const order = {
    userId,
    shippingAddress,
    shippingZipCode,
    shippingCity,
    shippingCountry,
    orderTotal,
    cartItems,
  };

  async function handleCheckout() {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error('Checkout error:', data.error);
    }
  }

  return (
    <div>
      <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box m-10">
        <label className="fieldset-label" htmlFor="address">
          Address{' '}
        </label>
        <input
          id="address"
          type="text"
          className="input"
          value={shippingAddress}
          onChange={(event) => setShippingAddress(event.currentTarget.value)}
          required
        />

        <label className="fieldset-label" htmlFor="zip-code">
          Zip Code
        </label>
        <input
          id="zip-code"
          type="text"
          className="input"
          value={shippingZipCode}
          onChange={(event) => setShippingZipCode(event.currentTarget.value)}
          required
        />

        <label className="fieldset-label" htmlFor="city">
          City{' '}
        </label>
        <input
          id="city"
          type="text"
          className="input"
          value={shippingCity}
          onChange={(event) => setShippingCity(event.currentTarget.value)}
          required
        />

        <label className="fieldset-label" htmlFor="country">
          Country
        </label>
        <input
          id="country"
          type="text"
          className="input"
          value={shippingCountry}
          onChange={(event) => setShippingCountry(event.currentTarget.value)}
          required
        />

        <button
          type="button"
          className="btn btn-neutral mt-4 w-xs"
          onClick={() => startTransition(() => handleCheckout())}
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Go to Checkout'}
        </button>
      </fieldset>
    </div>
  );
}
