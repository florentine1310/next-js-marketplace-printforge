'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type NavigationButtonProps = {
  userName?: string;
};

export default function NavigationButtons({ userName }: NavigationButtonProps) {
  const router = useRouter();

  function handleGoToAccount() {
    router.push(`/profile/${userName}`);
  }

  function handleGoToModels() {
    router.push(`/models`);
  }

  return (
    <div className="flex justify-center space-x-12 my-5">
      <button className="btn btn-secondary" onClick={handleGoToAccount}>
        Go To My Account
      </button>

      <button className="btn btn-secondary" onClick={handleGoToModels}>
        See All 3D Models
      </button>
    </div>
  );
}
