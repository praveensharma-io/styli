const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { handleAuthError } = require('./middlewares/authMiddleware');
require('dotenv').config();

// Import routes
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize Express app
const app = express();

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stylii', {
  // MongoDB connection options
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Apply middleware
app.use(helmet({ 
  contentSecurityPolicy: false // Disable CSP for development
})); 
app.use(compression()); // Compress responses
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logging


// Apply rate limiting to API endpoints
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api/', apiLimiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'cart-service' });
});

// API Routes
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Cart Service API');
});

// Error handling middleware
app.use(handleAuthError);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Don't crash the server, just log the error
});

module.exports = app;
