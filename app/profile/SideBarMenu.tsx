'use client';

import { usePathname } from 'next/navigation';
import type { User } from '../../migrations/00000-createTableUsers';

type Props = {
  user: User;
};

export default function SideBarMenu({ user }: Props) {
  const pathname = usePathname();
  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-54 mt-5 ml-10 mb-10">
        <li>
          <a
            href={`/profile/${user.userName}`}
            className={
              pathname === `/profile/${user.userName}` ? 'menu-active' : ''
            }
          >
            My Account
          </a>
        </li>
        <li>
          <a
            href={`/profile/${user.userName}/orders`}
            className={
              pathname === `/profile/${user.userName}/orders`
                ? 'menu-active'
                : ''
            }
          >
            My Orders
          </a>
        </li>
        <li>
          <a
            href={`/profile/${user.userName}/wishlist`}
            className={
              pathname === `/profile/${user.userName}/wishlist`
                ? 'menu-active'
                : ''
            }
          >
            My Wishlist
          </a>
        </li>
        {user.offersPrinting && (
          <div>
            <li>
              <a
                href={`/profile/${user.userName}/models-upload`}
                className={
                  pathname === `/profile/${user.userName}/models-upload`
                    ? 'menu-active'
                    : ''
                }
              >
                Model Upload
              </a>
            </li>
            <li>
              <a
                href={`/profile/${user.userName}/models`}
                className={
                  pathname === `/profile/${user.userName}/models`
                    ? 'menu-active'
                    : ''
                }
              >
                My 3D Models
              </a>
            </li>
            <li>
              <a
                href={`/profile/${user.userName}/print-jobs`}
                className={
                  pathname === `/profile/${user.userName}/print-jobs`
                    ? 'menu-active'
                    : ''
                }
              >
                My Print Jobs
              </a>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
