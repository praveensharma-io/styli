import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartComponent = ({ config, data }) => {
  const { cart, updateQuantity, removeItem, applyCoupon, removeCoupon, getAvailableCoupons, loading, error, clearError } = useCart();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [unavailableCoupons, setUnavailableCoupons] = useState([]);
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);
  const [showUnavailableCoupons, setShowUnavailableCoupons] = useState(false);

  useEffect(() => {
    if (cart.items.length > 0) {
      loadAvailableCoupons();
    }
  }, [cart.items]);

  const loadAvailableCoupons = async () => {
    const result = await getAvailableCoupons();
    if (result.success) {
      setAvailableCoupons(result.coupons);
      setUnavailableCoupons(result.unavailableCoupons);
    }
  };

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    clearError();
    const result = await applyCoupon(couponCode.trim());
    if (result.success) {
      setCouponCode('');
    }
  };

  const handleRemoveCoupon = async (code) => {
    clearError();
    await removeCoupon(code);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const getItemImage = (item) => {
    if (item.image) return item.image;
    if (item.images && item.images.length > 0) return item.images[0];
    return 'https://via.placeholder.com/100x100';
  };

  if (cart.items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Your cart is empty</h2>
          <p className="text-muted">Add some products to get started!</p>
          <a href="/" className="btn btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-4">Shopping Bag</h2>
          
          <div className="alert alert-success d-flex align-items-center mb-4">
            <i className="fas fa-truck me-2"></i>
            <span>Yay you got a free shipping!!</span>
          </div>

          <div className="mb-4">
            <p className="text-muted mb-0">
              <i className="fas fa-map-marker-alt me-2"></i>
              Delivery to Dubai by Mon, 21st Jul
            </p>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={clearError}></button>
            </div>
          )}

          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={getItemImage(item)}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: '100px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted small mb-2">
                      Size: {item.attributes?.size || 'M'}
                    </p>
                    
                    <div className="quantity-controls mb-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(item._id)}
                      >
                        Remove
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-md-3 text-end">
                    <div className="fw-bold h5 mb-0">
                      {formatCurrency((item.salePrice || item.price) * item.quantity)}
                    </div>
                    <small className="text-muted">20+ Sold</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="order-summary p-4">
            <h5 className="mb-4">Order Summary</h5>
            
            <div className="bg-light p-3 rounded mb-4">
              <div className="d-flex align-items-center mb-2">
                <span className="h4 mb-0 me-2">S</span>
                <span className="h5 mb-0">Shukran</span>
                <div className="ms-auto">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
              </div>
              <p className="text-muted small mb-2">
                Your order could earn you 159 Shukrans, Exclusive Offers And More
              </p>
              <button className="btn btn-outline-primary btn-sm w-100">
                Join Now and Enjoy Benefits &gt;
              </button>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Available Coupons</h6>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => setShowAvailableCoupons(!showAvailableCoupons)}
                >
                  {showAvailableCoupons ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showAvailableCoupons && availableCoupons.length > 0 && (
                <div className="mb-3">
                  {availableCoupons.map((coupon) => (
                    <div key={coupon.id} className="border rounded p-2 mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{coupon.code}</strong>
                          <small className="d-block text-muted">{coupon.description}</small>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setCouponCode(coupon.code);
                            handleApplyCoupon();
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAvailableCoupons && unavailableCoupons.length > 0 && (
                <div className="mb-3">
                  <h6 className="text-muted mb-2">Unavailable Coupons</h6>
                  {unavailableCoupons.map((coupon) => (
                    <div key={coupon.code} className="border rounded p-2 mb-2 bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong className="text-muted">{coupon.code}</strong>
                          <small className="d-block text-danger">{coupon.reason}</small>
                        </div>
                        <span className="badge bg-secondary">Used</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAvailableCoupons && availableCoupons.length === 0 && unavailableCoupons.length === 0 && (
                <div className="text-muted text-center py-3">
                  <small>No coupons available for your cart</small>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h6>Apply coupon/Voucher code</h6>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                >
                  Apply
                </button>
              </div>
            </div>

            {cart.appliedCoupons && cart.appliedCoupons.length > 0 && (
              <div className="mb-4">
                <h6>Applied Coupons</h6>
                {cart.appliedCoupons.map((coupon, index) => (
                  <div key={index} className="border rounded p-2 mb-2 bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{coupon.code}</strong>
                        <small className="d-block text-success">
                          -{formatCurrency(coupon.discountAmount)}
                        </small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveCoupon(coupon.code)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Sub Total:</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping Fee:</span>
                <span className="text-success">AED 12 Free</span>
              </div>
              
              {cart.totalDiscount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount:</span>
                  <span>-{formatCurrency(cart.totalDiscount)}</span>
                </div>
              )}
              
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Grand Total:</strong>
                <strong>{formatCurrency(cart.total)}</strong>
              </div>
            </div>

            <button className="btn btn-dark w-100 btn-lg" disabled={loading} onClick={handleProceedToCheckout}>
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent; 