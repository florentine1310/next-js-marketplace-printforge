import { expect, test } from '@jest/globals';
import reduceCookieValue from '../reduceCookieValue';

test('reduce product data and quantity to right cookie value', () => {
  const selectedModel = {
    id: 1,
    userId: 12,
    category: 'tools',
    name: 'Phone Stand',
    description:
      'A sleek and ergonomic 3D-printed phone stand for hands-free use and better viewing angles.',
    stlUrl: '',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/tsuxkgtgd6c5rvasho5g.webp',
    printPrice: '4.99',
  };
  const quantity = 5;

  expect(reduceCookieValue(selectedModel, quantity)).toStrictEqual({
    id: 1,
    userId: 12,
    category: 'tools',
    name: 'Phone Stand',
    description:
      'A sleek and ergonomic 3D-printed phone stand for hands-free use and better viewing angles.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/o1tefg9rutv8abbhxomy.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/tsuxkgtgd6c5rvasho5g.webp',
    printPrice: '4.99',
    quantity: 5,
  });
});

test('throws an error when a negative quantity is passed', () => {
  const selectedModel = {
    id: 1,
    userId: 12,
    name: 'Phone Stand',
    category: 'tools',
    description:
      'A sleek and ergonomic 3D-printed phone stand for hands-free use and better viewing angles.',
    stlUrl:
      'https://res.cloudinary.com/dshcxl5an/raw/upload/v1742546129/o1tefg9rutv8abbhxomy.stl',
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/tsuxkgtgd6c5rvasho5g.webp',
    printPrice: '4.99',
    quantity: 5,
  };
  const negativeQuantity = -5;

  expect(() => reduceCookieValue(selectedModel, negativeQuantity)).toThrow(
    'No negative quantity allowed',
  );
});
