import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React, { type ReactNode } from 'react';
import { getUser } from '../../database/users';
import ProfileImage from './ProfileImage';
import SideBarMenu from './SideBarMenu';

type Props = {
  children: ReactNode;
};

export default async function ProfileLayout({ children }: Props) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="pageHeadline">User Admin Area</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-30 px-6 py-4">
        <aside className=" bg-white self-start">
          <div className="avatar">
            <div className="w-22 rounded-full m-2 ml-10">
              <ProfileImage imageUrl={user.profileImage} />
            </div>
          </div>
          <h2 className="font-semibold m-2 ml-10">
            Welcome back {user.userName}!
          </h2>
          <SideBarMenu user={user} />
        </aside>
        <main className="pr-10 mb-10">{children}</main>
      </div>
    </div>
  );
}
