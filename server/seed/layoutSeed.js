const mongoose = require('mongoose');
const PageLayout = require('../models/PageLayout');

mongoose.connect('mongodb://localhost:27017/styli', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const homeLayout = {
  pageType: 'home',
  pageId: 'home-main',
  name: 'Home Page Layout',
  description: 'Main home page with hero banner and all products',
  components: [
    {
      type: 'hero',
      config: {
        sale: {
          hashtag: '#Big Fashion Sale',
          title: 'Limited Time Offer! Up to 50% OFF!',
          subtitle: 'Redefine Your Everyday Style',
          discount: '50%',
          endDate: '2024-12-31'
        }
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    },
    {
      type: 'productGrid',
      config: {
        title: 'All Products',
        limit: 20,
        gridColumns: 4,
        showPagination: true,
        itemsPerPage: 20
      },
      data: {},
      order: 2,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Styli - Fashion & Lifestyle',
    description: 'Discover the latest fashion trends and lifestyle products',
    keywords: ['fashion', 'lifestyle', 'shopping', 'trends'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

const searchLayout = {
  pageType: 'search',
  pageId: 'search-results',
  name: 'Search Results Layout',
  description: 'Search results page with product grid',
  components: [
    {
      type: 'searchResults',
      config: {
        title: 'Search Results',
        limit: 12,
        gridColumns: 4,
        showPagination: true
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Search Results - Styli',
    description: 'Search results for products',
    keywords: ['search', 'products', 'fashion'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

const cartLayout = {
  pageType: 'cart',
  pageId: 'cart-main',
  name: 'Cart Page Layout',
  description: 'Shopping cart page with items and checkout',
  components: [
    {
      type: 'cart',
      config: {
        showShippingBanner: true,
        showShukranRewards: true,
        showCouponSection: true
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Shopping Cart - Styli',
    description: 'Review your shopping cart items',
    keywords: ['cart', 'shopping', 'checkout'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

const productLayout = {
  pageType: 'product',
  pageId: 'product-detail',
  name: 'Product Detail Layout',
  description: 'Product detail page with images, description, and add to cart',
  components: [
    {
      type: 'productGrid',
      config: {
        title: 'Related Products',
        limit: 4,
        gridColumns: 4
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Product Details - Styli',
    description: 'View product details and specifications',
    keywords: ['product', 'details', 'shopping'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

// Checkout page layout
const checkoutLayout = {
  pageType: 'checkout',
  pageId: 'checkout-main',
  name: 'Checkout Layout',
  description: 'Checkout page with shipping and payment forms',
  components: [
    {
      type: 'CheckoutComponent',
      config: {
        title: 'Checkout',
        showProgress: true
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Checkout - Styli',
    description: 'Complete your purchase',
    keywords: ['checkout', 'payment', 'shipping'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

// Order confirmation page layout
const orderConfirmationLayout = {
  pageType: 'order-confirmation',
  pageId: 'order-confirmation-main',
  name: 'Order Confirmation Layout',
  description: 'Order confirmation page after successful checkout',
  components: [
    {
      type: 'OrderConfirmationComponent',
      config: {
        title: 'Order Confirmation',
        showSuccess: true
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Order Confirmation - Styli',
    description: 'Your order has been confirmed',
    keywords: ['order', 'confirmation', 'success'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

const productDetailLayout = {
  pageType: 'product',
  pageId: 'product-detail',
  name: 'Product Detail Layout',
  description: 'Individual product detail page with images, description, and add to cart',
  components: [
    {
      type: 'productDetail',
      config: {
        showSizeGuide: true,
        showDeliveryInfo: true,
        showReturnPolicy: true
      },
      data: {},
      order: 1,
      isActive: true,
      conditions: {}
    }
  ],
  metadata: {
    title: 'Product Details - Styli',
    description: 'View product details and specifications',
    keywords: ['product', 'details', 'shopping'],
    ogImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  isActive: true,
  version: 1
};

const layouts = [homeLayout, searchLayout, cartLayout, productDetailLayout, checkoutLayout, orderConfirmationLayout];

async function seedLayouts() {
  try {
    console.log('Starting layout seeding...');
    
    for (const layout of layouts) {
      const existingLayout = await PageLayout.findOne({ pageId: layout.pageId });
      
      if (existingLayout) {
        console.log(`Updating existing layout: ${layout.name}`);
        await PageLayout.findOneAndUpdate(
          { pageId: layout.pageId },
          { ...layout, version: existingLayout.version + 1 },
          { new: true }
        );
      } else {
        console.log(`Creating new layout: ${layout.name}`);
        const newLayout = new PageLayout(layout);
        await newLayout.save();
      }
    }
    
    console.log('Layout seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding layouts:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedLayouts(); 