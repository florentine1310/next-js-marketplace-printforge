import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser } from '../../../../database/users';
import ModelsUploadForm from './ModelsUploadForm';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function ModelsUploadPage(props: Props) {
  const { username } = await props.params;

  // get the session token from the cookie
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // if the session token is invalid or doesn't exist redirect user to login page

  if (!session) {
    redirect(`/login?returnTo=profile/${username}`);
  }

  const user = await getUser(sessionTokenCookie.value);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ModelsUploadForm user={user} />
    </div>
  );
}
