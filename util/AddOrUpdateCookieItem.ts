type CartItem = {
  id: number;
  name: string;
  printPrice: number;
  imageUrl: string | null;
  quantity: number;
};

export default function addOrUpdateCookieItem(
  cartItems: CartItem[],
  cookieValue: CartItem,
) {
  const cookieArray = cartItems;
  const itemToUpdate = cartItems.find((cartItem) => {
    return cartItem.id === cookieValue.id;
  });

  if (!itemToUpdate) {
    cookieArray.push({
      id: cookieValue.id,
      name: cookieValue.name,
      printPrice: cookieValue.printPrice,
      imageUrl: cookieValue.imageUrl,
      quantity: cookieValue.quantity,
    });
  } else {
    itemToUpdate.quantity += cookieValue.quantity;
  }

  return cookieArray;
}
