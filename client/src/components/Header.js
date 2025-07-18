import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCartSummary } from '../context/CartContext';

const Header = memo(() => {
  const { cartSummary } = useCartSummary();
  
  // Debug: Log when Header re-renders
  console.log('Header re-rendered');

  return (
    <header className="bg-white border-bottom">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Logo */}
          <Link to="/" className="text-decoration-none">
            <div className="d-flex flex-column">
              <span className="text-dark fw-bold fs-4">styli</span>
              <span className="text-muted small">ستايلي</span>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="d-flex align-items-center">
            <nav className="me-4">
              <ul className="nav mb-0">
                <li className="nav-item">
                  <Link to="/women" className="nav-link text-dark px-3">WOMEN</Link>
                </li>
                <li className="nav-item">
                  <Link to="/men" className="nav-link text-dark px-3 bg-light">MEN</Link>
                </li>
                <li className="nav-item">
                  <Link to="/kids" className="nav-link text-dark px-3">KIDS</Link>
                </li>
                <li className="nav-item">
                  <Link to="/beauty" className="nav-link text-dark px-3">BEAUTY</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-dark px-3">HOME</Link>
                </li>
              </ul>
            </nav>

            {/* Search Bar */}
            <div className="search-container me-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="fas fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="What are you looking for?"
                  style={{ borderLeft: 'none' }}
                />
              </div>
            </div>

            {/* User Icons */}
            <div className="d-flex align-items-center">
              <Link to="/profile" className="text-dark me-3">
                <i className="fas fa-user"></i>
              </Link>
              <Link to="/wishlist" className="text-dark me-3">
                <i className="fas fa-heart"></i>
              </Link>
              <Link to="/cart" className="text-dark position-relative">
                <i className="fas fa-shopping-bag"></i>
                {cartSummary.itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {cartSummary.itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header; 