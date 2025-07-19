const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const couponValidator = require('../middlewares/couponValidator');

// Get all coupons
router.get('/', couponController.getAllCoupons);

// Get available coupons for user
router.get('/available', couponController.getAvailableCoupons);

// Validate coupon code
router.post('/validate', couponValidator.validateCouponCode, couponController.validateCoupon);

// Get coupon by ID
router.get('/:id', couponController.getCouponById);

// Create new coupon
router.post('/', couponValidator.validateCreateCoupon, couponController.createCoupon);

// Update coupon
router.put('/:id', couponValidator.validateUpdateCoupon, couponController.updateCoupon);

// Delete coupon
router.delete('/:id', couponController.deleteCoupon);

router.get('/test-can-use/:couponId/:userId', couponController.testCanUserUse);

module.exports = router; 