import type { Sql } from 'postgres';

const models = [
  {
    id: 1,
    userId: 1,
    category: 'tools',
    name: 'Custom Wrench',
    description: `Durable and lightweight 3D-printed wrench, designed for quick fixes and everyday use. Made from high-strength PLA or PETG, it's perfect for makers, tinkerers, or as a functional backup in your toolbox.`,
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/flkjtlvvoeb6orttjden.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/hbjpmf75d2jnoc0d2sas.webp',
    printPrice: 5.99,
  },
  {
    id: 2,
    userId: 2,
    category: 'home',
    name: 'Wall Hook Organizer',
    description:
      'A sturdy and stylish 3D-printed wall hook organizer for efficient space management.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/z1fkevn6saohk8zhq1s7.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
    printPrice: 3.49,
  },
  {
    id: 3,
    userId: 3,
    category: 'gadgets',
    name: 'Phone Stand',
    description:
      'A sleek and ergonomic 3D-printed phone stand for hands-free use and better viewing angles.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/o1tefg9rutv8abbhxomy.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/tsuxkgtgd6c5rvasho5g.webp',
    printPrice: 4.99,
  },
  {
    id: 4,
    userId: 4,
    category: 'toys',
    name: 'Articulated Robot',
    description:
      'A fun, movable 3D-printed robot with articulated joints for endless playtime.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/q0n9ix9czfpohu7anc6v.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/lwn7jgufluvpdpvkh7z9.webp',
    printPrice: 7.99,
  },
  {
    id: 5,
    userId: 5,
    category: 'home',
    name: 'Spice Jar Holder',
    description:
      'A customizable 3D-printed spice jar holder for neatly organizing kitchen essentials.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/q0n9ix9czfpohu7anc6v.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/njmgfshbilzny6okpftm.webp',
    printPrice: 6.49,
  },
  {
    id: 6,
    userId: 6,
    category: 'gadgets',
    name: 'Car Cup Holder Insert',
    description:
      'A universal 3D-printed cup holder insert designed to fit most vehicle cup holders for added stability.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/flkjtlvvoeb6orttjden.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/xwqe3teynpiqx82hafoj.webp',
    printPrice: 5.29,
  },
];

export async function up(sql: Sql) {
  for (const model of models) {
    await sql`
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
      VALUES
        (
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
