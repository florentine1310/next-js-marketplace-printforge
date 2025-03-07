import type { User } from '../migrations/00000-createTableUsers';

type UserWithPasswordHash = User & {
  passwordHash: string;
};
