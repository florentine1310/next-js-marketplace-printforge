import type { Sql } from 'postgres';
import { z } from 'zod';

export type Model = {
  id: number;
  userId: number;
  category: string;
  name: string;
  description: string;
  stlUrl: string | null;
  imageUrl: string | null;
  printPrice: string;
};

export const modelSchema = z.object({
  userId: z.number(),
  category: z.string(),
  name: z.string().min(3),
  description: z.string().min(5),
  stlUrl: z.string(),
  imageUrl: z.string(),
  printPrice: z.string(),
});

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
