'use client';

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
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <label>
        Username
        <input
          className="input input-primary"
          value={userName}
          onChange={(event) => setUserName(event.currentTarget.value)}
        />
      </label>
      <label>
        First Name
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last Name
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <label>
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        Address
        <input
          value={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
        />
      </label>
      <label>
        City
        <input
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
        />
      </label>
      <label>
        Zip Code
        <input
          type="number"
          value={zipCode}
          onChange={(event) => setZipCode(Number(event.currentTarget.value))}
        />
      </label>
      <label>
        Country
        <input
          value={country}
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
