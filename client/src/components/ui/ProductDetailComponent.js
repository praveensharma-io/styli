import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const ProductDetailComponent = ({ config, data }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, loading, error, clearError } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setPageLoading(true);
        const response = await axios.get(`/api/products/${productId}`);
        
        if (response.data.success) {
          setProduct(response.data.product);
          // Set default color if available
          if (response.data.product.colors?.length > 0) {
            setSelectedColor(response.data.product.colors[0].name);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setPageLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Update image when color changes
  useEffect(() => {
    if (product) {
      setImageLoading(true);
      const newImage = getProductImage();
      setCurrentImage(newImage);
      
      // Simulate image loading for smooth transition
      const img = new Image();
      img.onload = () => {
        setImageLoading(false);
      };
      img.src = newImage;
    }
  }, [selectedColor, product]);

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  // Convert color names to hex values for swatches
  const getColorValue = (colorName) => {
    const colorMap = {
      'Black': '#000000',
      'White': '#FFFFFF',
      'Navy Blue': '#000080',
      'Forest Green': '#228B22',
      'Space Gray': '#4A4A4A',
      'Rose Gold': '#B76E79',
      'Cognac Brown': '#8B4513',
      'Purple': '#800080',
      'Teal': '#008080',
      'Earth Tones': '#8B4513',
      'Ocean Blue': '#006994',
      'Spa Collection': '#F5F5DC',
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Green': '#008000',
      'Yellow': '#FFFF00',
      'Orange': '#FFA500',
      'Pink': '#FFC0CB',
      'Gray': '#808080',
      'Brown': '#A52A2A',
      'Heather Gray': '#696969',
      'Navy': '#000080',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Bronze': '#CD7F32',
      'Copper': '#B87333',
      'Platinum': '#E5E4E2',
      'Titanium': '#C0C0C0',
      'Carbon': '#2F2F2F',
      'Steel': '#4682B4',
      'Aluminum': '#A9A9A9'
    };
    return colorMap[colorName] || '#CCCCCC';
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    clearError();
    const result = await addToCart(product._id, quantity, selectedSize);
    
    if (result.success) {
      setIsInCart(true);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  // Handle different image field formats and color-specific images
  const getProductImage = () => {
    // If a color is selected and it has a specific image, use that
    if (selectedColor && product?.colors) {
      const selectedColorData = product.colors.find(color => color.name === selectedColor);
      if (selectedColorData?.image) {
        return selectedColorData.image;
      }
    }
    
    // Fallback to main product images
    if (product?.image) return product.image;
    if (product?.images && product.images.length > 0) return product.images[0];
    return 'https://via.placeholder.com/500x600';
  };

  if (pageLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          <div className="product-images position-relative">
            {imageLoading && (
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light rounded">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <img
              src={currentImage || getProductImage()}
              alt={product.name}
              className="img-fluid rounded"
              style={{ 
                width: '100%', 
                height: '500px', 
                objectFit: 'cover',
                transition: 'opacity 0.3s ease-in-out',
                opacity: imageLoading ? 0.6 : 1
              }}
              onLoad={() => {
                setImageLoading(false);
                setCurrentImage(currentImage || getProductImage());
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <div className="product-info">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted mb-3">{product.brand}</p>
            
            {/* Price */}
            <div className="mb-4">
              {product.salePrice && product.salePrice < product.price ? (
                <div>
                  <span className="h3 fw-bold text-danger me-3">
                    {formatCurrency(product.salePrice)}
                  </span>
                  <span className="h5 text-muted text-decoration-line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="badge bg-danger ms-2">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="h3 fw-bold">{formatCurrency(product.price)}</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <h6>Description</h6>
              <p className="text-muted">{product.description}</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <h6>Color</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`btn ${selectedColor === color.name ? 'btn-dark' : 'btn-outline-secondary'}`}
                      onClick={() => setSelectedColor(color.name)}
                      style={{
                        minWidth: '60px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div 
                        className="color-swatch"
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: getColorValue(color.name),
                          border: '2px solid #fff',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                          marginRight: '8px',
                          display: 'inline-block'
                        }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <h6>Size</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      className={`btn btn-outline-secondary ${selectedSize === size.name ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size.name)}
                      disabled={size.stock === 0}
                    >
                      {size.name} {size.stock === 0 && '(Out of Stock)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-4">
              <h6>Quantity</h6>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="mb-4">
              {isInCart ? (
                <button
                  className="btn btn-success btn-lg w-100"
                  onClick={handleGoToCart}
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  className="btn btn-dark btn-lg w-100"
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              )}
            </div>

            {/* Product Details */}
            <div className="border-top pt-4">
              <h6>Product Details</h6>
              <ul className="list-unstyled text-muted">
                <li>Category: {product.category}</li>
                <li>Stock: {product.stock} available</li>
                {product.deliveryDate && (
                  <li>Delivery: {product.deliveryDate}</li>
                )}
                {product.location && (
                  <li>Location: {product.location}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent; 