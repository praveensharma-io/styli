import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutComponent = ({ config, data }) => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'UAE',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    saveInfo: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    try {
      // Prepare order data
      const orderData = {
        userId: '60d21b4667d0d8992e610c85',
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        appliedCoupons: cart.appliedCoupons ? cart.appliedCoupons.map(coupon => coupon.code) : []
      };

      // Create order
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        // Clear the cart after successful order creation
        clearCart();
        
        // Navigate to order confirmation
        navigate('/order-confirmation', { 
          state: { 
            orderNumber: result.order.orderNumber,
            total: result.order.total,
            estimatedDelivery: result.order.estimatedDelivery
          }
        });
      } else {
        // Show error message
        alert(result.message || 'Failed to create order');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
      setLoading(false);
    }
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
          <p className="text-muted">Add some products to checkout!</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Progress Bar */}
            <div className="checkout-progress mb-5">
              <div className="progress-steps">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-label">Shipping</div>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-label">Payment</div>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-label">Review</div>
                </div>
              </div>
            </div>

            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="checkout-step">
                <h3 className="mb-4">Shipping Information</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Address *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Country</label>
                    <select
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="UAE">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Qatar">Qatar</option>
                    </select>
                  </div>
                </div>
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    Save this information for next time
                  </label>
                </div>
                <button className="btn btn-primary btn-lg" onClick={handleNextStep}>
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="checkout-step">
                <h3 className="mb-4">Payment Information</h3>
                <div className="mb-4">
                  <div className="form-check mb-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">
                      <i className="fas fa-credit-card me-2"></i>
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">
                      <i className="fab fa-paypal me-2"></i>
                      PayPal
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">
                      <i className="fas fa-money-bill-wave me-2"></i>
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Card Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Expiry Date *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CVC *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex gap-3">
                  <button className="btn btn-outline-secondary" onClick={handlePrevStep}>
                    Back to Shipping
                  </button>
                  <button className="btn btn-primary btn-lg" onClick={handleNextStep}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="checkout-step">
                <h3 className="mb-4">Review Your Order</h3>
                
                <div className="shipping-review mb-4">
                  <h5>Shipping Information</h5>
                  <div className="bg-light p-3 rounded">
                    <p className="mb-1">
                      <strong>{formData.firstName} {formData.lastName}</strong>
                    </p>
                    <p className="mb-1">{formData.address}</p>
                    <p className="mb-1">{formData.city}, {formData.country}</p>
                    <p className="mb-0">{formData.email} | {formData.phone}</p>
                  </div>
                </div>

                <div className="payment-review mb-4">
                  <h5>Payment Method</h5>
                  <div className="bg-light p-3 rounded">
                    <p className="mb-0">
                      <i className={`fas ${formData.paymentMethod === 'card' ? 'fa-credit-card' : 
                        formData.paymentMethod === 'paypal' ? 'fab fa-paypal' : 'fa-money-bill-wave'} me-2`}></i>
                      {formData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                       formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <button className="btn btn-outline-secondary" onClick={handlePrevStep}>
                    Back to Payment
                  </button>
                  <button 
                    className="btn btn-success btn-lg" 
                    onClick={handleSubmitOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="order-summary-checkout">
              <h5 className="mb-4">Order Summary</h5>
              
              <div className="order-items mb-4">
                {cart.items.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="d-flex align-items-center">
                      <img
                        src={getItemImage(item)}
                        alt={item.name}
                        className="order-item-image"
                      />
                      <div className="order-item-details">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-muted small mb-1">
                          Size: {item.attributes?.size || 'M'} | Qty: {item.quantity}
                        </p>
                        <span className="fw-bold">
                          {formatCurrency((item.salePrice || item.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                
                {cart.totalDiscount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount:</span>
                    <span>-{formatCurrency(cart.totalDiscount)}</span>
                  </div>
                )}
                
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>{formatCurrency(cart.total)}</strong>
                </div>
              </div>

              <div className="delivery-info">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-truck text-success me-2"></i>
                  <span>Free Delivery</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-clock text-primary me-2"></i>
                  <span>Estimated delivery: Mon, 21st Jul</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent; 