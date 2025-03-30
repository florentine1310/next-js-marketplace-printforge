import { cookies } from 'next/headers';
import React from 'react';
import { getUser } from '../../database/users';

export default async function ThankYouPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  return (
    <div>
      <h1 className="pageHeadline">Order Successful</h1>
      <h3>Thank you for your order with LayerForge! 🚀</h3>
      <p className="text-center">
        Your order has been placed successfully. You will receive an email
        confirmation shortly.
        <br />
        All order details can be found under{' '}
        <a className="link link-accent" href={`/profile/${user?.userName}`}>
          My Orders
        </a>{' '}
        in your User Profile.
      </p>
    </div>
  );
}
