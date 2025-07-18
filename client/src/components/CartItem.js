import React, { useState, useEffect } from 'react';
import { Button, Spinner, Badge, Dropdown } from 'react-bootstrap';
import { useCartActions } from '../context/CartContext';

const CartItem = React.memo(({ item, onUpdateQuantity, onRemove, formatCurrency, loading }) => {
  const { updateCartItemAttributes } = useCartActions();
  const price = item.salePrice || item.price;
  const itemTotal = price * item.quantity;
  const couponDiscount = item.quantity === 2 ? 3.90 : 36.63;
  
  const selectedSize = item.attributes?.size || 'L';
  const [currentSize, setCurrentSize] = useState(selectedSize);
  const [sizeLoading, setSizeLoading] = useState(false);

  useEffect(() => {
    const newSize = item.attributes?.size || 'L';
    if (newSize !== currentSize) {
      setCurrentSize(newSize);
    }
  }, [item.attributes?.size, currentSize]);

  const stockLevel = item.name.includes('Dress') ? (currentSize === '24' ? 2 : 1) : 120;
  const isLowStock = stockLevel <= 5;

  const handleQuantityChange = (operation) => {
    let newQuantity = item.quantity;
    if (operation === 'increase') {
      newQuantity += 1;
    } else if (operation === 'decrease' && item.quantity > 1) {
      newQuantity -= 1;
    }
    onUpdateQuantity(item._id, newQuantity);
  };

  const handleSizeChange = async (newSize) => {
    if (newSize === currentSize) return;
    
    setSizeLoading(true);
    try {
      const result = await updateCartItemAttributes(item._id, { size: newSize });
      if (result.success) {
        setCurrentSize(newSize);
      }
    } catch (error) {
      console.error('Error updating size:', error);
    } finally {
      setSizeLoading(false);
    }
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="cart-item mb-4 p-4">
      <div className="row align-items-start">
        <div className="col-md-3 col-lg-2">
          <div className="position-relative">
            <img
              src={item.image || 'https://via.placeholder.com/150x200'}
              alt={item.name}
              className="w-100 rounded-3"
              style={{ height: '180px', objectFit: 'cover' }}
            />
            {isLowStock && (
              <div className="position-absolute bottom-0 start-0 m-2">
                <Badge bg="danger" className="px-2 py-1">
                  {stockLevel} LEFT
                </Badge>
              </div>
            )}
            <button
              className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
              style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
            >
              <i className="fas fa-heart text-muted"></i>
            </button>
          </div>
        </div>
        
        <div className="col-md-9 col-lg-10">
          <div className="row">
            <div className="col-lg-8">
              <h6 className="mb-3 fw-bold text-dark" style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                {item.name}
              </h6>
              
              <div className="row align-items-center mb-3">
                <div className="col-md-6 mb-2 mb-md-0">
                  <Dropdown>
                    <Dropdown.Toggle 
                      variant="outline-secondary" 
                      size="sm"
                      disabled={sizeLoading}
                      className="size-dropdown"
                    >
                      {sizeLoading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        <>
                          Size: {currentSize} <i className="fas fa-chevron-down ms-1"></i>
                        </>
                      )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {availableSizes.map((size) => (
                        <Dropdown.Item 
                          key={size}
                          onClick={() => handleSizeChange(size)}
                          className={currentSize === size ? 'active' : ''}
                        >
                          Size: {size}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <span className="text-muted me-3 small">Qty:</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={item.quantity <= 1 || loading}
                      className="quantity-btn"
                    >
                      {loading ? <Spinner size="sm" animation="border" /> : '-'}
                    </Button>
                    <span className="mx-3 fw-bold">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange('increase')}
                      disabled={loading}
                      className="quantity-btn"
                    >
                      {loading ? <Spinner size="sm" animation="border" /> : '+'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                {isLowStock ? (
                  <Badge bg="danger" className="me-3 mb-2 stock-badge">
                    Only {stockLevel} left
                  </Badge>
                ) : (
                  <Badge bg="dark" className="me-3 mb-2 sold-badge">
                    {stockLevel}+ Sold
                  </Badge>
                )}
                <div className="text-success small fw-semibold">
                  Coupon discount: {formatCurrency(couponDiscount)}
                </div>
              </div>
              
              <div className="d-flex gap-3">
                <Button
                  variant="link"
                  className="text-danger p-0 text-decoration-none action-btn"
                  onClick={() => onRemove(item._id)}
                  disabled={loading}
                >
                  <i className="fas fa-trash me-1"></i>
                  {loading ? <Spinner size="sm" animation="border" /> : 'Remove'}
                </Button>
                <Button
                  variant="link"
                  className="text-muted p-0 text-decoration-none action-btn"
                >
                  <i className="fas fa-heart me-1"></i>
                  Move to Wishlist
                </Button>
              </div>
            </div>
            
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <div className="fw-bold fs-4 text-dark mb-1">{formatCurrency(itemTotal)}</div>
              {item.salePrice && item.salePrice < item.price && (
                <div className="text-muted small text-decoration-line-through">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem; 