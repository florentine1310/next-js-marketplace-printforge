'use client';

import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBody } from '../api/login/route';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">User Login</h2>
      </div>
      <label>
        Email
        <input
          className="input input-primary"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          className="input input-primary"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button className="btn btn-primary">Login</button>
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
