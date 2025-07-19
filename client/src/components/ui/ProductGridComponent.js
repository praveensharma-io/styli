import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProductCard from '../ProductCard';
import ProductSkeleton, { ProductSkeletonGrid } from './ProductSkeleton';

const ProductGridComponent = ({ config, data }) => {
  const {
    title = 'All Products',
    gridColumns = 4,
    showPagination = false
  } = config;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const observer = useRef();
  const lastProductRef = useRef();

  const limit = 20; // Products per page

  const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
    try {
      const isInitialLoad = pageNum === 1;
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      setError(null);
      
      const response = await fetch(`/api/products?page=${pageNum}&limit=${limit}`);
      const data = await response.json();
      
      if (data.success) {
        const newProducts = data.products;
        
        if (append) {
          setProducts(prev => [...prev, ...newProducts]);
        } else {
          setProducts(newProducts);
        }
        
        setHasMore(data.pagination.hasNext);
        setPage(pageNum);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  // Intersection Observer for infinite scroll
  const lastProductElementRef = useCallback(node => {
    if (loading || loadingMore) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchProducts(page + 1, true);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore, page, fetchProducts]);

  const formatCurrency = (amount) => {
    return `AED ${parseFloat(amount).toFixed(2)}`;
  };

  const getGridClass = () => {
    switch (gridColumns) {
      case 2: return 'row-cols-1 row-cols-md-2';
      case 3: return 'row-cols-1 row-cols-md-2 row-cols-lg-3';
      case 4: return 'row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4';
      case 5: return 'row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5';
      default: return 'row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4';
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">Discover our latest collection of premium fashion items</p>
        </div>
        <ProductSkeletonGrid count={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container py-5">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="text-center">
          <p className="text-muted">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">Discover our latest collection of premium fashion items</p>
      </div>
      
      <div className={`row ${getGridClass()} g-4`}>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          
          return (
            <div 
              key={product.id || product._id} 
              className="col"
              ref={isLast ? lastProductElementRef : null}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
      
      {/* Loading more indicator */}
      {loadingMore && (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading more products...</span>
          </div>
          <p className="mt-2 text-muted">Loading more products...</p>
        </div>
      )}
      
      {/* No more products indicator */}
      {!hasMore && products.length > 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No more products to load</p>
        </div>
      )}
    </div>
  );
};

export default ProductGridComponent; 