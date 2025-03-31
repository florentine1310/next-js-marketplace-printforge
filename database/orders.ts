import { cache } from 'react';
import type { Session } from '../migrations/00004-createTableSessions';
import type { Order } from '../migrations/00007-createTableOrders';
import { sql } from './connect';

type OrderWithDate = Order & {
  createdAt: Date;
};

type PrintJob = {
  orderItemId: number;
  orderId: number;
  modelId: number;
  quantity: number;
  orderCreatedAt: Date;
  modelName: string;
  modelImageUrl: string | null;
  shippingAddress: string;
  shippingZipCode: number;
  shippingCity: string;
  shippingCountry: string;
};

// Get Orders by UserId using session token
export async function getOrdersBySessionToken(sessionToken: Session['token']) {
  const orders = await sql<OrderWithDate[]>`
    SELECT
      orders.*
    FROM
      orders
    INNER JOIN sessions ON sessions.user_id = orders.user_id
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
    ORDER BY
      orders.created_at DESC
  `;

  return orders;
}

// Get orders for My Print Jobs page based on models.user_id
export async function getOrdersByCreatorId(
  creatorUserId: number,
): Promise<PrintJob[]> {
  const printJobs = await sql<PrintJob[]>`
    SELECT
      order_items.id AS order_item_id,
      order_items.order_id AS order_id,
      order_items.model_id AS model_id,
      order_items.quantity,
      orders.created_at AS order_created_at,
      models.name AS model_name,
      models.image_url AS model_image_url,
      orders.shipping_address AS shipping_address,
      orders.shipping_zip_code AS shipping_zip_code,
      orders.shipping_city AS shipping_city,
      orders.shipping_country AS shipping_country
    FROM order_items
    INNER JOIN orders ON order_items.order_id = orders.id
    INNER JOIN models ON order_items.model_id = models.id
    WHERE models.user_id = ${creatorUserId}
    ORDER BY orders.created_at DESC
  `;

  return printJobs;
}

// Create new order
export const createOrder = cache(
  async (sessionToken: Session['token'], orderData: Omit<Order, 'id'>) => {
    const [order] = await sql<Order[]>`
      INSERT INTO
        orders (user_id, shipping_address, shipping_zip_code, shipping_city, shipping_country, order_total, created_at)
      SELECT
          ${orderData.userId},
          ${orderData.shippingAddress},
          ${orderData.shippingZipCode},
          ${orderData.shippingCity},
          ${orderData.shippingCountry},
          ${orderData.orderTotal}::numeric,
          CURRENT_DATE
          FROM sessions
      INNER JOIN users ON users.id = sessions.user_id
      WHERE sessions.token = ${sessionToken}
      AND sessions.user_id = ${orderData.userId}
      AND sessions.expiry_timestamp > now()

      RETURNING
        orders.id,
        orders.user_id,
        orders.shipping_address,
        orders.shipping_zip_code,
        orders.shipping_city,
        orders.shipping_country,
        orders.order_total
        ;
    `;

    return order;
  },
);
