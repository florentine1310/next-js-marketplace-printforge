'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBody } from '../api/register/route';

export default function RegisterForm() {
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
      }),
    });
    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push('/register-success');
  }

  return (
    <form onSubmit={handleRegister}>
      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">
          User Details
        </h2>
      </div>
      <label>
        Username
        <input
          className="input input-primary"
          value={userName}
          placeholder="your username"
          onChange={(event) => setUserName(event.currentTarget.value)}
        />
      </label>
      <label>
        First Name
        <input
          className="input input-primary"
          value={firstName}
          placeholder="your first name"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last Name
        <input
          className="input input-primary"
          value={lastName}
          placeholder="your last name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <label>
        Email
        <input
          className="input input-primary"
          value={email}
          placeholder="your email"
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          className="input input-primary"
          type="password"
          value={password}
          placeholder="create password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        Address
        <input
          className="input input-primary"
          value={address}
          placeholder="your address"
          onChange={(event) => setAddress(event.currentTarget.value)}
        />
      </label>
      <label>
        City
        <input
          className="input input-primary"
          value={city}
          placeholder="your city"
          onChange={(event) => setCity(event.currentTarget.value)}
        />
      </label>
      <label>
        Zip Code
        <input
          className="input input-primary"
          type="number"
          value={zipCode}
          onChange={(event) => setZipCode(Number(event.currentTarget.value))}
        />
      </label>
      <label>
        Country
        <input
          className="input input-primary"
          value={country}
          placeholder="your country"
          onChange={(event) => setCountry(event.currentTarget.value)}
        />
      </label>
      <label>
        I have a 3D Printer and want to offer Printing Services
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={offersPrinting}
          onChange={(event) => setOffersPrinting(event.currentTarget.checked)}
        />
      </label>
      <button className="btn btn-primary">Register</button>
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
