import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getValidSessionToken } from '../../database/sessions';
import { getUser } from '../../database/users';
import { calculateOrderTotal } from '../../util/calculateOrderTotal';
import CheckoutForm from './CheckoutForm';

type CartItem = {
  id: number;
  name: string;
  printPrice: number;
  imageUrl: string | null;
  quantity: number;
};

type Props = {
  searchParams: Promise<{
    canceled?: string | string[];
  }>;
};

export default async function CheckoutPage(props: Props) {
  const { canceled } = await props.searchParams;
  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.',
    );
  }

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

  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));
  if (!session) {
    redirect(`/login?returnTo=cart/`);
  }

  const user = await getUser(sessionTokenCookie.value);
  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="pageHeadline">Checkout</h1>
      <div className="grid grid-cols-2">
        <div>
          <h3>Order Overview</h3>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mx-20 my-10">
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
        </div>
        <div className="justify-items-center">
          <h3>Delivery Address</h3>
          <CheckoutForm
            userId={user.id}
            cartItems={cartItems}
            orderTotal={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}
