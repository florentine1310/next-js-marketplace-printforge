import type { Sql } from 'postgres';

export type Like = {
  id: number;
  userId: number;
  modelId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE likes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      model_id integer NOT NULL REFERENCES models (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE likes`;
}
