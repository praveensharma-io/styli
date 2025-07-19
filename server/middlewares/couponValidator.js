const { body, param, query } = require('express-validator');

// Validate coupon code
exports.validateCouponCode = [
  body('couponCode')
    .notEmpty()
    .withMessage('Coupon code is required')
    .isString()
    .withMessage('Coupon code must be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Coupon code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Coupon code must contain only uppercase letters and numbers'),
  
  body('cartItems')
    .optional()
    .isArray()
    .withMessage('Cart items must be an array'),
  
  body('subtotal')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Subtotal must be a positive number')
];

// Validate create coupon
exports.validateCreateCoupon = [
  body('code')
    .notEmpty()
    .withMessage('Coupon code is required')
    .isString()
    .withMessage('Coupon code must be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Coupon code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Coupon code must contain only uppercase letters and numbers'),
  
  body('name')
    .notEmpty()
    .withMessage('Coupon name is required')
    .isString()
    .withMessage('Coupon name must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Coupon name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  
  body('discountType')
    .notEmpty()
    .withMessage('Discount type is required')
    .isIn(['percentage', 'fixed', 'free_shipping'])
    .withMessage('Discount type must be percentage, fixed, or free_shipping'),
  
  body('discountValue')
    .notEmpty()
    .withMessage('Discount value is required')
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positive number'),
  
  body('minimumOrderAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum order amount must be a positive number'),
  
  body('maximumDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum discount must be a positive number'),
  
  body('applicableCategories')
    .optional()
    .isArray()
    .withMessage('Applicable categories must be an array'),
  
  body('applicableCategories.*')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  
  body('excludedCategories')
    .optional()
    .isArray()
    .withMessage('Excluded categories must be an array'),
  
  body('excludedCategories.*')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  
  body('applicableProducts')
    .optional()
    .isArray()
    .withMessage('Applicable products must be an array'),
  
  body('applicableProducts.*')
    .optional()
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB ID'),
  
  body('excludedProducts')
    .optional()
    .isArray()
    .withMessage('Excluded products must be an array'),
  
  body('excludedProducts.*')
    .optional()
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB ID'),
  
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO date'),
  
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO date'),
  
  body('usageLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Usage limit must be a positive integer'),
  
  body('userUsageLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User usage limit must be a positive integer'),
  
  body('isFirstTimeOnly')
    .optional()
    .isBoolean()
    .withMessage('First time only must be a boolean'),
  
  body('isNewUserOnly')
    .optional()
    .isBoolean()
    .withMessage('New user only must be a boolean'),
  
  body('stackable')
    .optional()
    .isBoolean()
    .withMessage('Stackable must be a boolean'),
  
  body('priority')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Priority must be a non-negative integer'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active status must be a boolean')
];

// Validate update coupon
exports.validateUpdateCoupon = [
  param('id')
    .notEmpty()
    .withMessage('Coupon ID is required')
    .isMongoId()
    .withMessage('Invalid coupon ID format'),
  
  body('code')
    .optional()
    .isString()
    .withMessage('Coupon code must be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Coupon code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Coupon code must contain only uppercase letters and numbers'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Coupon name must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Coupon name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  
  body('discountType')
    .optional()
    .isIn(['percentage', 'fixed', 'free_shipping'])
    .withMessage('Discount type must be percentage, fixed, or free_shipping'),
  
  body('discountValue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positive number'),
  
  body('minimumOrderAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum order amount must be a positive number'),
  
  body('maximumDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum discount must be a positive number'),
  
  body('applicableCategories')
    .optional()
    .isArray()
    .withMessage('Applicable categories must be an array'),
  
  body('applicableCategories.*')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  
  body('excludedCategories')
    .optional()
    .isArray()
    .withMessage('Excluded categories must be an array'),
  
  body('excludedCategories.*')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  
  body('applicableProducts')
    .optional()
    .isArray()
    .withMessage('Applicable products must be an array'),
  
  body('applicableProducts.*')
    .optional()
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB ID'),
  
  body('excludedProducts')
    .optional()
    .isArray()
    .withMessage('Excluded products must be an array'),
  
  body('excludedProducts.*')
    .optional()
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB ID'),
  
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO date'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO date'),
  
  body('usageLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Usage limit must be a positive integer'),
  
  body('userUsageLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User usage limit must be a positive integer'),
  
  body('isFirstTimeOnly')
    .optional()
    .isBoolean()
    .withMessage('First time only must be a boolean'),
  
  body('isNewUserOnly')
    .optional()
    .isBoolean()
    .withMessage('New user only must be a boolean'),
  
  body('stackable')
    .optional()
    .isBoolean()
    .withMessage('Stackable must be a boolean'),
  
  body('priority')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Priority must be a non-negative integer'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active status must be a boolean')
];

// Validate query parameters for get coupons
exports.validateGetCoupons = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('active')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Active must be true or false'),
  
  query('search')
    .optional()
    .isString()
    .withMessage('Search must be a string')
    .isLength({ max: 100 })
    .withMessage('Search term must be less than 100 characters')
]; 