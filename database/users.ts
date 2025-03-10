import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  WHERE
    username = ${username}
`;

  return user;
});
