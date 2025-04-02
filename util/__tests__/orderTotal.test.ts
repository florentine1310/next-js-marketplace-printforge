import { expect, test } from '@jest/globals';
import { calculateOrderTotal } from '../calculateOrderTotal';

test('calculate order total correctly', () => {
  const cartItems = [
    { id: 1, name: 'item A', printPrice: 19.99, quantity: 5 },
    { id: 2, name: 'item B', printPrice: 24.0, quantity: 3 },
    { id: 3, name: 'item C', printPrice: 10.0, quantity: 1 },
  ];
  expect(calculateOrderTotal(cartItems)).toBe(181.95); // sum of all cart items price * quantity

  expect(calculateOrderTotal([])).toBe(0); // empty cart should be a total of 0
});
