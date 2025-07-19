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
  appliedCoupons: {
    type: [{
      code: {
        type: String,
        required: true
      },
      discountAmount: {
        type: Number,
        required: true,
        min: 0
      },
      type: {
        type: String,
        enum: ['percentage', 'fixed', 'free_shipping'],
        required: true
      },
      couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true
      }
    }],
    default: []
  },
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
  // Ensure appliedCoupons is always an array
  if (!Array.isArray(this.appliedCoupons)) {
    this.appliedCoupons = [];
  }
  
  // Filter out any invalid coupon entries
  this.appliedCoupons = this.appliedCoupons.filter(coupon => 
    coupon && typeof coupon === 'object' && 
    coupon.code && coupon.discountAmount !== undefined && 
    coupon.type && coupon.couponId
  );
  
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => {
    const itemPrice = item.salePrice || item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  // Calculate total discount
  const couponDiscount = this.appliedCoupons.reduce((sum, coupon) => {
    return sum + (coupon.discountAmount || 0);
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

// Method to apply coupon to cart
CartSchema.methods.applyCoupon = function(couponData) {
  if (!this.appliedCoupons) {
    this.appliedCoupons = [];
  }
  
  // Check if coupon already applied
  const existingCoupon = this.appliedCoupons.find(coupon => 
    coupon.code === couponData.code
  );
  
  if (existingCoupon) {
    throw new Error('Coupon already applied');
  }
  
  // Add coupon to applied coupons
  this.appliedCoupons.push({
    code: couponData.code,
    discountAmount: couponData.discountAmount,
    type: couponData.type,
    couponId: couponData.couponId
  });
  
  return this;
};

// Method to remove coupon from cart
CartSchema.methods.removeCoupon = function(couponCode) {
  if (!this.appliedCoupons) {
    this.appliedCoupons = [];
  }
  
  const removedCoupon = this.appliedCoupons.find(coupon => coupon.code === couponCode);
  this.appliedCoupons = this.appliedCoupons.filter(coupon => 
    coupon.code !== couponCode
  );
  
  return removedCoupon; // Return the removed coupon for usage tracking
};

// Method to validate cart data
CartSchema.methods.validateCart = function() {
  const errors = [];
  
  // Validate items
  if (!Array.isArray(this.items)) {
    errors.push('Items must be an array');
  }
  
  // Validate appliedCoupons
  if (!Array.isArray(this.appliedCoupons)) {
    errors.push('Applied coupons must be an array');
  } else {
    this.appliedCoupons.forEach((coupon, index) => {
      if (typeof coupon !== 'object' || !coupon) {
        errors.push(`Applied coupon at index ${index} must be an object`);
      } else if (!coupon.code || !coupon.discountAmount || !coupon.type || !coupon.couponId) {
        errors.push(`Applied coupon at index ${index} is missing required fields`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = mongoose.model('Cart', CartSchema); 