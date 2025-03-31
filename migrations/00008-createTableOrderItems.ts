import type { Sql } from 'postgres';
import { z } from 'zod';

export type OrderItem = {
  id: number;
  orderId: number;
  modelId: number;
  quantity: number;
};

export const cartItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  printPrice: z.coerce.number(),
  imageUrl: z.string().nullable(),
  quantity: z.number(),
});

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE order_items (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id integer NOT NULL REFERENCES orders (id),
    model_id integer NOT NULL REFERENCES models (id),
    quantity integer NOT NULL
  )
`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE order_items`;
}
