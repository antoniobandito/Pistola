import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '/Users/casha/Desktop/pistola/pistola/client/src/styles/Shop.css';
import { Carousel } from 'react-responsive-carousel';
import { useCart } from '../../contexts/CartContext';
import { title } from 'process';

const Shop: React.FC = () => {
  const [size, setSize] = useState('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  const { addToCart } = useCart();


  const handleAddToCart = (item: { id: string, title: string, price: number; photoUrl: string;}) => {
    if (!size) {
      alert('Please select a size');
      return;
    }
    addToCart({
      ...item, quantity: 1,
      size,
    });
    alert(`Succesfully added to cart!`)
  };

  const shopItem = {
    id:'1',
    title: 'Colt.45 Straight Leg Sweatpant',
    price: 125,
    photoUrl: '/static-assets/sweatpants1.jpeg',
  };
 
  return (
    <div className='shop'>
      <div className='header'>
        <div className='brand'>
        <h1 className='BigP'>P</h1>
        <h3 className='Subtitle'>istola</h3>
        </div>

      <div className='navigation-menu'>
        <Link to='/'>HOME</Link>
        <Link to='/Shop'>SHOP</Link>
        <Link to='/Contact'>CONTACT</Link>
      </div>

      <Link to='/Cart' className='cart-link'>CART</Link>
    </div>

    <div className='shop-grid'>
      <div className='grid-item'>
      <div className='carousel-container'>
      <Carousel 
      showThumbs={false} 
      autoPlay 
      infiniteLoop
      showArrows={false}
      showIndicators={true}
      showStatus={false}
      >
        <div>
          <img src='/static-assets/sweatpants1.jpeg' alt='sweat1' />
        </div>
        <div>
          <img src='../static-assets/sweatpants2.jpeg' alt='sweat2' />
        </div>
        <div>
          <img src='../static-assets/sweatpants3.jpeg' alt='sweat3' />
        </div>
      </Carousel>
      </div>
        <h4 className='item-title'>{shopItem.title}</h4>
        <p className='item-price'>{shopItem.price}</p>

        <div className='size-selection'>
            <select id='size' value={size} onChange={handleSizeChange}>
              <option value='' disabled>Select size</option>
              <option value='S'>Small</option>
              <option value='M'>Medium</option>
              <option value='L'>Large</option>
              <option value='XL'>X-Large</option>
            </select>
          </div>

          <button 
          className='add-to-cart-button' 
          onClick={() => handleAddToCart(shopItem)} 
          >
            Add to Cart
          </button>
        </div>
        <p className='item-description-title'>ITEM INFO</p>
        <p className='item-description'>
        High quality, medium-weight cotton straight leg sweatpant.
        </p>
        <p className='item-bullets'>
        • Elasticated waistband <br />
        • Drawstring <br />
        • Inseam pockets <br />
        </p>
        <p className='item-material'>
        100% organic Combed and Ringspun cotton sourced from United 
        States.<br /> 350 GSM Fleece inside lining.
        Dyed and Knitted in Ontario, Canada
        </p>
        
      </div>
    </div>
  );
  }

export default Shop;
