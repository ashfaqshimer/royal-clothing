import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_cVXNOMFKm72eQ8UYdSSeXEfi005jajA9hc';
	const onToken = async (token) => {
		try {
			const response = await axios.post('/payment', {
				amount: priceForStripe,
				token
			});
			console.log(response);
			alert('Payment successful');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<StripeCheckout
			label='Pay Now'
			name='Royal Clothing'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeButton;
