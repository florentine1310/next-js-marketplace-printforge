'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form>
      <button
        className="btn btn-primary"
        formAction={async () => {
          await logout();
          router.push('/login');
        }}
      >
        Logout
      </button>
    </form>
  );
}
