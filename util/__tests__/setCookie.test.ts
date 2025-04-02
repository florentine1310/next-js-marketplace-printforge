import { expect, test } from '@jest/globals';
import addOrUpdateCookieItem from '../AddOrUpdateCookieItem';

test('add or update cookie value correctly', () => {
  const cartItems = [
    {
      id: 1,
      name: 'item A',
      printPrice: 19.99,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 5,
    },
    {
      id: 2,
      name: 'item B',
      printPrice: 24.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 3,
    },
    {
      id: 3,
      name: 'item C',
      printPrice: 10.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 1,
    },
  ];
  const existingCookieValue = {
    id: 2,
    name: 'item B',
    printPrice: 24.0,
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
    quantity: 3,
  };

  const newCookieValue = {
    id: 4,
    name: 'item C',
    printPrice: 20.0,
    imageUrl:
      'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
    quantity: 2,
  };

  expect(addOrUpdateCookieItem(cartItems, existingCookieValue)).toStrictEqual([
    {
      id: 1,
      name: 'item A',
      printPrice: 19.99,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 5,
    },
    {
      id: 2,
      name: 'item B',
      printPrice: 24.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 6,
    },
    {
      id: 3,
      name: 'item C',
      printPrice: 10.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 1,
    },
  ]); // updating quantity when item already exists in cookie

  expect(addOrUpdateCookieItem(cartItems, newCookieValue)).toStrictEqual([
    {
      id: 1,
      name: 'item A',
      printPrice: 19.99,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 5,
    },
    {
      id: 2,
      name: 'item B',
      printPrice: 24.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 6,
    },
    {
      id: 3,
      name: 'item C',
      printPrice: 10.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 1,
    },
    {
      id: 4,
      name: 'item C',
      printPrice: 20.0,
      imageUrl:
        'https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp',
      quantity: 2,
    },
  ]); // adding new item to the cookie
});
