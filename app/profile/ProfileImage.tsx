'use client';

import { CldImage } from 'next-cloudinary';
import React from 'react';

export default function ProfileImage() {
  return (
    <CldImage width="600" height="600" src="cld-sample" alt="<Alt Text>" />
  );
}
