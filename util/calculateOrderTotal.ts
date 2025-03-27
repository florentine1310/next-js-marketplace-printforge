type CartItem = {
  id: number;
  name: string;
  printPrice: number;
  quantity: number;
};

export function calculateOrderTotal(cartItems: CartItem[]) {
  const totalPrice = Number(
    cartItems
      .reduce((acc, item) => acc + item.printPrice * item.quantity, 0)
      .toFixed(2),
  );

  return totalPrice;
}
