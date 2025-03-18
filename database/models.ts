import { cache } from 'react';

// Create new model
export const createModelInsecure = cache(
  async (
    userData: Omit<User, 'id'>,
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [model] = await sql<User[]>`
      INSERT INTO
        models (user_name, email, first_name, last_name, address, zip_code, city, country,  offers_printing, created_at, password_hash)
      VALUES
        (
          ${userData.userName},
          ${userData.email.toLowerCase()},
          ${userData.firstName},
          ${userData.lastName},
          ${userData.address},
          ${userData.zipCode},
          ${userData.city},
          ${userData.country},
          ${userData.offersPrinting},
          CURRENT_DATE,
          ${passwordHash}
        )
      RETURNING
        users.id,
        users.user_name,
        users.email,
        users.first_name,
        users.last_name,
        users.address,
        users.zip_code,
        users.city,
        users.country,
        users.offers_printing
        ;
    `;

    return model;
  },
);
