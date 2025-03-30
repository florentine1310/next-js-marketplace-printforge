import type { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: number;
  city: string;
  country: string;
  profileImage: string | null;
  offersPrinting: boolean;
};

export const registerSchema = z.object({
  userName: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  address: z.string().min(3),
  zipCode: z.number(),
  city: z.string().min(3),
  country: z.string().min(3),
  offersPrinting: z.boolean(),
  profileImage: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5),
});

export const userSchema = z.object({
  userName: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(3),
  zipCode: z.number(),
  city: z.string().min(3),
  country: z.string().min(3),
  profileImage: z.string(),
  offersPrinting: z.boolean(),
});

export const userEditSchema = z.object({
  userName: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(3),
  zipCode: z.number(),
  city: z.string().min(3),
  country: z.string().min(3),
  offersPrinting: z.boolean(),
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
      zip_code integer NOT NULL,
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
