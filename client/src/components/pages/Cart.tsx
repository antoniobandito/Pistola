import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import '/Users/casha/Desktop/pistola/pistola/client/src/styles/Cart.css'
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '/Users/casha/Desktop/pistola/pistola/client/src/assets/images/bx-menu.svg'

const Cart: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const { cartState, updateItemSize } = useCart();
  const navigate = useNavigate();
  const cartItems = [
    {
      id: 1,
      name: 'Colt.45 Straight Leg Sweatpant',
      price: 125,
      imageUrl: '/static-assets/sweatpants1.jpeg',
      quantity: 1,
    }
  ]

  const total = cartState.items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSizeChange = (id: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    updateItemSize(id, newSize);
  };

  const clientSecret = 'your_client_secret_here';

  const handleCheckout = () => {
    if (inputValue) {
      navigate('/checkout', {state: {cartItems, total: 125, email: inputValue, clientSecret: ''} });
    } else {
      alert('Please enter your email to proceed to checkout');
    }
  };

  return (

      <div className='cart'>
        <header className='header'>
        <div className='dropdown'>
          <button onClick={toggleDropdown} className='dropdown-toggle'>
            <img src={MenuIcon} alt='Menu' className='menu-icon' />
          </button>
          {isDropdownOpen && (
            <ul className='dropdown-menu'>
              <li><a href='/'>HOME</a></li>
              <li><a href='/Shop'>SHOP</a></li>
              <li><a href='/Contact'>CONTACT</a></li>
            </ul>
          )}
        </div>
        <a href='/' className='brand-link'>
        <div className='brand'>
        <h1 className='BigP'>P</h1>
        <h3 className='Subtitle'>istola</h3>
        </div>
        </a>
      <Link to='/Cart' className='cart-link'>CART</Link>
      </header>
      
      <main className='main-content'>

      <div className='checkout-prompt'>
      <p className='checkout-title'>CHECKOUT</p>
      <p className='email-prompt'>Enter your email to proceed to checkout</p>
      <form>
        <label>Email Address
          <input type='text' value={inputValue} onChange={handleInputChange} />
        </label>
      </form>

      <button className='checkout-button' onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
      
      <div className='shopping-bag'>
      <p className='shoppingbag-title'>SHOPPING BAG</p>
      </div>
      </div>

      <ul className='cart-items'>
      <hr className='bag-divider'></hr>
        {cartState.items.map((item) => (
          <li key={item.id} className='cart-item'>
          <img src={item.photoUrl}  alt={item.title} className='cart-item-photo' />
          <div>
            <div className='cart-item-details'>
              <div className='cart-item-title'>{item.title}</div>
              <div className='cart-item-size'>SIZE: {item.size}</div>
              <select value={item.size} onChange={(e) => handleSizeChange(item.id, e)} className='cart-size-menu'>
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL</option>
              </select>
              <div className='cart-item-price'>${item.price} CAD</div>
            </div>
          </div>
          </li>
        ))}
      <hr className='bag-divider'></hr>
      </ul>

      
      <div className='total'>
        <h4>Total: ${total.toFixed(2)} CAD</h4>
      </div>
      <div className='shipping-total'>
        <p>Shipping estimate: </p>
      </div>
      </main>
    </div>
  );
};

export default Cart;
