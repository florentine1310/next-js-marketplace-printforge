import type { Sql } from 'postgres';

export type Order = {
  id: number;
  userId: number;
  modelId: number;
  quantity: number;
  shippingAddress: string;
  shippingZipCode: number;
  shippingCity: string;
  shippingCountry: string;
  orderTotal: number;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE orders (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users (id),
    model_id integer NOT NULL REFERENCES models (id),
    quantity integer NOT NULL,
    shipping_address varchar NOT NULL,
    shipping_zip_code integer NOT NULL,
    shipping_city varchar NOT NULL,
    shipping_country varchar NOT NULL,
    order_total numeric(10, 2) NOT NULL,
    created_at date NOT NULL
  )
`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE orders`;
}
