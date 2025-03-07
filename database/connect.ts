'use server';

import postgres, { type Sql } from 'postgres';
import postgresConfig from '../ley.config';
import { setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
  }

  return globalThis.postgresSqlClient;
}
export const sql = connectOneTimeToDatabase();
