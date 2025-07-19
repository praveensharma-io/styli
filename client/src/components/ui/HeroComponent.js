import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroComponent = ({ config, data }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({
    white: true,
    gray: true,
    black: true,
    shoes: true
  });
  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/products/categories');
        const data = await response.json();
        
        if (data.success) {
          // Map categories to icons and create category objects
          const categoryIcons = {
            'T-Shirt': 'fas fa-tshirt',
            'Jacket': 'fas fa-user-tie',
            'Shirt': 'fas fa-user-tie',
            'Jeans': 'fas fa-user',
            'Bag': 'fas fa-shopping-bag',
            'Shoes': 'fas fa-shoe-prints',
            'Watches': 'fas fa-clock',
            'Cap': 'fas fa-hat-cowboy',
            'Electronics': 'fas fa-mobile-alt',
            'Accessories': 'fas fa-gem',
            'Stationery': 'fas fa-pen'
          };

          const categoryData = data.categories.map(category => ({
            name: category,
            icon: categoryIcons[category] || 'fas fa-tag',
            link: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`
          }));

          // Add "All Categories" option
          categoryData.push({
            name: 'All Categories',
            icon: 'fas fa-th-large',
            link: '/products'
          });

          setCategories(categoryData.slice(0, 9)); // Limit to 9 categories like in the image
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get sale data from config or use defaults
  const saleData = data?.sale || config?.sale || {
    hashtag: '#Big Fashion Sale',
    title: 'Limited Time Offer! Up to 50% OFF!',
    subtitle: 'Redefine Your Everyday Style',
    discount: '50%',
    endDate: '2024-12-31'
  };

  const handleCategoryClick = (category) => {
    navigate(category.link);
  };

  const handleImageLoad = (type) => {
    setImageLoading(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const handleImageError = (e, type) => {
    // Set fallback image
    if (type === 'white') {
      e.target.src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=400&fit=crop&crop=center";
    } else if (type === 'gray') {
      e.target.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&crop=center";
    } else if (type === 'black') {
      e.target.src = "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop&crop=center";
    } else if (type === 'shoes') {
      e.target.src = "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=200&fit=crop&crop=center";
    }
  };

  if (loading) {
    return (
      <section className="hero-sale-section">
        <div className="container">
          <div className="hero-sale-content">
            <div className="skeleton-loader">
              <div className="skeleton-badge"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-sale-section">
      {/* Sale Banner Section */}
      <div className="sale-banner">
        <div className="container">
          <div className="sale-content">
            <div className="sale-text">
              <span className="sale-hashtag">{saleData.hashtag}</span>
              <h1 className="sale-title">{saleData.title}</h1>
              <p className="sale-subtitle">{saleData.subtitle}</p>
              
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                <span className="indicator"></span>
                <span className="indicator active"></span>
                <span className="indicator"></span>
              </div>
            </div>
            
            <div className="sale-products">
              <div className="product-stack">
                <div className="product-item t-shirt white">
                  {imageLoading.white && <div className="image-skeleton"></div>}
                  <img 
                    src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop&crop=center" 
                    alt="White T-Shirt"
                    className={`product-image ${!imageLoading.white ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad('white')}
                    onError={(e) => handleImageError(e, 'white')}
                  />
                </div>
                <div className="product-item t-shirt gray">
                  {imageLoading.gray && <div className="image-skeleton"></div>}
                  <img 
                    src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=400&fit=crop&crop=center" 
                    alt="Gray T-Shirt"
                    className={`product-image ${!imageLoading.gray ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad('gray')}
                    onError={(e) => handleImageError(e, 'gray')}
                  />
                </div>
                <div className="product-item t-shirt black">
                  {imageLoading.black && <div className="image-skeleton"></div>}
                  <img 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&crop=center" 
                    alt="Black T-Shirt"
                    className={`product-image ${!imageLoading.black ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad('black')}
                    onError={(e) => handleImageError(e, 'black')}
                  />
                </div>
                <div className="product-item shoes">
                  {imageLoading.shoes && <div className="image-skeleton"></div>}
                  <img 
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop&crop=center" 
                    alt="White Sneakers"
                    className={`product-image ${!imageLoading.shoes ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad('shoes')}
                    onError={(e) => handleImageError(e, 'shoes')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Icons Section */}
      <div className="category-icons-section">
        <div className="container">
          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                key={index}
                className="category-item"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent; 