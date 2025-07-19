import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = ({ config, data }) => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Styli</h5>
            <p className="text-muted">
              Discover the latest fashion trends and shop your favorite styles.
            </p>
          </div>
          <div className="col-md-2">
            <h6>Shop</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to="/men" className="text-muted text-decoration-none">Men</Link></li>
              <li><Link to="/women" className="text-muted text-decoration-none">Women</Link></li>
              <li><Link to="/sale" className="text-muted text-decoration-none">Sale</Link></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Contact</a></li>
              <li><a href="#" className="text-muted text-decoration-none">FAQ</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Shipping</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Returns</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Newsletter</h6>
            <p className="text-muted">Subscribe to get updates on new arrivals and special offers.</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <button className="btn btn-primary" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-muted">&copy; 2024 Styli. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end">
              <a href="#" className="text-muted me-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-muted me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-muted me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-muted"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent; 