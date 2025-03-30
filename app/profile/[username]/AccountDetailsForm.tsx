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
    <div>
      <div className="flex">
        <h3>My User Account Details</h3>

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
        <label className="fieldset-label">
          Email
          <input
            className="input"
            value={email}
            disabled={!isEditing}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          First Name
          <input
            className="input"
            value={firstName}
            disabled={!isEditing}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          Last Name
          <input
            className="input"
            value={lastName}
            disabled={!isEditing}
            onChange={(event) => setLastName(event.currentTarget.value)}
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
        <label className="fieldset-label">
          Address
          <input
            className="input"
            value={address}
            disabled={!isEditing}
            onChange={(event) => setAddress(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          City
          <input
            className="input"
            value={city}
            disabled={!isEditing}
            onChange={(event) => setCity(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          Zip Code
          <input
            className="input"
            type="number"
            value={zipCode}
            disabled={!isEditing}
            onChange={(event) => setZipCode(Number(event.currentTarget.value))}
          />
        </label>
        <label className="fieldset-label">
          Country
          <input
            className="input"
            value={country}
            disabled={!isEditing}
            onChange={(event) => setCountry(event.currentTarget.value)}
          />
        </label>
        {isEditing && (
          <button className="btn btn-neutral mt-4 w-full">Save Changes</button>
        )}
        {errors?.map((error) => {
          return (
            <div key={`error-${error.message}-${Math.random()}`}>
              <ErrorMessage>{error.message}</ErrorMessage>
            </div>
          );
        })}
      </form>
    </div>
  );
}
