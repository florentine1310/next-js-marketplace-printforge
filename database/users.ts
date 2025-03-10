import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserInsecure = cache(async (userName: User['userName']) => {
  const [user] = await sql<User[]>`
  SELECT
    user_name,
    email,
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    offers_printing
  FROM
    users
  WHERE
    user_name = ${userName}
`;

  return user;
});

export const getUserWithPasswordHashInsecure = cache(
  async (email: User['email']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
  SELECT
  user_name,
    email,
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    password_hash,
    offers_printing
  FROM
    users
  WHERE
    email = ${email}
`;

    return user;
  },
);

export const createUserInsecure = cache(
  async (
    userData: User,
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (user_name, email, first_name, last_name, address, zip_code, city, country,  offers_printing, created_at, password_hash)
      VALUES
        (
          ${userData.userName},
          ${userData.email},
          ${userData.firstName},
          ${userData.lastName},
          ${userData.address},
          ${userData.zipCode},
          ${userData.city},
          ${userData.country},
          ${userData.offersPrinting},
          CURRENT_DATE,
          ${passwordHash}
        )
      RETURNING
        users.user_name,
        users.email,
        users.first_name,
        users.last_name,
        users.address,
        users.zip_code,
        users.city,
        users.country,
        users.offers_printing
        ;
    `;

    return user;
  },
);
