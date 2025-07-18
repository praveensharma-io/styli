import React, { useState, useEffect, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Badge, 
  Form,
  Alert,
  Spinner
} from 'react-bootstrap';
import { useCartActions } from '../context/CartContext';
import axios from 'axios';

const ProductDetail = memo(() => {
  const { productId } = useParams();
  const { addToCart } = useCartActions();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState('');

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${productId}`);
        
        if (response.data && response.data.success) {
          const productData = response.data.product;
          setProduct(productData);
          
          // Set default selected color if colors exist
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0].name);
          }
        } else {
          setError('Failed to load product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  const handleAddToCart = async () => {
    // Clear previous error
    setSizeError('');
    
    // Check if size selection is required and not selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError('Please select a size');
      return;
    }
    
    setAddingToCart(true);
    try {
      const result = await addToCart(product._id, quantity, selectedSize);
      if (result.success) {
        console.log('Product added to cart successfully!');
      } else {
        console.error('Error adding to cart:', result.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
    // Update product price based on color
    const colorVariant = product.colors.find(c => c.name === color.name);
    if (colorVariant) {
      setProduct({
        ...product,
        price: colorVariant.price,
        salePrice: colorVariant.salePrice || Math.round(colorVariant.price * 0.5) // 50% off
      });
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size.name);
    setSizeError(''); // Clear error when size is selected
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('NEW50');
    alert('Coupon code copied!');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || 'Product not found'}
        </Alert>
      </Container>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100) : 0;
  const installmentAmount = product.salePrice ? (product.salePrice / 4).toFixed(2) : 0;
  const savings = product.originalPrice ? (product.originalPrice - product.salePrice) : 0;

  return (
    <div className="bg-light min-vh-100">
      {/* Breadcrumbs */}
      <div className="bg-white border-bottom">
        <Container className="py-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/men" className="text-decoration-none">Men</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/men/shorts" className="text-decoration-none">Shorts</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          {/* Product Images */}
          <Col lg={8} className="mb-4">
            <div className="bg-white rounded shadow-sm p-4">
              <div className="row">
                <Col md={6}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="img-fluid rounded"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={6}>
                  <img
                    src={product.images[1]}
                    alt={product.name}
                    className="img-fluid rounded"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                </Col>
              </div>
            </div>
          </Col>

          {/* Product Details */}
          <Col lg={4}>
            <div className="bg-white rounded shadow-sm p-4 product-detail-card">
              {/* Bestseller Badge */}
              {product.isBestseller && (
                <Badge bg="dark" className="mb-3">Bestseller</Badge>
              )}

              {/* Brand and Product Name */}
              <h4 className="fw-bold mb-1">{product.brand}</h4>
              <h5 className="text-muted mb-3">{product.name}</h5>

              {/* Price Section - Exact Design */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-success fw-bold fs-5">Buy it for {formatCurrency(product.salePrice)}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted text-decoration-line-through">{formatCurrency(product.originalPrice)}</span>
                  <span className="text-success fw-semibold">Save {formatCurrency(savings)}</span>
                </div>
                <div className="text-muted small mb-3">Get extra 50% off* your first order</div>
                
                {/* Coupon Code */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={copyCouponCode}
                    className="coupon-button border-dashed"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <div className="fw-bold">NEW50</div>
                    <div className="small text-muted">Tap to copy</div>
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Delivery by {product.deliveryDate}</span>
                  <span className="text-decoration-underline">{product.location} <i className="fas fa-chevron-down ms-1"></i></span>
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">Selected Color: {selectedColor}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color.name}
                        className={`border rounded p-2 color-option ${selectedColor === color.name ? 'selected' : 'border-light'}`}
                        onClick={() => handleColorSelect(color)}
                      >
                        <img
                          src={color.image}
                          alt={color.name}
                          className="rounded"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <div className="text-center mt-1">
                          <small className="fw-bold">{color.name}</small>
                          <br />
                          <small className="text-muted">{formatCurrency(color.price)}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection - Exact Design */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bold">Pick your size</span>
                    <Link to="/size-guide" className="text-decoration-none small">
                      Size Guide <i className="fas fa-chevron-down ms-1"></i>
                    </Link>
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
                  
                  {/* Size Error Message */}
                  {sizeError && (
                    <div className="text-danger small mt-2">
                      <i className="fas fa-exclamation-circle me-1"></i>
                      {sizeError}
                    </div>
                  )}
                </div>
              )}

              {/* Add to Bag Button */}
              <div className="d-flex gap-3 mb-4">
                <Button
                  variant="dark"
                  size="lg"
                  className="flex-grow-1 add-to-bag-btn"
                  onClick={handleAddToCart}
                  disabled={addingToCart || (product.sizes && product.sizes.length > 0 && !selectedSize)}
                  style={{
                    height: '50px',
                    borderRadius: '8px',
                    backgroundColor: '#000',
                    border: 'none',
                    fontWeight: '600'
                  }}
                >
                  {addingToCart ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Adding...
                    </>
                  ) : (
                    'Add to Bag'
                  )}
                </Button>
                <Button 
                  variant="outline-dark" 
                  size="lg"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    border: '1px solid #000',
                    backgroundColor: '#fff'
                  }}
                >
                  <i className="fas fa-heart"></i>
                </Button>
              </div>

              {/* Product Information */}
              <div className="border-top pt-3">
                <h6 className="fw-bold mb-3">Product Information</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-2">
                      <span className="text-muted small">Product Code:</span>
                      <div className="fw-semibold small">7022252428</div>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted small">Brand Name:</span>
                      <div className="fw-semibold small">{product.brand}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2">
                      <span className="text-muted small">Shape:</span>
                      <div className="fw-semibold small">A-Line</div>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted small">Pattern Type:</span>
                      <div className="fw-semibold small">Plain</div>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted small">Length:</span>
                      <div className="fw-semibold small">Midi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default ProductDetail; 