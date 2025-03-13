import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import type { Session } from '../migrations/00004-createTableSessions';
import { sql } from './connect';

export const getValidSessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [session] = await sql<Session[]>`
      SELECT
        sessions.id,
        sessions.user_id,
        sessions.token
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
    `;

    return session;
  },
);

export const createSessionInsecure = cache(
  async (token: Session['token'], userId: User['id']) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.id,
        sessions.user_id,
        sessions.token
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        sessions.expiry_timestamp < now()
    `;

    return session;
  },
);

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Pick<Session, 'userId'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${sessionToken}
    RETURNING
      sessions.user_id
  `;

  return session;
});
