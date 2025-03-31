import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getOrdersByCreatorId } from '../../../../database/orders';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser } from '../../../../database/users';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function PrintJobPage(props: Props) {
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

  const user = await getUser(sessionTokenCookie.value);
  if (!user) redirect(`/login?returnTo=profile/${username}/my-print-jobs`);

  const printJobs = await getOrdersByCreatorId(user.id);
  console.log('printJobs', printJobs);

  return (
    <div>
      <h3>My Print Jobs</h3>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th></th>
              <th>Ordered 3D Model</th>
              <th>Quantity</th>
              <th>Ordered On</th>
              <th>Ship To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {printJobs.map((printJob) => (
              <tr key={`orderId-${printJob.orderItemId}`}>
                <th>Order #{printJob.orderId}</th>
                <td>
                  <img
                    className="size-10 rounded-box"
                    src={
                      printJob.modelImageUrl ??
                      'https://placehold.co/400x400?text=No+Image+Available&font=roboto'
                    }
                    alt="model"
                  />
                </td>
                <td>
                  <strong>{printJob.modelName}</strong>
                </td>
                <td>{printJob.quantity} piece(s)</td>
                <td>{printJob.orderCreatedAt.toLocaleDateString()}</td>
                <td>
                  {printJob.shippingAddress}
                  <br />
                  {printJob.shippingZipCode}
                  <br />
                  {printJob.shippingCity}
                  <br />
                  {printJob.shippingCountry}
                </td>
                <td>
                  <button className="btn btn-soft btn-info">
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
