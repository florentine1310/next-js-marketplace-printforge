import { cache } from 'react';
import type { Session } from '../migrations/00004-createTableSessions';
import type { Order } from '../migrations/00007-createTableOrders';
import { sql } from './connect';

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
