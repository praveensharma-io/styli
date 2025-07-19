import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeroComponent from './ui/HeroComponent';
import ProductGridComponent from './ui/ProductGridComponent';
import BannerComponent from './ui/BannerComponent';
import CategoryListComponent from './ui/CategoryListComponent';
import FeaturedProductsComponent from './ui/FeaturedProductsComponent';
import CartComponent from './ui/CartComponent';
import CheckoutComponent from './ui/CheckoutComponent';
import OrderConfirmationComponent from './ui/OrderConfirmationComponent';
import HeaderComponent from './ui/HeaderComponent';
import FooterComponent from './ui/FooterComponent';
import ProductDetailComponent from './ui/ProductDetailComponent';
import SearchResultsComponent from './ui/SearchResultsComponent';

const DynamicLayout = ({ pageType: initialPageType, pageId: initialPageId }) => {
  const params = useParams();
  const pageType = initialPageType || params.pageType;
  const pageId = initialPageId || params.pageId;
  
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/layouts/${pageType}/${pageId}`);
        
        if (response.data.success) {
          setLayout(response.data.layout);
        } else {
          setError('Failed to load layout');
        }
      } catch (error) {
        console.error('Error fetching layout:', error);
        setError('Failed to load layout');
      } finally {
        setLoading(false);
      }
    };

    if (pageType && pageId) {
      fetchLayout();
    }
  }, [pageType, pageId]);

  const renderComponent = (component) => {
    const { type, config, data, order } = component;

    switch (type) {
      case 'hero':
        return <HeroComponent key={order} config={config} data={data} />;
      case 'productGrid':
        return <ProductGridComponent key={order} config={config} data={data} />;
      case 'banner':
        return <BannerComponent key={order} config={config} data={data} />;
      case 'categoryList':
        return <CategoryListComponent key={order} config={config} data={data} />;
      case 'featuredProducts':
        return <FeaturedProductsComponent key={order} config={config} data={data} />;
      case 'cart':
        return <CartComponent key={order} config={config} data={data} />;
      case 'checkout':
        return <CheckoutComponent key={order} config={config} data={data} />;
      case 'CheckoutComponent':
        return <CheckoutComponent key={order} config={config} data={data} />;
      case 'OrderConfirmationComponent':
        return <OrderConfirmationComponent key={order} config={config} data={data} />;
      case 'header':
        return <HeaderComponent key={order} config={config} data={data} />;
      case 'footer':
        return <FooterComponent key={order} config={config} data={data} />;
      case 'productDetail':
        return <ProductDetailComponent key={order} config={config} data={data} />;
      case 'searchResults':
        return <SearchResultsComponent key={order} config={config} data={data} />;
      default:
        return <div key={order} className="alert alert-warning">Unknown component type: {type}</div>;
    }
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

  if (!layout) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Layout not found
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-layout">
      {layout.components.map(renderComponent)}
    </div>
  );
};

export default DynamicLayout; 