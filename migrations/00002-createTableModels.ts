import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE models (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      category varchar(50) NOT NULL,
      name varchar(100) NOT NULL,
      description varchar(250) NOT NULL,
      stl_url varchar,
      image_url varchar,
      print_price numeric(10, 2) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE models`;
}
