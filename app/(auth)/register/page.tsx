import RegisterForm from './RegisterForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function page(props: Props) {
  const { returnTo } = await props.searchParams;
  return <RegisterForm returnTo={returnTo} />;
}
