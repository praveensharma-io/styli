import React from 'react';
import { Link } from 'react-router-dom';

const BannerComponent = ({ config, data }) => {
  const {
    title = 'Special Offer',
    message = 'Get 50% off on selected items',
    backgroundColor = '#ff6b6b',
    textColor = '#ffffff',
    image,
    link = '/products',
    showTimer = false,
    endDate
  } = config;

  return (
    <div 
      className="banner-section py-4"
      style={{ 
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="mb-2">{title}</h3>
            <p className="mb-3">{message}</p>
            {link && (
              <Link to={link} className="btn btn-light">
                Shop Now
              </Link>
            )}
          </div>
          {image && (
            <div className="col-md-4">
              <img 
                src={image} 
                alt={title}
                className="img-fluid rounded"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerComponent; 