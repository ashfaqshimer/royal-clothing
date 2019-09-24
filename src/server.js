const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Check to see if in production, add a handler to serve up js assets
if (process.env.ENVIRONMENT === 'prod') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
		);
	});
}

// Routes
app.use(express.json());

app.post('/payment', (req, res) => {
	const { token, amount } = req.body;

	const body = { source: token.id, amount, currency: 'usd' };

	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ response: stripeRes });
		}
	});
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log('Server running on port', port);
});
