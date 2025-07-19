exports.authenticate = (req, res, next) => {
  req.user = {
    id: '60d21b4667d0d8992e610c85',
    email: 'user@example.com',
    firstName: 'Praveen',
    lastName: 'Sharma'
  };
  
  next();
}; 