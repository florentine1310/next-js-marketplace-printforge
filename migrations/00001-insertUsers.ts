import type { Sql } from 'postgres';

const users = [
  {
    id: 1,
    userName: 'Skywalker42',
    email: 'user1@example.com',
    firstName: 'Max',
    lastName: 'Schulz',
    address: 'Kurfürstendamm 21',
    zipCode: 10719,
    city: 'Berlin',
    country: 'Germany',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: true,
  },
  {
    id: 2,
    userName: 'PixelPioneer',
    email: 'user2@example.com',
    firstName: 'Mia',
    lastName: 'Weber',
    address: 'Marienplatz 1',
    zipCode: 80331,
    city: 'München',
    country: 'Germany',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: false,
  },
  {
    id: 3,
    userName: 'EchoNomad',
    email: 'user3@example.com',
    firstName: 'Anna',
    lastName: 'Wagner',
    address: 'Speersort 10',
    zipCode: 20095,
    city: 'Hamburg',
    country: 'Germany',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: true,
  },
  {
    id: 4,
    userName: 'CyberSphinx',
    email: 'user4@example.com',
    firstName: 'Leon',
    lastName: 'Schneider',
    address: 'Schildergasse 99',
    zipCode: 50667,
    city: 'Köln',
    country: 'Germany',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: true,
  },
  {
    id: 5,
    userName: 'QuantumBard',
    email: 'user5@example.com',
    firstName: 'Leon',
    lastName: 'Schulz',
    address: 'Zeil 85',
    zipCode: 60313,
    city: 'Frankfurt',
    country: 'Germany',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: false,
  },
  {
    id: 6,
    userName: 'NeonVoyager',
    email: 'user6@example.com',
    firstName: 'Emma',
    lastName: 'Meyer',
    address: 'Königstraße 26',
    zipCode: 70173,
    city: 'Stuttgart',
    country: 'Germany',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: true,
  },
  {
    id: 7,
    userName: 'SolarFlare99',
    email: 'user7@example.com',
    firstName: 'Noah',
    lastName: 'Fischer',
    address: 'Kärntner Straße 17',
    zipCode: 1010,
    city: 'Wien',
    country: 'Austria',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: false,
  },
  {
    id: 8,
    userName: 'ByteMystic',
    email: 'user8@example.com',
    firstName: 'Felix',
    lastName: 'Becker',
    address: 'Graben 30',
    zipCode: 1010,
    city: 'Wien',
    country: 'Austria',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: true,
  },
  {
    id: 9,
    userName: 'HyperNovaX',
    email: 'user9@example.com',
    firstName: 'Lina',
    lastName: 'Hoffmann',
    address: 'Getreidegasse 3',
    zipCode: 5020,
    city: 'Salzburg',
    country: 'Austria',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: false,
  },
  {
    id: 10,
    userName: 'ZenithSeeker',
    email: 'user10@example.com',
    firstName: 'Sophia',
    lastName: 'Müller',
    address: 'Landstraße 48',
    zipCode: 4020,
    city: 'Linz',
    country: 'Austria',
    profileImage: '',
    passwordHash:
      '$2a$12$s7guUbSwTe8w083C8NJHAuS6P2uPxaVq1gXaeULjkzP8rhmb5fBnm',
    offersPrinting: true,
  },
  {
    id: 11,
    userName: 'Admin',
    email: 'admin@test.at',
    firstName: 'Florentine',
    lastName: 'Ramböck',
    address: 'Landstraße 48',
    zipCode: 5020,
    city: 'Salzburg',
    country: 'Austria',
    profileImage:
      'https://asset.cloudinary.com/dshcxl5an/6f45dcf2d3561385c3bffd2e9e96fd41',
    passwordHash:
      '$2a$12$1lQQUtEQkCJ2AZxny0jynud.l2Iy4.G4uo2qEnCCHkK2Mm654Pt.q',
    offersPrinting: false,
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          user_name,
          email,
          first_name,
          last_name,
          address,
          zip_code,
          city,
          country,
          profile_image,
          password_hash,
          offers_printing,
          created_at
        )
      VALUES
        (
          ${user.userName},
          ${user.email},
          ${user.firstName},
          ${user.lastName},
          ${user.address},
          ${user.zipCode},
          ${user.city},
          ${user.country},
          ${user.profileImage},
          ${user.passwordHash},
          ${user.offersPrinting},
          current_date
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
