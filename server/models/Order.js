const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
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
    required: true
  },
  salePrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  attributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  image: String,
  images: [String]
});

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0
  },
  totalDiscount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  appliedCoupons: [{
    code: {
      type: String,
      required: true
    },
    discountAmount: {
      type: Number,
      required: true
    },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon'
    }
  }],
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: String,
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'cod'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  notes: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

// Indexes for faster lookups
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });

// Pre-save hook to generate order number if not provided
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Method to calculate totals
OrderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum, item) => {
    const price = item.salePrice || item.price;
    return sum + (price * item.quantity);
  }, 0);
  
  this.totalDiscount = this.appliedCoupons.reduce((sum, coupon) => {
    return sum + coupon.discountAmount;
  }, 0);
  
  this.total = this.subtotal + this.shippingCost - this.totalDiscount;
  
  return this;
};

// Method to record coupon usage
OrderSchema.methods.recordCouponUsage = async function() {
  const Coupon = mongoose.model('Coupon');
  
  for (const appliedCoupon of this.appliedCoupons) {
    if (appliedCoupon.couponId) {
      const coupon = await Coupon.findById(appliedCoupon.couponId);
      if (coupon) {
        await coupon.recordUsage(this.userId);
      }
    }
  }
};

// Method to get order summary
OrderSchema.methods.getSummary = function() {
  return {
    orderNumber: this.orderNumber,
    total: this.total,
    itemCount: this.items.length,
    status: this.orderStatus,
    createdAt: this.createdAt,
    estimatedDelivery: this.estimatedDelivery
  };
};

module.exports = mongoose.model('Order', OrderSchema); 