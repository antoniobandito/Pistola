import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Header from 'components/common/Header';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);


const Checkout: React.FC = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        // Fetch client secret from your backend 
        fetch('http://localhost:3000/api/payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              amount: 1000, 
              name: 'Customer Name', 
              phoneNumber: 'Customer Phone Number',
              streetAddress: 'Customer Street Address',
              city: 'Customer City',
              postalCode: 'Customer Postal Code',
              country: 'Customer Country',
              provinceOrState: 'Customer Province or State'
            }),
        })
        .then((response) => response.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.error('Error fetching client secret:', error));
    }, []);
    
    if (!clientSecret) {
        return <div>Loading payment details...</div>;
    }

  return (
    <div className='checkout'>
      <Header />
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
    </div>
  );
};

export default Checkout;
