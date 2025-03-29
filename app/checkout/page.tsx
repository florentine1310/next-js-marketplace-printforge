import React from 'react';

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="pageHeadline">Checkout</h1>
      <section className="grid grid-cols-2">
        <div>
          <h4>Delivery Details</h4>
          <h4>Payment Details</h4>
        </div>
        <div>
          <h4>Order Overview</h4>
        </div>
      </section>
    </div>
  );
}
