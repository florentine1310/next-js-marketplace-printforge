import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { getModelInsecure } from '../../../database/models';

type Props = {
  params: Promise<{
    modelId: string;
  }>;
};

export default async function ModelDetailsPage(props: Props) {
  const [singleModel] = await getModelInsecure(
    Number((await props.params).modelId),
  );

  console.log('singleModel', singleModel);

  if (!singleModel) notFound();

  return (
    <div>
      <div className="grid grid-cols-2 m-15">
        <Image
          src={
            singleModel.imageUrl ??
            'https://placehold.co/400x400?text=No+Image+Available&font=roboto'
          }
          alt={singleModel.name}
          width={400}
          height={400}
          className="rounded-xl"
        />
        <div className="gap-1">
          <div className="flex">
            <h1>{singleModel.name}</h1>
            <div className="flex gap-2 p-2 ml-auto mr-3">
              <Image
                src="/icons/thumbs-up.svg"
                alt="thumbs up"
                width={25}
                height={25}
                className="cursor-pointer"
              />
              <p>Leave a Like</p>
            </div>
          </div>
          <p className="p-2 mt-4 mb-4">created by: {singleModel.userId}</p>

          <p className="p-2 mt-4 mb-4">{singleModel.description}</p>
          <div className="p-2 font-semibold">
            Print Price: {singleModel.printPrice}
          </div>
          <div className="flex gap-2 p-2 mb-2 mt-2">
            <Image
              src="/icons/heart.svg"
              alt="heart"
              width={25}
              height={25}
              className="cursor-pointer"
            />
            <p>Add to Wishlist</p>
          </div>
          <button className="btn btn-primary">
            <Image
              src="/icons/download-white.svg"
              alt="download"
              width={25}
              height={25}
              className="cursor-pointer mr-1"
            />
            Download File
          </button>
          <button className="btn btn-primary">
            <Image
              src="/icons/printer-white.svg"
              alt="printer"
              width={25}
              height={25}
              className="cursor-pointer mr-1"
            />
            Get It Printed
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-20 bg-gray-300">
        <div className="flex flex-col ml-15 mb-15">
          <h4>3D Model Description:</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="flex flex-col mr-15 mb-15">
          <h4>Technical Details:</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
