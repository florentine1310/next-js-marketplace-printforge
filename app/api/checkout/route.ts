import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { createOrderItem } from '../../../database/orderItems';
import { createOrder } from '../../../database/orders';
import { stripe } from '../../../lib/stripe';
import { orderSchema } from '../../../migrations/00007-createTableOrders';

export async function POST(
  request: Request,
): Promise<NextResponse<{ url: string } | { error: string }>> {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    // create order in database
    const requestBody = await request.json();
    const result = orderSchema.safeParse(requestBody);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Request does not contain order object',
        },
        { status: 400 },
      );
    }
    const sessionTokenCookie = (await cookies()).get('sessionToken');

    const newOrder =
      sessionTokenCookie &&
      (await createOrder(sessionTokenCookie.value, {
        userId: result.data.userId,
        shippingAddress: result.data.shippingAddress,
        shippingZipCode: result.data.shippingZipCode,
        shippingCity: result.data.shippingCity,
        shippingCountry: result.data.shippingCountry,
        orderTotal: result.data.orderTotal,
      }));

    if (!newOrder) {
      return NextResponse.json(
        {
          error: 'Order not created or access denied for creating order',
        },
        {
          status: 500,
        },
      );
    }
    for (const item of result.data.cartItems) {
      await createOrderItem({
        orderId: newOrder.id,
        modelId: item.id,
        quantity: item.quantity,
      });
    }

    // Create line items based on the cartItems from props

    const lineItems = result.data.cartItems.map((item) => ({
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(item.printPrice * 100),
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create Stripe Checkout session' },
        { status: 500 },
      );
    }
    // Clear shopping cart
    const cartItemsCookie = await cookies();
    cartItemsCookie.delete('cart');

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
