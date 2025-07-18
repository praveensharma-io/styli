import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  InputGroup,
  Spinner,
  Alert,
  Pagination,
  Badge,
  Dropdown
} from 'react-bootstrap';
import ProductCard from './ProductCard';

const Home = memo(() => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 1263, // Set to match the design
    hasNext: false,
    hasPrev: false
  });

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch products when search or category changes
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, pagination.currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await axios.get(`/api/products?${params}`);
      
      if (response.data && response.data.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('An error occurred while loading products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/categories');
      if (response.data && response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  if (loading && products.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading products...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Secondary Navigation */}
      <div className="bg-white border-bottom">
        <div className="container-fluid px-4">
          <div className="d-flex overflow-auto py-2 secondary-nav">
            <Link to="/clothing" className="text-decoration-none text-dark me-4">Clothing</Link>
            <Link to="/summer-holiday" className="text-decoration-none text-dark me-4">Summer Holiday Edit ✨</Link>
            <Link to="/sale" className="text-decoration-none text-dark me-4">Sale 🔥</Link>
            <Link to="/new-arrivals" className="text-decoration-none text-dark me-4">New Arrivals ✨</Link>
            <Link to="/brands" className="text-decoration-none text-dark me-4">Brands</Link>
            <Link to="/footwear" className="text-decoration-none text-dark me-4">Footwear</Link>
            <Link to="/topwear" className="text-decoration-none text-dark me-4">Topwear</Link>
            <Link to="/bottomwear" className="text-decoration-none text-dark me-4">Bottomwear</Link>
            <Link to="/denimwear" className="text-decoration-none text-dark me-4">Denimwear 👖</Link>
            <Link to="/grooming" className="text-decoration-none text-dark me-4">Grooming</Link>
            <Link to="/accessories" className="text-decoration-none text-dark me-4">Accessories</Link>
            <Link to="/sportswear" className="text-decoration-none text-dark me-4">Sportswear</Link>
            <Link to="/underwear" className="text-decoration-none text-dark me-4">Underwear & Nightwear</Link>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4">
        {/* Filter Section */}
        <div className="bg-white p-4 mb-4 rounded shadow-sm">
          <div className="row g-3 mb-3">
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Categories</Dropdown.Item>
                  <Dropdown.Item>Clothing</Dropdown.Item>
                  <Dropdown.Item>Footwear</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Brand
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Brands</Dropdown.Item>
                  <Dropdown.Item>FAV</Dropdown.Item>
                  <Dropdown.Item>Mascln Sassafras</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Color
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Colors</Dropdown.Item>
                  <Dropdown.Item>Beige</Dropdown.Item>
                  <Dropdown.Item>Brown</Dropdown.Item>
                  <Dropdown.Item>Pink</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Fabric
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Fabrics</Dropdown.Item>
                  <Dropdown.Item>Cotton</Dropdown.Item>
                  <Dropdown.Item>Polyester</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Discount
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All</Dropdown.Item>
                  <Dropdown.Item>10%+ Off</Dropdown.Item>
                  <Dropdown.Item>20%+ Off</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          
          <div className="row g-3 mb-3">
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Price
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Prices</Dropdown.Item>
                  <Dropdown.Item>Under AED 50</Dropdown.Item>
                  <Dropdown.Item>AED 50-100</Dropdown.Item>
                  <Dropdown.Item>Over AED 100</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Size
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Sizes</Dropdown.Item>
                  <Dropdown.Item>S</Dropdown.Item>
                  <Dropdown.Item>M</Dropdown.Item>
                  <Dropdown.Item>L</Dropdown.Item>
                  <Dropdown.Item>XL</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Strap Style
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Styles</Dropdown.Item>
                  <Dropdown.Item>Regular</Dropdown.Item>
                  <Dropdown.Item>Oversized</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Multipack
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All</Dropdown.Item>
                  <Dropdown.Item>Single</Dropdown.Item>
                  <Dropdown.Item>Multi-pack</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                  Length
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Lengths</Dropdown.Item>
                  <Dropdown.Item>Short</Dropdown.Item>
                  <Dropdown.Item>Regular</Dropdown.Item>
                  <Dropdown.Item>Long</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="dark" className="d-flex align-items-center">
              <i className="fas fa-filter me-2"></i>
              ALL FILTERS
            </Button>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">{pagination.totalProducts} ITEMS FOUND</span>
              <div className="d-flex align-items-center">
                <span className="text-muted me-2">Sort By:</span>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                    Popularity
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Popularity</Dropdown.Item>
                    <Dropdown.Item>Price: Low to High</Dropdown.Item>
                    <Dropdown.Item>Price: High to Low</Dropdown.Item>
                    <Dropdown.Item>Newest First</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <Row>
            {products.map(product => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <h4>No products found</h4>
            <p className="text-muted">
              Try adjusting your search terms or category filter
            </p>
            <Button 
              variant="outline-primary" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Home; 