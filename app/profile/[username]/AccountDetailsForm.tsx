'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { User } from '../../../migrations/00000-createTableUsers';
import type { UserResponseBodyPut } from '../../api/users/[userId]/route';
import ErrorMessage from '../../ErrorMessage';

export default function AccountDetailsForm({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const userName = user.userName;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [country, setCountry] = useState(user.country);
  const [offersPrinting, setOffersPrinting] = useState(user.offersPrinting);

  const [errors, setErrors] = useState<{ message: string }[]>();

  async function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userName,
        firstName,
        lastName,
        email,
        address,
        city,
        zipCode,
        country,
        offersPrinting,
      }),
    });
    const data: UserResponseBodyPut = await response.json();

    if ('errorIssues' in data && Array.isArray(data.errorIssues)) {
      const zodIssues = data.errorIssues.map((issue) => ({
        message: issue.message,
      }));
      setErrors(zodIssues);
      return;
    }

    if ('error' in data) {
      setErrors([{ message: data.error }]);
      return;
    }
    setIsEditing(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col justify-center items-center pr-20">
      <div className="flex">
        <h3>Account Details</h3>

        <Image
          src="/icons/edit-3.svg"
          alt="user"
          width={25}
          height={25}
          onClick={() => setIsEditing(!isEditing)}
          className="cursor-pointer"
        />
      </div>
      <form onSubmit={handleEdit}>
        <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
          <label className="fieldset-label" htmlFor="email">
            Email{' '}
          </label>
          <input
            id="email"
            className="input"
            value={email}
            disabled={!isEditing}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="first-name">
            First Name
          </label>
          <input
            id="first-name"
            className="input"
            value={firstName}
            disabled={!isEditing}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="last-name">
            Last Name
          </label>
          <input
            id="last-name"
            className="input"
            value={lastName}
            disabled={!isEditing}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            className="input"
            value={address}
            disabled={!isEditing}
            onChange={(event) => setAddress(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="city">
            City
          </label>
          <input
            id="city"
            className="input"
            value={city}
            disabled={!isEditing}
            onChange={(event) => setCity(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="zip-code">
            Zip Code{' '}
          </label>
          <input
            id="zip-code"
            className="input"
            type="number"
            value={zipCode}
            disabled={!isEditing}
            onChange={(event) => setZipCode(Number(event.currentTarget.value))}
          />

          <label className="fieldset-label" htmlFor="country">
            Country{' '}
          </label>
          <input
            id="country"
            className="input"
            value={country}
            disabled={!isEditing}
            onChange={(event) => setCountry(event.currentTarget.value)}
          />
          <input
            id="offer-printing"
            type="checkbox"
            className="toggle toggle-primary mt-4"
            checked={offersPrinting}
            onChange={(event) => setOffersPrinting(event.currentTarget.checked)}
          />
          <label className="fieldset-label mb-4" htmlFor="offer-printing">
            I have a 3D Printer and want to offer Printing Services
          </label>

          {isEditing && (
            <button className="btn btn-neutral mt-4 w-xs">Save Changes</button>
          )}
          {errors?.map((error) => {
            return (
              <div key={`error-${error.message}-${Math.random()}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            );
          })}
        </fieldset>
      </form>
    </div>
  );
}
