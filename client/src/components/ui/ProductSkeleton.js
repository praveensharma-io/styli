import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="card h-100 product-skeleton">
      <div className="skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-brand"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
};

const ProductSkeletonGrid = ({ count = 20 }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="col">
          <ProductSkeleton />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
export { ProductSkeletonGrid }; 