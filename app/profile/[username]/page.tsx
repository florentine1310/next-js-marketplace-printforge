type Props = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage(props: Props) {
  const { username } = await props.params;

  return <h2>Welcome back {username}</h2>;
}
