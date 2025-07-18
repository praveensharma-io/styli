/**
 * Simulated authentication middleware
 * In a real app, this would verify JWT tokens, session cookies, etc.
 */
exports.authenticate = (req, res, next) => {
  // For demonstration, we'll attach a mock user to the request
  // In a real app, this would verify authentication tokens
  req.user = {
    id: '60d21b4667d0d8992e610c85', // Mock MongoDB ObjectId
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe'
  };
  
  next();
};

/**
 * Error handler for unauthorized access
 */
exports.handleAuthError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  next(err);
}; 