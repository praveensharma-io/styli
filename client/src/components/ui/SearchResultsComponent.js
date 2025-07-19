import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard';

const SearchResultsComponent = ({ config, data }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  
  const searchQuery = searchParams.get('q');
  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, currentPage]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/products/search', {
        params: {
          q: searchQuery,
          page: currentPage,
          limit: 12
        }
      });
      
      if (response.data.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to load search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to load search results');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page);
    window.history.pushState({}, '', `?${newSearchParams.toString()}`);
    window.location.reload();
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            Search Results for "{searchQuery}"
          </h2>
          
          {pagination.totalProducts > 0 ? (
            <>
              <p className="text-muted mb-4">
                Found {pagination.totalProducts} product{pagination.totalProducts !== 1 ? 's' : ''}
              </p>
              
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
                {products.map((product) => (
                  <div key={product._id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {pagination.totalPages > 1 && (
                <nav aria-label="Search results pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${!pagination.hasPrev ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrev}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${!pagination.hasNext ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNext}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p className="text-muted mb-4">
                We couldn't find any products matching "{searchQuery}"
              </p>
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsComponent; 