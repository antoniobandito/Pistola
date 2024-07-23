import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardExpiryElement, CardCvcElement, CardNumberElement } from '@stripe/react-stripe-js';
import '/Users/casha/Desktop/pistola/pistola/client/src/styles/CheckoutForm.css';

const CheckoutForm: React.FC = () => {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { total, email, cartItems } = location.state || {};

  const [name, setName] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [provinceOrState, setProvinceOrState] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    if (clientSecret) {
      console.log('Client Secret received:', clientSecret);
    }
  }, [clientSecret]);

  const handlePaymentIntent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/payment-intent', {
        amount: total * 100,
        name: name,
        address: streetAddress,
        city: city,
        postalCode: postalCode,
        country: country,
        provinceOrState: provinceOrState,
     }); 
     const { clientSecret } = response.data;
     console.log('Payment intent created:', clientSecret)
     setClientSecret(clientSecret);
     return clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe or elements not loaded')
      return;
    }

    try {
    
    const clientSecret = await handlePaymentIntent();

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement!,
        billing_details: {
          name,
          email,
          phone: phoneNumber,
          address: {
            line1: streetAddress,
            city,
            postal_code: postalCode,
            country,
            state: provinceOrState,
          },
        },
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      navigate('/success');
    }
  }   catch (error) {
    console.error('Payment failed:', error)
  }
  };

  return (
    <form onSubmit={handleSubmit} className='checkout-form'>
      <div className='form-title'>CHECKOUT</div>

      <div className='section'>
        <div className='section-title'>SHIPPING DETAILS</div>
        <div className='form-group'>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Street Address</label>
          <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Province/State</label>
          <input type="text" value={provinceOrState} onChange={(e) => setProvinceOrState(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Phone</label>
          <input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
      </div>

      <div className='section'>
        <div className='section-title'>SHIPPING METHOD</div>
        <div className='shipping-method-container'>
          <div className='shipping-option'>
            <input 
              id='standard' 
              type='radio' 
              name='shipping' 
              value='standard' 
              checked={shippingMethod === 'standard'}
              onChange={() => setShippingMethod('standard')}
            />
            <label htmlFor='standard' className='shipping-option-label'>
              <div className='shipping-type-title'>0.00 CAD | Standard</div>
              <div className='delivery-range-text'>Delivered 3-4 days after purchase</div>
            </label>
          </div>
          <div className='shipping-option'>
            <input 
              id='express' 
              type='radio' 
              name='shipping' 
              value='express' 
              checked={shippingMethod === 'express'}
              onChange={() => setShippingMethod('express')}
            />
            <label htmlFor='express' className='shipping-option-label'>
              <div className='shipping-type-title'>13.00 CAD | Priority</div>
              <div className='delivery-range-text'>Delivered 1-2 days after purchase</div>
            </label>
          </div>
        </div>
      </div>

      <div className='section'>
        <div className='section-title'>Billing Address</div>
          <div className='billing-option'>
            <input 
              id='sameas' 
              type='radio' 
              name='billing' 
              value='sameas' 
              checked={shippingMethod === 'express'}
              onChange={() => setShippingMethod('express')}
            />
            <label htmlFor='sameas' className='billing-option-label'>
              <div className='billing-type-title'>13.00 CAD | Priority</div>
              <div className='delivery-range-text'>Delivered 1-2 days after purchase</div>
            </label>
          </div>
        </div>

      <div className='section'>
        <div className='section-title'>CARD INFORMATION</div>
        <div className='form-group'>
          <label>Card Number</label>
          <CardNumberElement />
        </div>
        <div className='form-group'>
          <label>Expiry Date</label>
          <CardExpiryElement />
        </div>
        <div className='form-group'>
          <label>CVC</label>
          <CardCvcElement />
        </div>
      </div>

      <button className='checkout-page-button' type="submit" disabled={!stripe || !elements}>
        Pay ${total ? total.toFixed(2) : '0.00'} CAD
      </button>

      <div className='cart-items'>
        <div className='section-title'>Order Summary</div>
        {cartItems && cartItems.map((item: any) => (
          <div key={item.id} className='cart-item'>
            <img src={item.imageUrl} alt={item.name} className='cart-item-image' />
            <div className='cart-item-details'>
              <p>{item.name}</p>
              <p>${item.price} CAD</p>
              <p>Quanity (x{item.quantity})</p>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default CheckoutForm;
