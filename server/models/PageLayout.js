const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hero', 'productGrid', 'banner', 'categoryList', 'featuredProducts', 'cart', 'checkout', 'header', 'footer', 'productDetail', 'searchResults', 'CheckoutComponent', 'OrderConfirmationComponent']
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  order: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  conditions: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

const PageLayoutSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    enum: ['home', 'product', 'category', 'cart', 'checkout', 'search', 'profile', 'order-confirmation']
  },
  pageId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  components: [ComponentSchema],
  metadata: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

PageLayoutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('PageLayout', PageLayoutSchema); 