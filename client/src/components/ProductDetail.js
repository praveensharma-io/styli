import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Badge, Alert } from 'react-bootstrap';
import { useCartActions } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartActions();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  const handleQuantityChange = (operation) => {
    if (operation === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (operation === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size.name);
    setSizeError('');
  };

  const handleAddToCart = async () => {
    setSizeError('');
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError('Please select a size');
      return;
    }
    setAddingToCart(true);
    try {
      const result = await addToCart(product._id, quantity, selectedSize);
      if (result.success) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error || 'Product not found'}</Alert>
      </div>
    );
  }

  const renderPrice = () => {
    if (product.salePrice && product.salePrice < product.price) {
      const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
      return (
        <div className="d-flex align-items-center mb-3">
          <span className="fw-bold fs-3 me-3">{formatCurrency(product.salePrice)}</span>
          <span className="text-muted text-decoration-line-through me-3">
            {formatCurrency(product.price)}
          </span>
          <Badge bg="danger" className="fs-6">{discount}% OFF</Badge>
        </div>
      );
    }
    return (
      <div className="fw-bold fs-3 mb-3">{formatCurrency(product.price)}</div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="product-images">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/600x800'}
              alt={product.name}
              className="w-100 rounded-3"
              style={{ height: '600px', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="product-detail-card p-4">
            <h1 className="mb-3 fw-bold">{product.name}</h1>
            
            {renderPrice()}
            
            <div className="delivery-info mb-4">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-truck me-2 text-success"></i>
                <span className="fw-semibold">Free delivery on orders above AED 200</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-undo me-2 text-primary"></i>
                <span className="text-muted">30 days return policy</span>
              </div>
            </div>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold">Pick your size</span>
                  <a href="/size-guide" className="text-decoration-none small">
                    Size Guide <i className="fas fa-chevron-down ms-1"></i>
                  </a>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <div key={size.name} className="size-option-container">
                      <Button
                        variant={selectedSize === size.name ? 'dark' : size.stock === 0 ? 'light' : 'outline-dark'}
                        size="sm"
                        disabled={size.stock === 0}
                        onClick={() => handleSizeSelect(size)}
                        className={`size-button ${size.stock === 0 ? 'disabled-size' : ''}`}
                        style={{
                          minWidth: '60px',
                          height: '50px',
                          borderRadius: '8px',
                          border: size.stock === 0 ? '1px solid #e5e7eb' : '1px solid #000',
                          backgroundColor: size.stock === 0 ? '#f9fafb' : selectedSize === size.name ? '#000' : '#fff',
                          color: size.stock === 0 ? '#9ca3af' : selectedSize === size.name ? '#fff' : '#000',
                          opacity: size.stock === 0 ? 0.5 : 1
                        }}
                      >
                        <div className="fw-bold">{size.name}</div>
                        {size.stock > 0 && size.stock <= 5 && (
                          <div className="small text-danger fw-semibold">{size.stock} left</div>
                        )}
                        {size.stock === 0 && (
                          <div className="small text-muted">Not available</div>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                {sizeError && (
                  <div className="text-danger small mt-2">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {sizeError}
                  </div>
                )}
              </div>
            )}
            
            <div className="quantity-section mb-4">
              <div className="d-flex align-items-center">
                <span className="fw-bold me-3">Quantity:</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </Button>
                <span className="mx-3 fw-bold">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange('increase')}
                  className="quantity-btn"
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="add-to-bag-section mb-4">
              <Button
                variant="dark"
                size="lg"
                className="w-100 add-to-bag-btn"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Adding to Bag...
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-bag me-2"></i>
                    Add to Bag
                  </>
                )}
              </Button>
            </div>
            
            <div className="coupon-section mb-4">
              <Button variant="outline-primary" className="w-100 coupon-button">
                <i className="fas fa-tag me-2"></i>
                Have a coupon? Apply here
              </Button>
            </div>
            
            <div className="product-info-section">
              <h5 className="fw-bold mb-3">Product Information</h5>
              <p className="text-muted mb-3">{product.description}</p>
              
              {product.category && (
                <div className="mb-2">
                  <strong>Category:</strong> {product.category}
                </div>
              )}
              
              {product.brand && (
                <div className="mb-2">
                  <strong>Brand:</strong> {product.brand}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 