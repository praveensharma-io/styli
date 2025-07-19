import React from 'react';
import { Link } from 'react-router-dom';

const CategoryListComponent = ({ config, data }) => {
  const {
    title = 'Shop by Category',
    layout = 'grid'
  } = config;

  const { categories = [] } = data;

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">{title}</h2>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {categories.map((category, index) => (
          <div key={index} className="col">
            <Link to={category.link} className="text-decoration-none">
              <div className="card h-100 category-card">
                <img
                  src={category.image || 'https://via.placeholder.com/300x200'}
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title text-dark">{category.name}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListComponent; 