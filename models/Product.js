const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  colors: [{
    name: String,
    price: Number,
    image: String,
    stock: { type: Number, default: 0 }
  }],
  sizes: [{
    name: String,
    stock: { type: Number, default: 0 }
  }],
  isBestseller: {
    type: Boolean,
    default: false
  },
  loyaltyPoints: {
    type: Number,
    default: 0
  },
  deliveryDate: {
    type: String,
    default: 'Mon, 21st Jul'
  },
  location: {
    type: String,
    default: 'Dubai'
  },
  attributes: {
    // For product variations like size, color, etc.
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  variants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Indexes for faster lookup
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ isActive: 1 });

module.exports = mongoose.model('Product', ProductSchema); 