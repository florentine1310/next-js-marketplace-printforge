import type { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: number;
  city: string;
  country: string;
  profileImage: string;
  passwordHash: string;
  offersPrinting: boolean;
  createdAt: Date;
};

export const registerSchema = z.object({
  username: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Must be 5 or more characters long' }),

  /*   address: z.string().min(3),
  zip_code: z.number(),
  city: z.string().min(3),
  country: z.string().min(3),
  profile_image: z.string().url(),
  offers_printing: z.boolean(), */
});

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
      profile_image varchar,
      password_hash varchar NOT NULL,
      offers_printing boolean NOT NULL,
      created_at date NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
