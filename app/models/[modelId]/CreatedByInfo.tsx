import React from 'react';
import { getUserInfoByIdInsecure } from '../../../database/users';

type Props = {
  userId: number;
};

export default async function CreatedByInfo({ userId }: Props) {
  const userInfo = await getUserInfoByIdInsecure(userId);

  return (
    <div className="flex p-2 mt-4 mb-4">
      <p className="content-center text-xs">created by:</p>
      <div>
        <div className="avatar">
          <div className="w-8 rounded-full m-2">
            <img
              src={
                userInfo?.profileImage
                  ? userInfo.profileImage
                  : '/images/profile-placeholder.png'
              }
            />
          </div>
        </div>
        <strong>{userInfo?.userName}</strong>
      </div>
    </div>
  );
}
