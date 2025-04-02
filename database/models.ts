import { cache } from 'react';
import type { Model } from '../migrations/00002-createTableModels';
import type { Session } from '../migrations/00004-createTableSessions';
import { sql } from './connect';

// Get Models

export const getModelsInsecure = cache(async () => {
  const models = await sql<Model[]>`
    SELECT
      *
    FROM
      models
  `;
  return models;
});

export const getModelInsecure = cache(async (id: number) => {
  const model = await sql<Model[]>`
    SELECT
      *
    FROM
      models
    WHERE
      id = ${id}
  `;
  return model;
});

export const getModelsByCategoryInsecure = cache(async (category: string) => {
  const models = await sql<Model[]>`
    SELECT
      *
    FROM
      models
    WHERE
      category = ${category}
  `;
  return models;
});

export const getModelsByUser = cache(
  async (sessionToken: Session['token'], userId: number) => {
    const models = await sql<Model[]>`
      SELECT
        models.*
      FROM
        models
        INNER JOIN sessions ON sessions.user_id = models.user_id
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.user_id = ${userId}
        AND sessions.expiry_timestamp > now()
    `;
    return models;
  },
);

// Create new model
export const createModel = cache(
  async (sessionToken: Session['token'], modelData: Omit<Model, 'id'>) => {
    const [model] = await sql<Model[]>`
      INSERT INTO
        models (
          user_id,
          category,
          name,
          description,
          stl_url,
          image_url,
          print_price
        )
      SELECT
        users.id,
        ${modelData.category},
        ${modelData.name},
        ${modelData.description},
        ${modelData.stlUrl},
        ${modelData.imageUrl},
        ${modelData.printPrice}::numeric
      FROM
        sessions
        INNER JOIN users ON users.id = sessions.user_id
      WHERE
        sessions.token = ${sessionToken}
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
        models.print_price;
    `;

    return model;
  },
);

// Delete Model

export const deleteModelById = cache(
  async (sessionToken: Session['token'], modelId: number) => {
    const [model] = await sql<Model[]>`
      DELETE FROM models USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND models.id = ${modelId}
      RETURNING
        models.*
    `;

    return model;
  },
);
