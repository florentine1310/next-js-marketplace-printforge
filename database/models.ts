import { cache } from 'react';
import type { Model } from '../migrations/00002-createTableModels';
import type { Session } from '../migrations/00004-createTableSessions';
import { sql } from './connect';

// Get Models

export const getProductsInsecure = cache(async () => {
  const models = await sql<Model[]>`
    SELECT
      *
    FROM
      models
  `;
  return models;
});

// Create new model
export const createModel = cache(
  async (sessionToken: Session['token'], modelData: Omit<Model, 'id'>) => {
    const [model] = await sql<Model[]>`
      INSERT INTO
        models (user_id, category, name, description, stl_url, image_url, print_price)
      SELECT
          users.id,
          ${modelData.category},
          ${modelData.name},
          ${modelData.description},
          ${modelData.stlUrl},
          ${modelData.imageUrl},
          ${modelData.printPrice}::numeric
          FROM sessions
      INNER JOIN users ON users.id = sessions.user_id
      WHERE sessions.token = ${sessionToken}
      AND sessions.user_id = ${modelData.userId}
      AND sessions.expiry_timestamp > now()

      RETURNING
        models.id,
        models.user_id,
        models.category,
        models.name,
        models.description,
        models.stl_url,
        models.image_url,
        models.print_price
        ;
    `;

    return model;
  },
);
