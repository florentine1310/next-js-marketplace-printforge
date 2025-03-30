import { cache } from 'react';
import type { Session } from '../migrations/00004-createTableSessions';
import type { OrderItem } from '../migrations/00008-createTableOrderItems';
import { sql } from './connect';

// Create new order
export const createOrderItem = cache(
  async (orderItemData: Omit<OrderItem, 'id'>) => {
    const [orderItem] = await sql<OrderItem[]>`
      INSERT INTO
        orderItems (order_id, model_id, quantity)
      VALUES(
          ${orderItemData.orderId},
          ${orderItemData.modelId},
          ${orderItemData.quantity})

      RETURNING
        orderItems.*
        ;
    `;

    return orderItem;
  },
);
