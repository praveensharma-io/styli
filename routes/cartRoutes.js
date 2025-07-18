const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const cartValidator = require('../middlewares/cartValidator');
const { authenticate } = require('../middlewares/authMiddleware');

// Apply authentication middleware to all cart routes
router.use(authenticate);

// Get cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/items', cartValidator.validateAddToCart, cartController.addToCart);

// Update cart item
router.put('/items/:itemId', cartValidator.validateUpdateCartItem, cartController.updateCartItem);

// Remove item from cart
router.delete('/items/:itemId', cartValidator.validateRemoveCartItem, cartController.removeFromCart);

// Clear cart (remove all items)
router.delete('/', cartController.clearCart);

// Apply coupon
router.post('/coupons', cartValidator.validateApplyCoupon, cartController.applyCoupon);

// Remove coupon
router.delete('/coupons/:couponCode', cartValidator.validateRemoveCoupon, cartController.removeCoupon);

// Get cart summary (for header/mini cart)
router.get('/summary', cartController.getCartSummary);

module.exports = router; 