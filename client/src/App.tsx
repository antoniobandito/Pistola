import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import Header from './components/common/Header';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';

const App: React.FC = () => {
  return (
    <CartProvider>
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
