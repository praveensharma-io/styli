import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmationComponent = ({ config, data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  // Get order data from navigation state or use defaults
  const orderData = location.state || {};
  const [orderNumber] = useState(orderData.orderNumber || `ORD-${Date.now().toString().slice(-8)}`);
  const [orderTotal] = useState(orderData.total || 0);
  const [estimatedDelivery] = useState(orderData.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="order-confirmation-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="confirmation-card">
              <div className="success-animation">
                <div className="success-icon">
                  <i className="fas fa-check"></i>
                </div>
              </div>
              
              <h1 className="text-center mb-4">Order Confirmed!</h1>
              <p className="text-center text-muted mb-5">
                Thank you for your purchase. Your order has been successfully placed.
              </p>

              <div className="order-details">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-card">
                      <h5><i className="fas fa-receipt me-2"></i>Order Number</h5>
                      <p className="order-number">{orderNumber}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="detail-card">
                      <h5><i className="fas fa-calendar me-2"></i>Order Date</h5>
                      <p>{new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="detail-card">
                      <h5><i className="fas fa-truck me-2"></i>Estimated Delivery</h5>
                      <p>{formatDate(estimatedDelivery)}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="detail-card">
                      <h5><i className="fas fa-credit-card me-2"></i>Order Total</h5>
                      <p className="order-total">{formatCurrency(orderTotal)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="next-steps mt-5">
                <h4 className="mb-4">What's Next?</h4>
                <div className="steps-timeline">
                  <div className="step-item">
                    <div className="step-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="step-content">
                      <h6>Order Confirmation Email</h6>
                      <p>You'll receive a confirmation email with your order details within the next few minutes.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-icon">
                      <i className="fas fa-box"></i>
                    </div>
                    <div className="step-content">
                      <h6>Order Processing</h6>
                      <p>We'll start processing your order and prepare it for shipping.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-icon">
                      <i className="fas fa-shipping-fast"></i>
                    </div>
                    <div className="step-content">
                      <h6>Shipping & Tracking</h6>
                      <p>You'll receive tracking information once your order ships.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className="step-content">
                      <h6>Delivery</h6>
                      <p>Your order will be delivered to your doorstep on the estimated date.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-buttons mt-5">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <button 
                      className="btn btn-outline-primary w-100"
                      onClick={() => navigate('/')}
                    >
                      <i className="fas fa-shopping-bag me-2"></i>
                      Continue Shopping
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => window.print()}
                    >
                      <i className="fas fa-print me-2"></i>
                      Print Receipt
                    </button>
                  </div>
                </div>
              </div>

              <div className="auto-redirect mt-4">
                <p className="text-center text-muted">
                  Redirecting to homepage in <strong>{countdown}</strong> seconds...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationComponent; 