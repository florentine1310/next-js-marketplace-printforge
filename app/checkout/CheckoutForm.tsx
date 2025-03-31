'use client';

import { useState, useTransition } from 'react';
import type { CheckoutResponseBody } from '../api/checkout/route';

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
    orderTotal: orderTotal.toFixed(2),
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

    const data: CheckoutResponseBody = await response.json();

    if ('url' in data) {
      window.location.href = data.url;
    } else {
      console.error('Checkout error:', data.error);
    }
  }

  return (
    <div>
      <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box m-10">
        <legend className="fieldset-legend">Ship To</legend>
        <label className="fieldset-label" htmlFor="address">
          Address{' '}
        </label>
        <input
          id="address"
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
          className="input"
          value={shippingCountry}
          onChange={(event) => setShippingCountry(event.currentTarget.value)}
          required
        />
        <p className="mt-3">
          By proceeding to the checkout I agree to the{' '}
          <a className="link link-accent">
            <strong>Terms and Conditions</strong>
          </a>
          .
        </p>

        <button
          type="button"
          className="btn btn-primary mt-4 w-xs"
          onClick={() => startTransition(() => handleCheckout())}
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Go to Checkout'}
        </button>
      </fieldset>
    </div>
  );
}
