import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import type { Session } from '../migrations/00004-createTableSessions';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

// Get User
export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.user_name,
      users.email,
      users.first_name,
      users.last_name,
      users.address,
      users.zip_code,
      users.city,
      users.country,
      users.profile_image,
      users.offers_printing
    FROM
      users
      INNER JOIN sessions ON (
        sessions.user_id = users.id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      sessions.token = ${sessionToken}
  `;

  return user;
});

export const getUserInsecure = cache(async (userName: User['userName']) => {
  const [user] = await sql<User[]>`
  SELECT
    id,
    user_name,
    email,
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    profile_image,
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
    id,
    user_name,
    email,
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    password_hash,
    profile_image,
    offers_printing
  FROM
    users
  WHERE
    email = ${email.toLowerCase()}
`;

    return user;
  },
);

// Create new user

export const createUserInsecure = cache(
  async (
    userData: Omit<User, 'id'>,
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (user_name, email, first_name, last_name, address, zip_code, city, country, profile_image, offers_printing, created_at, password_hash)
      VALUES
        (
          ${userData.userName},
          ${userData.email.toLowerCase()},
          ${userData.firstName},
          ${userData.lastName},
          ${userData.address},
          ${userData.zipCode},
          ${userData.city},
          ${userData.country},
          ${userData.profileImage},
          ${userData.offersPrinting},
          CURRENT_DATE,
          ${passwordHash}
        )
      RETURNING
        users.id,
        users.user_name,
        users.email,
        users.first_name,
        users.last_name,
        users.address,
        users.zip_code,
        users.city,
        users.country,
        users.profile_image,
        users.offers_printing
        ;
    `;

    return user;
  },
);

// Update existing user

export const updateUser = cache(
  async (sessionToken: Session['token'], updatedUser: User) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${updatedUser.firstName},
        last_name = ${updatedUser.lastName},
        email = ${updatedUser.email},
        address = ${updatedUser.address},
        city = ${updatedUser.city},
        zip_code= ${updatedUser.zipCode},
        country = ${updatedUser.country},
        profile_image= ${updatedUser.profileImage},
        offers_printing = ${updatedUser.offersPrinting}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND users.id = ${updatedUser.id}
      RETURNING
        users.id,
        users.user_name,
        users.email,
        users.first_name,
        users.last_name,
        users.address,
        users.zip_code,
        users.city,
        users.country,
        users.profile_image,
        users.offers_printing
    `;
    return user;
  },
);
