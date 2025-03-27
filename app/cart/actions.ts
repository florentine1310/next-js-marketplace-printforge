'use server';

import { cookies } from 'next/headers';

type Props = {
  itemId: number;
};

type CartItem = {
  id: number;
  name: string;
  printPrice: string;
  imageUrl: string | null;
  quantity: number;
};

export async function deleteCookie({ itemId }: Props) {
  // 1. Get existing cookie
  const cartItemsCookie = (await cookies()).get('cart');

  // 2. Parse cookie value

  const cartItems: CartItem[] = !cartItemsCookie
    ? []
    : (JSON.parse(cartItemsCookie.value) as CartItem[]);

  // 3. Find cookie value

  const itemToDelete = cartItems.find((cartItem) => {
    return cartItem.id === itemId;
  });

  if (itemToDelete) {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== itemId,
    );
    (await cookies()).set('cart', JSON.stringify(updatedCartItems));
  }
}
