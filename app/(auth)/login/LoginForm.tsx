'use client';

import Image from 'next/image';
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
    <section className="grid grid-cols-2">
      <div className="ml-10 mt-5 justify-items-center items-center">
        <Image
          src="/images/Login-image.png"
          width={500}
          height={500}
          alt="Login"
          className="rounded-lg"
        />
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box m-10">
            <legend className="fieldset-legend">User Login</legend>
            <label className="fieldset-label" htmlFor="email">
              Email
            </label>

            <input
              id="email"
              value={email}
              className="input"
              onChange={(event) => setEmail(event.currentTarget.value)}
              placeholder="mail@site.com"
            />

            <label className="fieldset-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <button className="btn btn-primary mt-4 w-30">Login</button>
            {errors?.map((error) => {
              return (
                <div key={`error-${error.message}-${Math.random()}`}>
                  <ErrorMessage>{error.message}</ErrorMessage>
                </div>
              );
            })}
          </fieldset>
        </form>
        <div className="m-10">
          <p>
            Not registered yet? <a className="link link-accent">Sign up here</a>
          </p>
        </div>
      </div>
    </section>
  );
}
