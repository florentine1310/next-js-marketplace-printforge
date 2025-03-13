import LoginForm from './LoginForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage(props: Props) {
  const { returnTo } = await props.searchParams;

  return <LoginForm returnTo={returnTo} />;
}
