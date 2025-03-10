import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE models (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      category varchar(50) NOT NULL,
      name varchar(100) NOT NULL,
      description varchar(250) NOT NULL,
      stl_url varchar NOT NULL,
      image_url varchar NOT NULL,
      print_price integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE models`;
}
