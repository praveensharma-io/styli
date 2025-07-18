// Exact copy of cartController.js to match the updated import path
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

/**
 * Get user's active cart
 * @route GET /api/cart
 */
exports.getCart = async (req, res) => {
  try {
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
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

/**
 * Add item to cart
 * @route POST /api/cart/items
 */
exports.addToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
    const { productId, quantity = 1, attributes = {} } = req.body;
    
    // Validate product exists and is in stock
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

/**
 * Update cart item quantity
 * @route PUT /api/cart/items/:itemId
 */
exports.updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
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

/**
 * Remove item from cart
 * @route DELETE /api/cart/items/:itemId
 */
exports.removeFromCart = async (req, res) => {
  try {
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
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

/**
 * Clear cart (remove all items)
 * @route DELETE /api/cart
 */
exports.clearCart = async (req, res) => {
  try {
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
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

/**
 * Apply coupon to cart
 * @route POST /api/cart/coupons
 */
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
    const userId = req.user.id;
    
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
    
    // In a real app, validate coupon from Coupon model
    // For simplicity, let's assume a fixed 10% discount
    const discountAmount = cart.subtotal * 0.1;
    
    // Apply coupon
    cart.appliedCoupons.push({
      code: couponCode,
      discountAmount,
      type: 'percentage'
    });
    
    // Save the cart
    await cart.save();
    
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

/**
 * Remove coupon from cart
 * @route DELETE /api/cart/coupons/:couponCode
 */
exports.removeCoupon = async (req, res) => {
  try {
    // In a real app, userId would come from authentication middleware
    const userId = req.user.id;
    
    const { couponCode } = req.params;
    
    // Find user's cart
    const cart = await Cart.findOne({ userId, status: 'active' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Remove the coupon
    cart.appliedCoupons = cart.appliedCoupons.filter(coupon => coupon.code !== couponCode);
    
    // Save the cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Coupon removed',
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

/**
 * Get cart summary (item count and total)
 * @route GET /api/cart/summary
 */
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