import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51GuGZ3BkmcAfHr8gVkzmxehHjX6mib5fnWEY3p58E3YNrd1VOJGYGfuSzjtBmnpHfFD1QFi2w9zuFkztl5IMNYTx00cIv4dtZf';

  const onToken = token => {
    console.log(token)
    alert('Payment Successful');
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='Fashion Fiesta'
      billingAddress shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};
export default StripeCheckoutButton;