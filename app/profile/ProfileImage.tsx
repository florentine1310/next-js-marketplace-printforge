'use client';

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

type ProfileImageProps = {
  imageUrl?: string | null;
};

export default function ProfileImage({ imageUrl }: ProfileImageProps) {
  if (!imageUrl) {
    return (
      <Image
        width="800"
        height="800"
        src="/images/profile-placeholder.png"
        alt="profile"
      />
    );
  }
  return <CldImage width="800" height="800" src={imageUrl} alt="profile" />;
}
