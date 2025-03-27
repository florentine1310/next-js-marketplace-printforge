import { cookies } from 'next/headers';
import React from 'react';
import { calculateOrderTotal } from '../../util/calculateOrderTotal';
import DeleteCartItemButton from './DeleteCartItemButton';

type CartItem = {
  id: number;
  name: string;
  printPrice: number;
  imageUrl: string | null;
  quantity: number;
};

export default async function CartPage() {
  const cartItemsCookie = (await cookies()).get('cart');

  const cartItems: CartItem[] = !cartItemsCookie
    ? []
    : (JSON.parse(cartItemsCookie.value) as CartItem[]);

  // Totals calculation
  const totalQuantity = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0,
  );
  const totalPrice = calculateOrderTotal(cartItems);

  return (
    <div>
      <h1 className="pageHeadline">Shopping Cart</h1>
      {totalQuantity > 0 ? (
        <div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mx-15 my-10">
            <table className="table">
              <thead>
                <tr>
                  <th />
                  <th>Model</th>
                  <th>Print Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => {
                  return (
                    <tr key={`cart-${cartItem.id}`}>
                      <td>
                        <img
                          className="size-10 rounded-box"
                          src={
                            cartItem.imageUrl ??
                            'https://placehold.co/400x400?text=No+Image+Available&font=roboto'
                          }
                          alt="model"
                        />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.printPrice}</td>
                      <td>{cartItem.quantity}</td>
                      <td>
                        {(cartItem.quantity * cartItem.printPrice).toFixed(2)}
                      </td>
                      <td>
                        <DeleteCartItemButton itemId={cartItem.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Totals</th>
                  <td />
                  <td />
                  <td>{totalQuantity}</td>
                  <td>{totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex">
            <button className="btn btn-primary ml-auto mr-15 mb-10">
              Proceed To Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <h2 className="font-semibold text-xl m-10 flex-grow">
            Your shopping cart is empty 🛍️
          </h2>
        </div>
      )}
    </div>
  );
}
