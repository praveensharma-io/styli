const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/create', orderController.createOrder);

// Get user's orders
router.get('/user/:userId', orderController.getUserOrders);

// Get order details
router.get('/:orderId', orderController.getOrderDetails);

// Update order status
router.patch('/:orderId/status', orderController.updateOrderStatus);

module.exports = router; 