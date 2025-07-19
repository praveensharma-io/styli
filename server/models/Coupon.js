const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed', 'free_shipping'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minimumOrderAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  maximumDiscount: {
    type: Number,
    default: null,
    min: 0
  },
  applicableCategories: [{
    type: String,
    trim: true
  }],
  excludedCategories: [{
    type: String,
    trim: true
  }],
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageLimit: {
    type: Number,
    default: null,
    min: 1
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  userUsageLimit: {
    type: Number,
    default: 1,
    min: 1
  },
  usedByUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usageCount: {
      type: Number,
      default: 1
    },
    lastUsed: {
      type: Date,
      default: Date.now
    }
  }],
  isFirstTimeOnly: {
    type: Boolean,
    default: false
  },
  isNewUserOnly: {
    type: Boolean,
    default: false
  },
  stackable: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

// Indexes for faster lookups
CouponSchema.index({ code: 1 });
CouponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
CouponSchema.index({ 'usedByUsers.userId': 1 });

// Pre-save hook to validate dates
CouponSchema.pre('save', function(next) {
  if (this.startDate >= this.endDate) {
    return next(new Error('End date must be after start date'));
  }
  
  if (this.usageLimit && this.usedCount > this.usageLimit) {
    return next(new Error('Usage count cannot exceed usage limit'));
  }
  
  next();
});

// Method to check if coupon is valid
CouponSchema.methods.isValid = function() {
  const now = new Date();
  
  // Check if coupon is active
  if (!this.isActive) return { valid: false, reason: 'Coupon is inactive' };
  
  // Check if coupon is within date range
  if (now < this.startDate) return { valid: false, reason: 'Coupon not yet active' };
  if (now > this.endDate) return { valid: false, reason: 'Coupon has expired' };
  
  // Check if usage limit exceeded
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, reason: 'Coupon usage limit exceeded' };
  }
  
  return { valid: true };
};

// Method to check if user can use coupon
CouponSchema.methods.canUserUse = function(userId) {
  // Convert userId to string for consistent comparison
  const userIdStr = userId.toString();
  const userUsage = this.usedByUsers.find(u => u.userId.toString() === userIdStr);
  
  console.log(`canUserUse check: userId=${userIdStr}, userUsage=${userUsage ? userUsage.usageCount : 'none'}, limit=${this.userUsageLimit}`);
  
  if (userUsage && userUsage.usageCount >= this.userUsageLimit) {
    return { canUse: false, reason: 'User has reached usage limit for this coupon' };
  }
  
  return { canUse: true };
};

// Method to calculate discount amount
CouponSchema.methods.calculateDiscount = function(subtotal, items = []) {
  let discountAmount = 0;
  
  switch (this.discountType) {
    case 'percentage':
      discountAmount = subtotal * (this.discountValue / 100);
      break;
    case 'fixed':
      discountAmount = this.discountValue;
      break;
    case 'free_shipping':
      discountAmount = 12; // Assuming shipping cost is 12 AED
      break;
  }
  
  // Apply maximum discount limit
  if (this.maximumDiscount && discountAmount > this.maximumDiscount) {
    discountAmount = this.maximumDiscount;
  }
  
  // Ensure discount doesn't exceed subtotal
  discountAmount = Math.min(discountAmount, subtotal);
  
  return Math.max(0, discountAmount);
};

// Method to check if coupon applies to cart
CouponSchema.methods.appliesToCart = function(cartItems, subtotal) {
  // Check minimum order amount
  if (subtotal < this.minimumOrderAmount) {
    return { applies: false, reason: `Minimum order amount of ${this.minimumOrderAmount} AED required` };
  }
  
  // Check category restrictions
  if (this.applicableCategories.length > 0) {
    const cartCategories = [...new Set(cartItems.map(item => item.category))];
    const hasApplicableCategory = cartCategories.some(category => 
      this.applicableCategories.includes(category)
    );
    if (!hasApplicableCategory) {
      return { applies: false, reason: 'Coupon not applicable to items in cart' };
    }
  }
  
  // Check excluded categories
  if (this.excludedCategories.length > 0) {
    const cartCategories = [...new Set(cartItems.map(item => item.category))];
    const hasExcludedCategory = cartCategories.some(category => 
      this.excludedCategories.includes(category)
    );
    if (hasExcludedCategory) {
      return { applies: false, reason: 'Coupon not applicable to items in cart' };
    }
  }
  
  // Check product restrictions
  if (this.applicableProducts.length > 0) {
    const cartProductIds = cartItems.map(item => item.productId.toString());
    const hasApplicableProduct = this.applicableProducts.some(productId => 
      cartProductIds.includes(productId.toString())
    );
    if (!hasApplicableProduct) {
      return { applies: false, reason: 'Coupon not applicable to items in cart' };
    }
  }
  
  // Check excluded products
  if (this.excludedProducts.length > 0) {
    const cartProductIds = cartItems.map(item => item.productId.toString());
    const hasExcludedProduct = this.excludedProducts.some(productId => 
      cartProductIds.includes(productId.toString())
    );
    if (hasExcludedProduct) {
      return { applies: false, reason: 'Coupon not applicable to items in cart' };
    }
  }
  
  return { applies: true };
};

// Method to record usage
CouponSchema.methods.recordUsage = function(userId) {
  this.usedCount += 1;
  
  const existingUserUsage = this.usedByUsers.find(u => u.userId.toString() === userId.toString());
  
  if (existingUserUsage) {
    existingUserUsage.usageCount += 1;
    existingUserUsage.lastUsed = new Date();
  } else {
    this.usedByUsers.push({
      userId,
      usageCount: 1,
      lastUsed: new Date()
    });
  }
  
  return this.save();
};

// Method to decrease usage (when coupon is removed from cart)
CouponSchema.methods.decreaseUsage = function(userId) {
  // Decrease total usage count
  this.usedCount = Math.max(0, this.usedCount - 1);
  
  const existingUserUsage = this.usedByUsers.find(u => u.userId.toString() === userId.toString());
  
  if (existingUserUsage) {
    existingUserUsage.usageCount = Math.max(0, existingUserUsage.usageCount - 1);
    existingUserUsage.lastUsed = new Date();
    
    // Remove user entry if usage count becomes 0
    if (existingUserUsage.usageCount === 0) {
      this.usedByUsers = this.usedByUsers.filter(u => u.userId.toString() !== userId.toString());
    }
  }
  
  return this.save();
};

module.exports = mongoose.model('Coupon', CouponSchema); 