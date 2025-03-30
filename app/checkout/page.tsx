import type { SearchParams } from 'next/dist/server/request/search-params';
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
      <CheckoutForm
        userId={user.id}
        cartItems={cartItems}
        orderTotal={totalPrice}
      />
    </div>
  );
}
