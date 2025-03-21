'use client';

import {
  CldImage,
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBody } from '../api/register/route';

type Props = { returnTo?: string | string[] };

type UploadResult =
  | CloudinaryUploadWidgetInfo
  | (string & {
      secure_url?: string;
      public_id?: string;
    });

export default function RegisterForm(props: Props) {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [country, setCountry] = useState('');
  const [offersPrinting, setOffersPrinting] = useState(false);

  const [result, setResult] = useState<UploadResult>();

  const [profileImage, setProfileImage] = useState<string>('');
  const [errors, setErrors] = useState<{ message: string }[]>();

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        firstName,
        lastName,
        email,
        password,
        address,
        city,
        zipCode,
        country,
        offersPrinting,
        profileImage,
      }),
    });
    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push(getSafeReturnToPath(props.returnTo) || '/register-success');
    router.refresh();
  }

  return (
    <form
      onSubmit={handleRegister}
      className="fieldset w-xl bg-base-200 border border-base-300 p-4 m-10 rounded-box justify-self-center"
    >
      <div>
        <h4 className="text-base/7 font-semibold text-gray-900">
          User Details
        </h4>
      </div>
      <label className="fieldset-label">
        Username
        <input
          className="input input-primary"
          value={userName}
          placeholder="your username"
          onChange={(event) => setUserName(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        First Name
        <input
          className="input input-primary"
          value={firstName}
          placeholder="your first name"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        Last Name
        <input
          className="input input-primary"
          value={lastName}
          placeholder="your last name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        Email
        <input
          className="input input-primary"
          value={email}
          placeholder="your email"
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        Password
        <input
          className="input input-primary"
          type="password"
          value={password}
          placeholder="create password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <h4 className="text-base/7 font-semibold text-gray-900">
        Address Details
      </h4>
      <label className="fieldset-label">
        Address
        <input
          className="input input-primary"
          value={address}
          placeholder="your address"
          onChange={(event) => setAddress(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        City
        <input
          className="input input-primary"
          value={city}
          placeholder="your city"
          onChange={(event) => setCity(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        Zip Code
        <input
          className="input input-primary"
          type="number"
          value={zipCode}
          onChange={(event) => setZipCode(Number(event.currentTarget.value))}
        />
      </label>
      <label className="fieldset-label">
        Country
        <input
          className="input input-primary"
          value={country}
          placeholder="your country"
          onChange={(event) => setCountry(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        I have a 3D Printer and want to offer Printing Services
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={offersPrinting}
          onChange={(event) => setOffersPrinting(event.currentTarget.checked)}
        />
      </label>
      <h4 className="text-base/7 font-semibold text-gray-900">
        Upload Profile Image
      </h4>
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(uploadResult) => {
          if (
            uploadResult.event === 'success' &&
            typeof uploadResult.info !== 'string'
          ) {
            const uploadInfo = uploadResult.info as CloudinaryUploadWidgetInfo;
            setResult(uploadInfo);
            if (uploadInfo.secure_url) {
              setProfileImage(uploadInfo.secure_url);
            }
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => open()}
          >
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
      {result ? (
        <div className="mt-8 justify-self-center">
          <CldImage
            src={profileImage}
            width={300}
            height={300}
            alt="Uploaded Image"
          />
        </div>
      ) : null}
      <button className="btn btn-neutral mt-4">Register</button>
      {errors?.map((error) => {
        return (
          <div key={`error-${error.message}-${Math.random()}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        );
      })}
    </form>
  );
}
