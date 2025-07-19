const PageLayout = require('../models/PageLayout');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getPageLayout = async (req, res) => {
  try {
    const { pageType, pageId } = req.params;
    const userContext = {
      userId: req.query.userId || '60d21b4667d0d8992e610c85',
      userRole: req.query.userRole || 'customer',
      deviceType: req.query.deviceType || 'desktop',
      locale: req.query.locale || 'en-US',
      timezone: req.query.timezone || 'Asia/Dubai',
      productId: req.query.productId || null // Add productId for product detail pages
    };

    console.log('🎯 Fetching layout:', { pageType, pageId, userContext });

    // Find the layout
    const layout = await PageLayout.findOne({ 
      pageType, 
      pageId, 
      isActive: true 
    });

    if (!layout) {
      return res.status(404).json({
        success: false,
        message: 'Layout not found'
      });
    }

    // Render components with data
    const renderedComponents = [];
    for (const component of layout.components) {
      // Check if component should be included based on conditions
      if (evaluateConditions(component.conditions, userContext)) {
        const renderedData = await renderComponent(component, userContext);
        
        // Clean the component data to remove Mongoose internal properties
        const cleanComponent = {
          type: component.type,
          config: component.config,
          data: renderedData,
          order: component.order,
          isActive: component.isActive
        };
        
        renderedComponents.push(cleanComponent);
      }
    }

    // Sort components by order
    renderedComponents.sort((a, b) => a.order - b.order);

    // Clean the layout data
    const responseLayout = {
      pageType: layout.pageType,
      pageId: layout.pageId,
      name: layout.name,
      description: layout.description,
      metadata: layout.metadata,
      components: renderedComponents,
      isActive: layout.isActive,
      version: layout.version
    };

    res.json({
      success: true,
      layout: responseLayout
    });

  } catch (error) {
    console.error('Error fetching layout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch layout',
      error: error.message
    });
  }
};

async function renderComponent(component, context) {
  switch (component.type) {
    case 'hero':
      return await renderHeroComponent(component, context);
    case 'productGrid':
      return await renderProductGridComponent(component, context);
    case 'banner':
      return await renderBannerComponent(component, context);
    case 'categoryList':
      return await renderCategoryListComponent(component, context);
    case 'featuredProducts':
      return await renderFeaturedProductsComponent(component, context);
    case 'cart':
      return await renderCartComponent(component, context);
    case 'checkout':
      return await renderCheckoutComponent(component, context);
    case 'header':
      return await renderHeaderComponent(component, context);
    case 'footer':
      return await renderFooterComponent(component, context);
    case 'productDetail':
      return await renderProductDetailComponent(component, context);
    case 'searchResults':
      return await renderSearchResultsComponent(component, context);
    default:
      return component.data;
  }
}

async function renderHeroComponent(component, context) {
  const { config } = component;
  
  // Get sale data from config or use defaults
  const saleData = config?.sale || {
    hashtag: '#Big Fashion Sale',
    title: 'Limited Time Offer! Up to 50% OFF!',
    subtitle: 'Redefine Your Everyday Style',
    discount: '50%',
    endDate: '2024-12-31'
  };

  // Get categories for the category icons
  const categories = await Product.distinct('category');
  
  // Map categories to icons
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
    'Home & Kitchen': 'fas fa-home',
    'Accessories': 'fas fa-gem',
    'Stationery': 'fas fa-pen'
  };

  const categoryData = categories.map(category => ({
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

  return {
    sale: saleData,
    categories: categoryData.slice(0, 9) // Limit to 9 categories
  };
}

async function renderProductGridComponent(component, context) {
  const { limit = 10, category, gridColumns = 4, showPagination = false } = component.config;
  
  let query = { isActive: true };
  
  if (category) {
    query.category = category;
  }
  
  // Get total count for pagination
  const totalProducts = await Product.countDocuments(query);
  
  // Get products with limit
  const products = await Product.find(query)
    .limit(limit)
    .lean();
  
  const formattedProducts = products.map(product => ({
    id: product._id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    salePrice: product.salePrice,
    description: product.description,
    image: product.images && product.images.length > 0 ? product.images[0] : null,
    category: product.category,
    subcategory: product.subcategory,
    stock: product.stock,
    attributes: product.attributes
  }));

  return {
    title: component.config.title || 'Featured Products',
    products: formattedProducts,
    gridColumns,
    showPagination,
    totalProducts,
    hasMore: totalProducts > limit
  };
}

async function renderBannerComponent(component, context) {
  const { config } = component;
  
  return {
    title: config.title || 'Special Offer',
    message: config.message || 'Get 50% off on selected items',
    backgroundColor: config.backgroundColor || '#ff6b6b',
    textColor: config.textColor || '#ffffff',
    image: config.image,
    link: config.link,
    showTimer: config.showTimer || false,
    endDate: config.endDate
  };
}

async function renderCategoryListComponent(component, context) {
  const { config } = component;
  
  const categories = await Product.distinct('category');
  
  return {
    title: config.title || 'Shop by Category',
    categories: categories.map(category => ({
      name: category,
      image: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?category=${category}`,
      link: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`
    })),
    layout: config.layout || 'grid'
  };
}

async function renderFeaturedProductsComponent(component, context) {
  const { config } = component;
  
  const products = await Product.find({ featured: true })
    .limit(config.limit || 6)
    .sort({ createdAt: -1 });

  return {
    title: config.title || 'Featured Products',
    products: products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images?.[0],
      category: product.category,
      brand: product.brand
    }))
  };
}

