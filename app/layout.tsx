import './globals.css';
import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getUser } from '../database/users';
import LoginButton from './(auth)/login/LoginButton';
import LogoutButton from './(auth)/logout/LogoutButton';
import RegisterButton from './(auth)/register/RegisterButton';

type Props = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  name: string;
  printPrice: string;
  imageUrl: string | null;
  quantity: number;
};

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'LayerForge',
  description: 'The marketplace to build anything - one layer at a time',
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Load only required font weights
  variable: '--font-montserrat', // Optional: Use as a CSS variable
  display: 'swap', // Improves performance
});

export default async function RootLayout({ children }: Props) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  const cartItemsCookie = (await cookies()).get('cart');

  const cartItems: CartItem[] = !cartItemsCookie
    ? []
    : (JSON.parse(cartItemsCookie.value) as CartItem[]);
  const totalQuantity = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0,
  );

  return (
    <html lang="en" data-theme="corporate" className={montserrat.className}>
      <body>
        <header className="sticky top-0 z-50">
          <div>
            {/* Navbar Start (always visible) */}
            <nav className="navbar bg-base-100 shadow-md flex justify-between items-center px-4">
              <div className="navbar-start w-1/3">
                <Link className="m-2 mr-8" href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-24 h-16 sm:w-28 sm:h-20 dark:hidden"
                  />
                  <Image
                    src="/images/logo-light.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="hidden dark:block w-24 h-16 sm:w-28 sm:h-20"
                  />
                </Link>

                <div className="hidden lg:flex lg:items-center lg:gap-4">
                  <Link href="/models" className="m-3">
                    3D Models
                  </Link>
                  <Link href="/models" className="m-3">
                    How It Works
                  </Link>
                </div>
              </div>

              {/* Navbar Center - search bar */}
              <div className="navbar-center hidden lg:flex w-1/3 justify-center">
                <div className="input">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </g>
                  </svg>
                  <input type="search" required placeholder="Search" />
                </div>
              </div>
              {/* Navbar End (always visible) */}
              <div className="navbar-end w-1/3 flex justify-end items-center gap-2 sm:gap-4">
                {/* Shopping Cart Icon and count */}
                <Link href="/cart" className="m-2 sm:m-4">
                  <div className="relative">
                    <Image
                      src="/icons/shopping-cart.svg"
                      alt="cart"
                      width={25}
                      height={25}
                      className="w-10 h-10 sm:size-9 md:size-6 dark:hidden"
                    />
                    <Image
                      src="/icons/shopping-cart-white.svg"
                      alt="cart"
                      width={25}
                      height={25}
                      className="w-10 h-10 sm:size-9 md:size-6 hidden dark:block"
                    />
                    {totalQuantity > 0 && (
                      <span className="badge badge-xs badge-info text-xs absolute -top-1 -right-3 sm:-top-3.5 sm-right-4">
                        {totalQuantity}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Mobile Hamburger Menu */}

                <div className="drawer drawer-end lg:hidden items-center pr-1">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content justify-center items-center">
                    <label
                      htmlFor="my-drawer-4"
                      className="btn btn-ghost justify-center items-center"
                      aria-label="Open Mobile Menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    />

                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                      <li>
                        <div className="input mb-3">
                          <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <g
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="2.5"
                              fill="none"
                              stroke="currentColor"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                            </g>
                          </svg>
                          <input type="search" required placeholder="Search" />
                        </div>
                      </li>

                      <li>
                        <Link href="/models">3D Models</Link>
                      </li>
                      <li>
                        <Link href="/models">How It Works</Link>
                      </li>

                      {user ? (
                        <ul>
                          <li className="font-semibold mt-8 mb-2 ">{`logged in as ${user.userName}`}</li>
                          <li>
                            <a href={`/profile/${user.userName}`}>My Account</a>
                          </li>
                          <li>
                            <a href={`/profile/${user.userName}/wishlist`}>
                              My Wishlist
                            </a>
                          </li>

                          <li className="pt-3">
                            <LogoutButton />
                          </li>
                        </ul>
                      ) : (
                        <div>
                          <Link href="/register">
                            <RegisterButton />
                          </Link>
                          <Link href="/login">
                            <LoginButton />
                          </Link>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>

                {/* User Profile Icon Menu */}
                <div className="hidden lg:block">
                  {user ? (
                    <div className="dropdown dropdown-hover dropdown-end m-2">
                      <Link href={`/profile/${user.userName}`}>
                        <Image
                          src="/icons/user.svg"
                          alt="user"
                          width={25}
                          height={25}
                          className="dark:hidden"
                        />
                        <Image
                          src="/icons/user-white.svg"
                          alt="user"
                          width={25}
                          height={25}
                          className="hidden dark:block"
                        />
                      </Link>
                      <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li className="font-semibold pb-1">{`logged in as ${user.userName}`}</li>
                        <li>
                          <a href={`/profile/${user.userName}`}>My Account</a>
                        </li>
                        <li>
                          <a href={`/profile/${user.userName}/wishlist`}>
                            My Wishlist
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="dropdown dropdown-hover m-2">
                      <Link href="/login">
                        <Image
                          src="/icons/user.svg"
                          alt="user"
                          width={25}
                          height={25}
                          className="dark: hidden"
                        />
                        <Image
                          src="/icons/user-white.svg"
                          alt="user"
                          width={25}
                          height={25}
                          className="hidden dark:block"
                        />
                      </Link>
                      <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                          <a href="/register">Create account</a>
                        </li>
                        <li>
                          <a href="/login">Login</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Login/Logout and Register Button */}
                <div className="hidden lg:flex items-center gap-4">
                  {user ? (
                    <LogoutButton />
                  ) : (
                    <div>
                      <Link href="/register">
                        <RegisterButton />
                      </Link>
                      <Link href="/login">
                        <LoginButton />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer sm:footer-horizontal bg-base-content dark:bg-base-200 text-neutral-content p-10 mt-auto">
          LayerForge ®
          <div>
            <h4>Services</h4>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div>
            <h4>Company</h4>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
