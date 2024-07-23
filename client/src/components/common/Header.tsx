import React from 'react';
import { Link } from 'react-router-dom';
import '/Users/casha/Desktop/pistola/pistola/client/src/styles/Header.css'; // Update the path accordingly

const Header: React.FC = () => {
  return (
    <header className='check-header'>
      <a href='/shop' className='brand-link'>
      <div className='brand'>
        <h1 className='BigP'>P</h1>
        <h3 className='Subtitle'>istola</h3>
      </div>
      </a>
    </header>
  );
};

export default Header;
