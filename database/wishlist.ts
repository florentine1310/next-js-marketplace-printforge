import { cache } from 'react';
import type { Session } from '../migrations/00004-createTableSessions';
import type {
  WishlistEntry,
  WishlistItem,
} from '../migrations/00005-createTableWishlist';
import { sql } from './connect';

// Create new wishlist item
export const createWishlistEntry = cache(
  async (
    sessionToken: Session['token'],
    wishlistItem: Omit<WishlistEntry, 'id'>,
  ) => {
    const [wishlistEntry] = await sql<WishlistEntry[]>`
      INSERT INTO
        wishlist (user_id, model_id)
      SELECT
          users.id,
          ${wishlistItem.modelId}

          FROM sessions
      INNER JOIN users ON users.id = sessions.user_id
      WHERE sessions.token = ${sessionToken}

      AND sessions.expiry_timestamp > now()

      RETURNING
        wishlist.id,
        wishlist.user_id,
        wishlist.model_id

        ;
    `;

    return wishlistEntry;
  },
);

// Get wishlist items with Model Info

export const getWishlistItemsInsecure = cache(async (id: number) => {
  const wishlistItem = await sql<WishlistItem[]>`
    SELECT
      wishlist.id AS id,
      wishlist.user_id AS user_id,
      models.id AS model_id,
      models.name AS model_name,
      models.category AS model_category,
      models.image_url AS model_image_url,
      models.print_price AS model_print_price
    FROM
      models
      LEFT JOIN wishlist ON models.id = wishlist.model_id
    WHERE
    wishlist.user_id = ${id}
  `;
  return wishlistItem;
});

// Delete wishlist item

export const deleteWishlistItem = cache(
  async (sessionToken: Session['token'], modelId: number, userId: number) => {
    const [wishlistItem] = await sql<WishlistEntry[]>`
    DELETE FROM wishlist USING sessions

    WHERE
    sessions.token = ${sessionToken}
    AND sessions.expiry_timestamp > now()
    AND wishlist.model_id = ${modelId}
    AND wishlist.user_id = ${userId}
    RETURNING
    wishlist.*
  `;
    return wishlistItem;
  },
);
