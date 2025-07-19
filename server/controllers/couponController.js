const Coupon = require('../models/Coupon');
const Cart = require('../models/Cart');
const { validationResult } = require('express-validator');

exports.getAllCoupons = async (req, res) => {
  try {
    const { page = 1, limit = 10, active, search } = req.query;
    
    // Build query
    const query = {};
    
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    if (search) {
      query.$or = [
        { code: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get coupons with pagination
    const coupons = await Coupon.find(query)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ priority: -1, createdAt: -1 });
    
    // Get total count for pagination
    const total = await Coupon.countDocuments(query);
    
    res.status(200).json({
      success: true,
      coupons,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalCoupons: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error getting coupons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve coupons',
      error: error.message
    });
  }
};

exports.getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const coupon = await Coupon.findById(id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }
    
    res.status(200).json({
      success: true,
      coupon
    });
  } catch (error) {
    console.error('Error getting coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve coupon',
      error: error.message
    });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const couponData = req.body;
    
    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: couponData.code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists'
      });
    }
    
    // Create new coupon
    const coupon = new Coupon(couponData);
    await coupon.save();
    
    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon
    });
  } catch (error) {
    console.error('Error creating coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create coupon',
      error: error.message
    });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if coupon exists
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }
    
    // Check if code is being changed and if it already exists
    if (updateData.code && updateData.code !== coupon.code) {
      const existingCoupon = await Coupon.findOne({ 
        code: updateData.code.toUpperCase(),
        _id: { $ne: id }
      });
      if (existingCoupon) {
        return res.status(400).json({
          success: false,
          message: 'Coupon code already exists'
        });
      }
    }
    
    // Update coupon
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      coupon: updatedCoupon
    });
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update coupon',
      error: error.message
    });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    
    const coupon = await Coupon.findByIdAndDelete(id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete coupon',
      error: error.message
    });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { couponCode, cartItems = [], subtotal = 0 } = req.body;
    const userId = req.body.userId || '60d21b4667d0d8992e610c85';
    
    // Find coupon by code
    const coupon = await Coupon.findOne({ 
      code: couponCode.toUpperCase(),
      isActive: true
    });
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code'
      });
    }
    
    // Check if coupon is valid
    const validityCheck = coupon.isValid();
    if (!validityCheck.valid) {
      return res.status(400).json({
        success: false,
        message: validityCheck.reason
      });
    }
    
    // Check if user can use coupon
    const userCheck = coupon.canUserUse(userId);
    if (!userCheck.canUse) {
      return res.status(400).json({
        success: false,
        message: userCheck.reason,
        errorType: 'usage_limit_exceeded'
      });
    }
    
    // Check if coupon applies to cart
    const cartCheck = coupon.appliesToCart(cartItems, subtotal);
    if (!cartCheck.applies) {
      return res.status(400).json({
        success: false,
        message: cartCheck.reason
      });
    }
    
    // Calculate discount amount
    const discountAmount = coupon.calculateDiscount(subtotal, cartItems);
    
    res.status(200).json({
      success: true,
      message: 'Coupon is valid',
      coupon: {
        id: coupon._id,
        code: coupon.code,
        name: coupon.name,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        minimumOrderAmount: coupon.minimumOrderAmount,
        maximumDiscount: coupon.maximumDiscount
      }
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate coupon',
      error: error.message
    });
  }
};
  
exports.getAvailableCoupons = async (req, res) => {
  try {
    const userId = req.query.userId || '60d21b4667d0d8992e610c85';
    const { cartItems = [], subtotal = 0 } = req.query;
    
    // Get all active coupons
    const coupons = await Coupon.find({ 
      isActive: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    }).sort({ priority: -1, createdAt: -1 });
    
    // Filter coupons that user can use
    const availableCoupons = [];
    const unavailableCoupons = [];
    
    for (const coupon of coupons) {
      const validityCheck = coupon.isValid();
      const userCheck = coupon.canUserUse(userId);
      const cartCheck = coupon.appliesToCart(JSON.parse(cartItems), parseFloat(subtotal));
      
      console.log(`Coupon ${coupon.code}: validity=${validityCheck.valid}, userCanUse=${userCheck.canUse}, cartApplies=${cartCheck.applies}`);
      
      if (validityCheck.valid && userCheck.canUse && cartCheck.applies) {
        const discountAmount = coupon.calculateDiscount(parseFloat(subtotal), JSON.parse(cartItems));
        
        availableCoupons.push({
          id: coupon._id,
          code: coupon.code,
          name: coupon.name,
          description: coupon.description,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          discountAmount,
          minimumOrderAmount: coupon.minimumOrderAmount,
          maximumDiscount: coupon.maximumDiscount
        });
      } else if (validityCheck.valid && !userCheck.canUse) {
        // Track coupons that are valid but user can't use due to usage limit
        unavailableCoupons.push({
          code: coupon.code,
          reason: userCheck.reason
        });
      }
    }
    
    res.status(200).json({
      success: true,
      coupons: availableCoupons,
      unavailableCoupons: unavailableCoupons
    });
  } catch (error) {
    console.error('Error getting available coupons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available coupons',
      error: error.message
    });
  }
}; 

exports.testCanUserUse = async (req, res) => {
  try {
    const { couponId, userId } = req.params;
    
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }
    
    const userCheck = coupon.canUserUse(userId);
    
    res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        userUsageLimit: coupon.userUsageLimit,
        usedByUsers: coupon.usedByUsers
      },
      userCheck,
      userId
    });
  } catch (error) {
    console.error('Error testing canUserUse:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test canUserUse',
      error: error.message
    });
  }
}; 