import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage(props: Props) {
  const { username } = await props.params;

  // check if sessionToken cookie exists
  const cookieStore = await cookies();

  // get the session token from the cookie
  const sessionTokenCookie = cookieStore.get('sessionToken');

  // check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // if the session token is invalid or doesn't exist redirect user to login page

  // if the session cookie is valid redirect to homepage
  if (!session) {
    redirect(`/login?returnTo=profile/${username}`);
  }

  return <h2>Welcome back {username}</h2>;
}
