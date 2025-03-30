import { cookies } from 'next/headers';
import React, { type ReactNode } from 'react';
import { getUser } from '../../database/users';
import ProfileImage from './ProfileImage';

type Props = {
  children: ReactNode;
};

export default async function ProfileLayout({ children }: Props) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  return (
    <div>
      <h1 className="pageHeadline">User Admin Area</h1>
      <div className="grid grid-cols-[1fr_2fr] gap-6 px-6 py-4">
        <aside className="max-w-min bg-white self-start">
          <div className="avatar">
            <div className="w-22 rounded-full m-2 ml-10">
              <ProfileImage imageUrl={user?.profileImage} />
            </div>
          </div>
          <h2 className="font-semibold m-2 ml-10">
            Welcome back {user?.userName}!
          </h2>
          <ul className="menu bg-base-200 rounded-box w-56 m-4 ml-10 mb-10">
            <li>
              <a href={`/profile/${user?.userName}`}>My Account</a>
            </li>
            <li>
              <a href={`/profile/${user?.userName}/orders`}>My Orders</a>
            </li>
            <li>
              <a href={`/profile/${user?.userName}/wishlist`}>My Wishlist</a>
            </li>
            {user?.offersPrinting && (
              <div>
                <li>
                  <a href={`/profile/${user.userName}/models-upload`}>
                    Model Upload
                  </a>
                </li>
                <li>
                  <a href={`/profile/${user.userName}/models`}>My 3D Models</a>
                </li>
                <li>
                  <a href={`/profile/${user.userName}/print-jobs`}>
                    My Print Jobs
                  </a>
                </li>
              </div>
            )}
          </ul>
        </aside>
        <main className="pr-10">{children}</main>
      </div>
    </div>
  );
}
