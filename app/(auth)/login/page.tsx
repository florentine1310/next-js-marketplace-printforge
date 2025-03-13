import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage(props: Props) {
  const { returnTo } = await props.searchParams;

  // check if sessionToken cookie exists
  const cookieStore = await cookies();

  // get the sessionToken from the cookie
  const sessionTokenCookie = cookieStore.get('sessionToken');

  // check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // if the session cookie is valid redirect to homepage
  if (session) {
    redirect('/');
  }

  return <LoginForm returnTo={returnTo} />;
}
