'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBody } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>();

  const router = useRouter();

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
    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.userName}`,
    );

    router.refresh();
  }

  return (
    <form
      onSubmit={handleLogin}
      className="fieldset w-xs bg-base-200 border border-base-300 p-4 m-10 rounded-box"
    >
      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">User Login</h2>
      </div>

      <label className="fieldset-label">
        Email
        <input
          className="input input-primary"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label className="fieldset-label">
        Password
        <input
          className="input input-primary"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button className="btn btn-neutral mt-4">Login</button>
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
