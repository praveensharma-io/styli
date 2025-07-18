const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
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
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  image: {
    type: String
  },
  attributes: {
    // For product variations like size, color, etc.
    type: Map,
    of: String
  }
}, { _id: true, timestamps: false });

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [CartItemSchema],
  subtotal: {
    type: Number,
    required: true,
    default: 0
  },
  totalDiscount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  appliedCoupons: [{
    code: String,
    discountAmount: Number,
    type: String // percentage, fixed, etc.
  }],
  status: {
    type: String,
    enum: ['active', 'abandoned', 'converted'],
    default: 'active'
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

// Pre-save hook to calculate totals
CartSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => {
    const itemPrice = item.salePrice || item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  // Calculate total discount
  const couponDiscount = this.appliedCoupons.reduce((sum, coupon) => {
    return sum + coupon.discountAmount;
  }, 0);

  this.totalDiscount = couponDiscount;
  
  // Calculate final total
  this.total = Math.max(0, this.subtotal - this.totalDiscount);

  next();
});

// Index for faster lookups
CartSchema.index({ userId: 1, status: 1 });
CartSchema.index({ updatedAt: -1 });

// Method to add item to cart
CartSchema.methods.addItem = function(item) {
  const existingItemIndex = this.items.findIndex(i => 
    i.productId.toString() === item.productId.toString() && 
    JSON.stringify(i.attributes) === JSON.stringify(item.attributes)
  );

  if (existingItemIndex > -1) {
    // Increment quantity of existing item
    this.items[existingItemIndex].quantity += item.quantity || 1;
  } else {
    // Add new item
    this.items.push(item);
  }
  
  return this;
};

// Method to update item quantity
CartSchema.methods.updateItemQuantity = function(itemId, quantity) {
  const item = this.items.id(itemId);
  if (!item) throw new Error('Item not found in cart');
  
  item.quantity = quantity;
  return this;
};

// Method to update item attributes
CartSchema.methods.updateItemAttributes = function(itemId, attributes) {
  const item = this.items.id(itemId);
  if (!item) throw new Error('Item not found in cart');
  
  // Update attributes
  if (!item.attributes) {
    item.attributes = new Map();
  }
  
  Object.entries(attributes).forEach(([key, value]) => {
    item.attributes.set(key, value);
  });
  
  return this;
};

// Method to remove item from cart
CartSchema.methods.removeItem = function(itemId) {
  this.items = this.items.filter(item => item._id.toString() !== itemId);
  return this;
};

module.exports = mongoose.model('Cart', CartSchema); 