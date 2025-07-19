const { body, param } = require('express-validator');

// Validate add to cart request
exports.validateAddToCart = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID format'),
  
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  
  body('attributes')
    .optional()
    .isObject()
    .withMessage('Attributes must be an object')
];

// Validate update cart item request
exports.validateUpdateCartItem = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Invalid item ID format'),
  
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  
  body('attributes')
    .optional()
    .isObject()
    .withMessage('Attributes must be an object')
];

// Validate remove cart item request
exports.validateRemoveCartItem = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Invalid item ID format')
];

// Validate apply coupon request
exports.validateApplyCoupon = [
  body('couponCode')
    .notEmpty()
    .withMessage('Coupon code is required')
    .isString()
    .withMessage('Coupon code must be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Coupon code must be between 3 and 20 characters')
];

// Validate remove coupon request
exports.validateRemoveCoupon = [
  param('couponCode')
    .notEmpty()
    .withMessage('Coupon code is required')
    .isString()
    .withMessage('Coupon code must be a string')
]; 