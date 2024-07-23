require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/payment-intent', async (req, res) => {
  const { amount, name, address, city, postalCode, country, provinceOrState } = req.body;
  try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'cad',
    shipping: {
      name, 
      address: {
        line1: address,
        city,
        postal_code: postalCode,
        country,
        state: provinceOrState,
      }
    }
  });
  res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
  res.status(500).send(error.message);
  }
  });

app.listen(3000, () => console.log('Server running on port 3000'));
