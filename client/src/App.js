import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import DynamicLayout from './components/DynamicLayout';
import HeaderComponent from './components/ui/HeaderComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <HeaderComponent />
          <Routes>
            {/* Server-Driven UI Routes */}
            <Route path="/" element={<DynamicLayout pageType="home" pageId="home-main" />} />
            <Route path="/layout/:pageType/:pageId" element={<DynamicLayout />} />
            <Route path="/cart" element={<DynamicLayout pageType="cart" pageId="cart-main" />} />
            <Route path="/checkout" element={<DynamicLayout pageType="checkout" pageId="checkout-main" />} />
            <Route path="/order-confirmation" element={<DynamicLayout pageType="order-confirmation" pageId="order-confirmation-main" />} />
            <Route path="/product/:productId" element={<DynamicLayout pageType="product" pageId="product-detail" />} />
            <Route path="/search" element={<DynamicLayout pageType="search" pageId="search-results" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 