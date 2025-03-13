import type { Sql } from 'postgres';

const models = [
  {
    id: 1,
    userId: 1,
    category: 'tools',
    name: 'Drill Dust Collector',
    description:
      'The Drill Dust Collector is a fully 3D-printed, modular tool designed for enhanced dust collection and versatility',
    stlUrl: '',
    imageUrl: '',
    printPrice: 5.99,
  },
  {
    id: 2,
    userId: 2,
    category: 'home',
    name: 'Wall Hook Organizer',
    description:
      'A sturdy and stylish 3D-printed wall hook organizer for efficient space management.',
    stlUrl: '',
    imageUrl: '',
    printPrice: 3.49,
  },
  {
    id: 3,
    userId: 3,
    category: 'gadgets',
    name: 'Phone Stand',
    description:
      'A sleek and ergonomic 3D-printed phone stand for hands-free use and better viewing angles.',
    stlUrl: '',
    imageUrl: '',
    printPrice: 4.99,
  },
  {
    id: 4,
    userId: 4,
    category: 'toys',
    name: 'Articulated Robot',
    description:
      'A fun, movable 3D-printed robot with articulated joints for endless playtime.',
    stlUrl: '',
    imageUrl: '',
    printPrice: 7.99,
  },
  {
    id: 5,
    userId: 5,
    category: 'home',
    name: 'Spice Jar Holder',
    description:
      'A customizable 3D-printed spice jar holder for neatly organizing kitchen essentials.',
    stlUrl: '',
    imageUrl: '',
    printPrice: 6.49,
  },
  {
    id: 6,
    userId: 6,
    category: 'gadgets',
    name: 'Car Cup Holder Insert',
    description:
      'A universal 3D-printed cup holder insert designed to fit most vehicle cup holders for added stability.',
    stlUrl: '',
    imageUrl: '',
    printPrice: 5.29,
  },
];

export async function up(sql: Sql) {
  for (const model of models) {
    await sql`
INSERT INTO models (
  user_id,
      category,
      name,
      description,
      stl_url,
      image_url,
      print_price
)
VALUES (
  ${model.userId},
  ${model.category},
  ${model.name},
  ${model.description},
  ${model.stlUrl},
  ${model.imageUrl},
  ${model.printPrice}
)
  `;
  }
}

export async function down(sql: Sql) {
  for (const model of models) {
    await sql`
      DELETE FROM models
      WHERE
        id = ${model.id}
    `;
  }
}
