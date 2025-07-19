import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import StyliLogo from './StyliLogo';

const HeaderComponent = ({ config, data }) => {
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="navbar-top">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="navbar-brand">
            <StyliLogo width={70} height={40} className="d-block" />
          </Link>

          <div className="navbar-nav-main d-none d-lg-flex">
            <Link to="/women" className="nav-link">WOMEN</Link>
            <Link to="/men" className="nav-link">MEN</Link>
            <Link to="/kids" className="nav-link">KIDS</Link>
            <Link to="/beauty" className="nav-link">BEAUTY</Link>
            <Link to="/" className="nav-link">HOME</Link>
          </div>

          {/* Header Search Bar */}
          <div className={`header-search ${searchFocused ? 'focused' : ''}`}>
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search for products, brands, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="user-actions">
            <Link to="/profile" className="btn">
              <i className="fas fa-user"></i>
            </Link>
            <Link to="/wishlist" className="btn">
              <i className="fas fa-heart"></i>
            </Link>
            <Link to="/cart" className="btn cart-badge">
              <i className="fas fa-shopping-bag"></i>
              {itemCount > 0 && (
                <span className="badge">{itemCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent; 