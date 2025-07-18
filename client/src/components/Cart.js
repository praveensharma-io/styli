import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Card, Button, Form, InputGroup, Alert, Badge } from 'react-bootstrap';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { useCartData, useCartActions } from '../context/CartContext';

const Cart = memo(() => {
  const { cart, loading, error } = useCartData();
  const { 
    updateCartItem, 
    removeCartItem, 
    applyCoupon, 
    removeCoupon, 
    setError 
  } = useCartActions();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [itemLoading, setItemLoading] = useState({}); // { [itemId]: true/false }

  // Update cart item quantity
  const handleQuantityUpdate = useCallback(async (itemId, quantity) => {
    setItemLoading(prev => ({ ...prev, [itemId]: true }));
    try {
      const result = await updateCartItem(itemId, quantity);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('An error occurred while updating the quantity');
    } finally {
      setItemLoading(prev => ({ ...prev, [itemId]: false }));
    }
  }, [updateCartItem, setError]);

  // Remove cart item
  const handleRemoveItem = useCallback(async (itemId) => {
    setItemLoading(prev => ({ ...prev, [itemId]: true }));
    try {
      const result = await removeCartItem(itemId);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setError('An error occurred while removing the item');
    } finally {
      setItemLoading(prev => ({ ...prev, [itemId]: false }));
    }
  }, [removeCartItem, setError]);

  // Handle coupon application
  const handleApplyCoupon = useCallback(async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    setCouponError('');
    setCouponSuccess('');
    try {
      const result = await applyCoupon(couponCode);
      if (result.success) {
        setCouponSuccess('Hurray! Coupon applied successfully');
        setCouponCode('');
      } else {
        setCouponError(result.error);
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      setCouponError('An error occurred while applying the coupon');
    }
  }, [couponCode, applyCoupon]);

  // Handle coupon removal
  const handleRemoveCoupon = useCallback(async (code) => {
    try {
      const result = await removeCoupon(code);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error removing coupon:', error);
      setError('An error occurred while removing the coupon');
    }
  }, [removeCoupon, setError]);

  // Format price as currency
  const formatCurrency = useCallback((amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  }, []);

  // Check if cart is empty
  const isCartEmpty = !cart || !cart.items || cart.items.length === 0;

  // Calculate totals
  const subtotal = cart?.subtotal || 0;
  const shippingFee = 12;
  const couponDiscount = 40.53;
  const grandTotal = subtotal + shippingFee - couponDiscount;
  const savings = couponDiscount;

  return (
    <main className="container py-5">
      {/* Only show global loading overlay for initial load or coupon actions */}
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {/* Error message */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <div className="row g-4">
          {/* Shopping Bag Section */}
          <div className="col-lg-8">
            <div className="shopping-bag-section">
              {/* Header */}
              <div className="d-flex align-items-center mb-4">
                <h2 className="mb-0 fw-bold text-dark">Shopping Bag</h2>
                <div className="ms-auto">
                  <Badge bg="primary" className="px-3 py-2 rounded-pill">
                    {cart?.items?.length || 0} items
                  </Badge>
                </div>
              </div>
              
              {/* Shipping Banner */}
              <div className="shipping-banner mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-truck me-3"></i>
                    <span className="fw-bold">Yay you got a free shipping!!</span>
                  </div>
                  <div className="delivery-info">
                    <span>Delivery to Dubai by Mon, 21st Jul</span>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="cart-items">
                {cart.items.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={handleQuantityUpdate}
                    onRemove={handleRemoveItem}
                    formatCurrency={formatCurrency}
                    loading={!!itemLoading[item._id]}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="col-lg-4">
            <div className="order-summary-section position-sticky" style={{ top: '2rem' }}>
              <h3 className="mb-4 fw-bold text-dark">Order Summary</h3>
              
              {/* Shukran Rewards */}
              <div className="shukran-rewards mb-4">
                <p className="mb-3 text-muted">Your order could earn you 23 Shukrans, Exclusive Offers And More</p>
                <div className="shukran-banner p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="shukran-logo me-3">
                        <span className="fw-bold">S</span>
                        <span className="text-warning ms-2">Shukran</span>
                      </div>
                      <div className="shukran-icons">
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-crown"></i>
                      </div>
                    </div>
                    <Button variant="outline-dark" size="sm" className="rounded-pill">
                      Join Now and Enjoy Benefits &gt;
                    </Button>
                  </div>
                </div>
              </div>

              {/* Coupon Application */}
              <div className="coupon-section mb-4">
                {couponSuccess && (
                  <div className="coupon-success">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-success fw-semibold">{couponSuccess}</span>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleRemoveCoupon('NEW50')}
                        disabled={loading}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="applied-coupon mt-3">
                      <Badge bg="success" className="me-2">NEW50</Badge>
                    </div>
                  </div>
                )}
                
                {!couponSuccess && (
                  <Form onSubmit={handleApplyCoupon} className="mb-3">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-0 shadow-sm"
                      />
                      <Button variant="outline-primary" type="submit" disabled={loading} className="border-0 shadow-sm">
                        Apply
                      </Button>
                    </InputGroup>
                    {couponError && <Form.Text className="text-danger">{couponError}</Form.Text>}
                  </Form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown mb-4">
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Sub Total</span>
                  <span className="fw-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping Fee</span>
                  <span>
                    <span className="text-decoration-line-through text-muted me-2">{formatCurrency(shippingFee)}</span>
                    <span className="text-success fw-semibold">Free</span>
                  </span>
                </div>
                {couponSuccess && (
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Coupon Code (NEW50)</span>
                    <span className="text-success fw-semibold">- {formatCurrency(couponDiscount)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong className="fs-5">Grand Total</strong>
                  <strong className="fs-5">{formatCurrency(grandTotal)}</strong>
                </div>
                
                {/* Savings Message */}
                <div className="savings-message p-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-shopping-bag me-2"></i>
                    <span className="text-success fw-semibold">
                      Congrats! You saved {formatCurrency(savings)} in this order
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="d-grid">
                <Button variant="dark" size="lg" className="checkout-btn">
                  <i className="fas fa-lock me-2"></i>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
});

export default Cart; 