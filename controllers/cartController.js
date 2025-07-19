const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

exports.getCart = async (req, res) => {
  try {
    // Use consistent user ID
    const userId = req.query.userId || '60d21b4667d0d8992e610c85';
    
    // Get user's active cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    // If no cart exists, return empty cart
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          subtotal: 0,
          totalDiscount: 0,
          total: 0,
          appliedCoupons: []
        }
      });
    }
    
    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart',
      error: error.message
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Use consistent user ID
    const userId = req.body.userId || '60d21b4667d0d8992e610c85';
    
    const { productId, quantity = 1, attributes = {} } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }
    
    // Find or create user's cart
    let cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    // Prepare the cart item
    const cartItem = {
      productId,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      quantity,
      image: product.images && product.images.length > 0 ? product.images[0] : null,
      attributes
    };
    
    // Add item to cart
    cart.addItem(cartItem);
    
    // Save the cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Use consistent user ID
    const userId = req.body.userId || '60d21b4667d0d8992e610c85';
    
    const { itemId } = req.params;
    const { quantity, attributes } = req.body;
    
    // Find user's cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Find the item in cart
    const cartItem = cart.items.id(itemId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    // Update quantity if provided
    if (quantity !== undefined) {
      // Check if the product is still in stock
      const product = await Product.findById(cartItem.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product no longer exists'
        });
      }
      
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available in stock`
        });
      }
      
      // Update quantity
      cart.updateItemQuantity(itemId, quantity);
    }
    
    // Update attributes if provided
    if (attributes && Object.keys(attributes).length > 0) {
      cart.updateItemAttributes(itemId, attributes);
    }
    
    // Save the cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      cart
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
      error: error.message
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    // Use consistent user ID
    const userId = req.query.userId || '60d21b4667d0d8992e610c85';
    
    const { itemId } = req.params;
    
    // Find user's cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Remove the item
    cart.removeItem(itemId);
    
    // Save the cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    // Use consistent user ID
    const userId = req.body.userId || '60d21b4667d0d8992e610c85';
    
    // Find user's cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Remove all items
    cart.items = [];
    cart.appliedCoupons = [];
    
    // Save the cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // In a real app, userId would come from authentication middleware
    const userId = req.user?.id || '60d21b4667d0d8992e610c85';
    
    const { couponCode } = req.body;
    
    // Find user's cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Check if coupon already applied
    if (cart.appliedCoupons.some(coupon => coupon.code === couponCode)) {
      return res.status(400).json({
        success: false,
        message: 'Coupon already applied'
      });
    }
    
    // Import Coupon model
    const Coupon = require('../models/Coupon');
    
    // Find and validate coupon
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
    console.log(`User check for coupon ${couponCode}:`, userCheck);
    console.log(`User ID: ${userId}, User ID type: ${typeof userId}`);
    console.log(`Coupon usedByUsers:`, coupon.usedByUsers);
    if (!userCheck.canUse) {
      return res.status(400).json({
        success: false,
        message: userCheck.reason
      });
    }
    
    // Check if coupon applies to cart
    const cartItems = cart.items.map(item => ({
      productId: item.productId,
      category: item.category || 'General',
      price: item.salePrice || item.price,
      quantity: item.quantity
    }));
    
    const cartCheck = coupon.appliesToCart(cartItems, cart.subtotal);
    if (!cartCheck.applies) {
      return res.status(400).json({
        success: false,
        message: cartCheck.reason
      });
    }
    
    // Check if coupon can be stacked with existing coupons
    if (!coupon.stackable && cart.appliedCoupons.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This coupon cannot be combined with other offers'
      });
    }
    
    // Calculate discount amount
    const discountAmount = coupon.calculateDiscount(cart.subtotal, cartItems);
    
    // Create the coupon object in the correct format
    const couponToApply = {
      code: coupon.code,
      discountAmount: discountAmount,
      type: coupon.discountType,
      couponId: coupon._id
    };
    
    console.log('Applying coupon:', couponToApply);
    
    // Use the cart method to apply coupon
    cart.applyCoupon(couponToApply);
    
    console.log('Updated appliedCoupons:', cart.appliedCoupons);
    
    // Validate cart before saving
    const validation = cart.validateCart();
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart data',
        errors: validation.errors
      });
    }
    
    // Record coupon usage
    await coupon.recordUsage(userId);
    
    // Save the cart with explicit validation
    try {
      await cart.save({ validateBeforeSave: true });
    } catch (saveError) {
      console.error('Save error:', saveError);
      throw saveError;
    }
    
    res.status(200).json({
      success: true,
      message: 'Coupon applied successfully',
      cart
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to apply coupon',
      error: error.message
    });
  }
};

exports.removeCoupon = async (req, res) => {
  try {
    // In a real app, userId would come from authentication middleware
    const userId = req.user?.id || '60d21b4667d0d8992e610c85';
    
    const { couponCode } = req.params;
    
    // Find user's cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Remove the coupon using the cart method and get the removed coupon data
    const removedCoupon = cart.removeCoupon(couponCode);
    
    if (!removedCoupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found in cart'
      });
    }
    
    // Note: We don't decrease usage when removing from cart
    // because the user has already "used" the coupon by applying it
    // Usage should only be decreased when an order is cancelled or refunded
    
    // Save the cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Coupon removed successfully',
      cart
    });
  } catch (error) {
    console.error('Error removing coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove coupon',
      error: error.message
    });
  }
};

exports.getCartSummary = async (req, res) => {
  try {
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
    // Get user's active cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    // If no cart exists, return empty summary
    if (!cart) {
      return res.status(200).json({
        success: true,
        summary: {
          itemCount: 0,
          total: 0
        }
      });
    }
    
    // Calculate item count
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    res.status(200).json({
      success: true,
      summary: {
        itemCount,
        total: cart.total
      }
    });
  } catch (error) {
    console.error('Error getting cart summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart summary',
      error: error.message
    });
  }
}; 