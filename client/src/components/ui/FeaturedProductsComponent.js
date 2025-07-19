import React from 'react';
import ProductCard from '../ProductCard';

const FeaturedProductsComponent = ({ config, data }) => {
  const {
    title = 'Featured Products'
  } = config;

  const { products = [] } = data;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">{title}</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {products.map((product) => (
          <div key={product.id || product._id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductsComponent; 