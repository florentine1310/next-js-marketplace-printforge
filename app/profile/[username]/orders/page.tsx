import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getOrdersBySessionToken } from '../../../../database/orders';
import { getValidSessionToken } from '../../../../database/sessions';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function OrdersPage(props: Props) {
  const { username } = await props.params;

  // get the session token from the cookie
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // if the session token is invalid or doesn't exist redirect user to login page

  if (!session) {
    redirect(`/login?returnTo=profile/${username}`);
  }

  const orders = await getOrdersBySessionToken(sessionTokenCookie.value);

  return (
    <div>
      <h3>My Orders</h3>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Total</th>
              <th>Order Date</th>
              <th>Shipping Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={`order-id-${order.id}`}>
                <th>Order #{order.id}</th>
                <td>{order.orderTotal} EUR</td>
                <td>{order.createdAt.toLocaleDateString()}</td>
                <td>
                  <div>
                    {order.shippingAddress}
                    <br />
                    {order.shippingZipCode}
                    <br />
                    {order.shippingCity}
                    <br />
                    {order.shippingCountry}
                    <br />
                  </div>
                </td>
                <td>
                  <button className="btn btn-soft btn-info">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
