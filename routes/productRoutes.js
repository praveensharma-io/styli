const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Get categories
router.get('/categories', productController.getCategories);

module.exports = router; 