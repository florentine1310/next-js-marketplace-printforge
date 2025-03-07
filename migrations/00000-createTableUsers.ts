import type { Sql } from 'postgres';

export type User = {
  id: number;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  zip_code: number;
  city: string;
  country: string;
  profile_image: string;
  offers_printing: boolean;
  created_at: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name varchar(80) NOT NULL UNIQUE,
      email varchar(50) NOT NULL,
      first_name varchar NOT NULL,
      last_name varchar NOT NULL,
      address varchar NOT NULL,
      zip_code bigint NOT NULL,
      city varchar(50) NOT NULL,
      country varchar(50) NOT NULL,
      profile_image url,
      password_hash varchar NOT NULL,
      offers_printing boolean NOT NULL,
      created_at date NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
