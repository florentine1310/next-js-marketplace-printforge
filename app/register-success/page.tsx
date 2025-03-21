import { cookies } from 'next/headers';
import { getUser } from '../../database/users';
import NavigationButtons from './NavigationButtons';

export default async function RegisterSuccessPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  return (
    <section>
      <h1 className="pageHeadline">Registered successfully</h1>
      <div className="flex flex-col m-10 my-24 gap-5 justify-self-center text-center items-center">
        <h2 className="text-2xl font-extrabold">
          Welcome to the LayerForge community! 🚀
        </h2>
        <p className="text-xl">
          You have been registered successfully. What do you want to do next?
        </p>
        <NavigationButtons userName={user?.userName} />
      </div>
    </section>
  );
}
