import { cache } from 'react';
import type { OrderItem } from '../migrations/00008-createTableOrderItems';
import { sql } from './connect';

// Create new order
export const createOrderItemInsecure = cache(
  async (orderItemData: Omit<OrderItem, 'id'>) => {
    const [orderItem] = await sql<OrderItem[]>`
      INSERT INTO
        order_items (order_id, model_id, quantity)
      VALUES
        (
          ${orderItemData.orderId},
          ${orderItemData.modelId},
          ${orderItemData.quantity}
        )
      RETURNING
        order_items.*;
    `;

    return orderItem;
  },
);
