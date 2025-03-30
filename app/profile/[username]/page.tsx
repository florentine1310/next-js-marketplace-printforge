import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import { getUser } from '../../../database/users';
import AccountDetailsForm from './AccountDetailsForm';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage(props: Props) {
  const { username } = await props.params;

  // get the session token from the cookie
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // if the session token is invalid or doesn't exist redirect user to login page

  // if the session cookie is valid redirect to homepage
  if (!session) {
    redirect(`/login?returnTo=profile/${username}`);
  }

  const user = await getUser(sessionTokenCookie.value);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <AccountDetailsForm user={user} />
    </div>
  );
}