async function renderCartComponent(component, context) {
  const { userId } = context;
  
  if (!userId) {
    return { items: [], total: 0, itemCount: 0 };
  }

  const cart = await Cart.findOne({ userId, status: 'active' });
  
  if (!cart) {
    return { items: [], total: 0, itemCount: 0 };
  }

  return {
    items: cart.items.map(item => ({
      id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      salePrice: item.salePrice,
      quantity: item.quantity,
      image: item.image,
      attributes: item.attributes
    })),
    total: cart.total,
    itemCount: cart.items.length,
    subtotal: cart.subtotal
  };
}

async function renderCheckoutComponent(component, context) {
  const { userId } = context;
  
  if (!userId) {
    return { error: 'User not authenticated' };
  }

  const cart = await Cart.findOne({ userId, status: 'active' });
  
  if (!cart) {
    return { error: 'Cart is empty' };
  }

  return {
    items: cart.items,
    subtotal: cart.subtotal,
    shipping: 12,
    total: cart.total + 12,
    appliedCoupons: cart.appliedCoupons
  };
}

async function renderHeaderComponent(component, context) {
  const { config } = component;
  
  return {
    logo: config.logo || '/logo.png',
    showSearch: config.showSearch !== false,
    showCart: config.showCart !== false,
    showUserMenu: config.showUserMenu !== false,
    navigation: config.navigation || [
      { label: 'Home', link: '/' },
      { label: 'Men', link: '/men' },
      { label: 'Women', link: '/women' },
      { label: 'Sale', link: '/sale' }
    ]
  };
}

async function renderFooterComponent(component, context) {
  const { config } = component;
  
  return {
    links: config.links || [
      { title: 'About Us', links: ['About', 'Careers', 'Press'] },
      { title: 'Customer Service', links: ['Contact', 'Returns', 'Shipping'] },
      { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] }
    ],
    socialMedia: config.socialMedia || [
      { platform: 'facebook', link: '#' },
      { platform: 'twitter', link: '#' },
      { platform: 'instagram', link: '#' }
    ],
    newsletter: config.newsletter !== false
  };
}

async function renderProductDetailComponent(component, context) {
  const { productId } = context;
  
  if (!productId) {
    return { product: null };
  }

  const product = await Product.findById(productId);
  
  if (!product) {
    return { product: null };
  }

  return {
    product: {
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      description: product.description,
      image: product.images && product.images.length > 0 ? product.images[0] : null,
      category: product.category,
      stock: product.stock,
      attributes: product.attributes
    }
  };
}

async function renderSearchResultsComponent(component, context) {
  const { query } = context;
  const { limit = 10, category, sortBy } = component.config;

  let queryObject = { isActive: true };

  if (query) {
    queryObject.$text = { $search: query };
  }

  if (category) {
    queryObject.category = category;
  }

  // Get total count for pagination
  const totalProducts = await Product.countDocuments(queryObject);

  // Get products with limit and sort
  const products = await Product.find(queryObject)
    .sort(sortBy || { createdAt: -1 })
    .limit(limit)
    .lean();

  const formattedProducts = products.map(product => ({
    id: product._id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    salePrice: product.salePrice,
    description: product.description,
    image: product.images && product.images.length > 0 ? product.images[0] : null,
    category: product.category,
    subcategory: product.subcategory,
    stock: product.stock,
    attributes: product.attributes
  }));

  return {
    title: component.config.title || 'Search Results',
    products: formattedProducts,
    totalProducts,
    hasMore: totalProducts > limit
  };
}

function evaluateConditions(conditions, context) {
  if (!conditions || Object.keys(conditions).length === 0) {
    return true;
  }

  for (const [key, value] of Object.entries(conditions)) {
    if (context[key] !== value) {
      return false;
    }
  }

  return true;
}

exports.createPageLayout = async (req, res) => {
  try {
    const layoutData = req.body;
    const layout = new PageLayout(layoutData);
    await layout.save();

    res.status(201).json({
      success: true,
      message: 'Page layout created successfully',
      layout
    });
  } catch (error) {
    console.error('Error creating page layout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create page layout'
    });
  }
};

exports.updatePageLayout = async (req, res) => {
  try {
    const { pageId } = req.params;
    const updateData = req.body;

    const layout = await PageLayout.findOneAndUpdate(
      { pageId },
      { ...updateData, version: { $inc: 1 } },
      { new: true }
    );

    if (!layout) {
      return res.status(404).json({
        success: false,
        message: 'Layout not found'
      });
    }

    res.json({
      success: true,
      message: 'Page layout updated successfully',
      layout
    });
  } catch (error) {
    console.error('Error updating page layout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update page layout'
    });
  }
};

exports.deletePageLayout = async (req, res) => {
  try {
    const { pageId } = req.params;
    
    const layout = await PageLayout.findOneAndDelete({ pageId });

    if (!layout) {
      return res.status(404).json({
        success: false,
        message: 'Layout not found'
      });
    }

    res.json({
      success: true,
      message: 'Page layout deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting page layout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete page layout'
    });
  }
}; 