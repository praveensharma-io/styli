import React, { memo } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = memo(({ product }) => {
  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(0)}`;
  };

  const renderPrice = () => {
    if (product.salePrice && product.salePrice < product.price) {
      const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
      return (
        <div className="d-flex align-items-center">
          <span className="fw-bold me-2">{formatCurrency(product.salePrice)}</span>
          <span className="text-muted text-decoration-line-through me-2">
            {formatCurrency(product.price)}
          </span>
          <span className="text-success small">{discount}% OFF</span>
        </div>
      );
    }
    return <span className="fw-bold">{formatCurrency(product.price)}</span>;
  };

  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <div className="product-card bg-white rounded shadow-sm">
        <div className="position-relative">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300x400'}
            alt={product.name}
            className="w-100"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          
          <div className="position-absolute top-0 end-0 m-2">
            <Badge bg="dark" className="px-2 py-1">First on Styli</Badge>
          </div>
          <div className="position-absolute bottom-0 end-0 m-2" style={{ zIndex: 10 }}>
            <button
              className="d-flex align-items-center justify-content-center rounded-circle border-0 shadow-sm"
              style={{
                width: '35px',
                height: '35px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                transition: 'background-color 0.3s ease'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <i className="fas fa-heart text-dark" style={{ fontSize: '1.1rem' }}></i>
            </button>
          </div>
        </div>
        
        <div className="p-3">
          <div className="mb-2">
            {renderPrice()}
          </div>
          
          <div className="mb-2">
            <h6 className="mb-0 text-dark" style={{ fontSize: '0.9rem' }}>
              {product.name}
            </h6>
          </div>
          
          {product.category === 'Summer Holiday Edit' && (
            <div className="mb-2">
              <Badge bg="primary" className="small">Summer Holiday Edit</Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
});

export default ProductCard; 