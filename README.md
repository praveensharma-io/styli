# Stylii Shopping Cart Service

A production-ready cart microservice for an e-commerce platform using Node.js, Express, MongoDB, and React.

## Features

- **RESTful API**: Complete set of CRUD operations for cart management
- **MongoDB Integration**: Efficient data storage with Mongoose schemas
- **Cart Operations**: Add, update, remove items, apply/remove coupons
- **Performance Optimized**: Database indexing, rate limiting, compression
- **Security**: Helmet security headers, input validation
- **React Frontend**: Modern, responsive UI built with React and Bootstrap
- **Component-Based Architecture**: Reusable React components for maintainability

## Setup

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or remote)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/stylii.git
cd stylii
```

2. Install server dependencies
```
npm install
```

3. Install client dependencies
```
npm run client-install
```

4. Create a config.env file in the root directory with the following:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/stylii

# In production, change this to a secure key
JWT_SECRET=dev_jwt_secret_key
JWT_EXPIRES_IN=7d

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX=100
```

5. Seed the database with sample data
```
npm run seed
```

6. Run the development server (backend only)
```
npm run dev
```

7. Run the full development environment (backend + frontend)
```
npm run dev-full
```

## Project Structure

```
stylii/
  ├── app.js                 # Express application entry point
  ├── package.json           # Node.js dependencies and scripts
  ├── config.env             # Environment variables
  ├── README.md              # Project documentation
  ├── controllers/           # API controllers
  ├── middlewares/           # Express middlewares
  ├── models/                # Mongoose models
  ├── routes/                # Express routes
  ├── seed/                  # Database seed scripts
  ├── public/                # Static files
  └── client/               # React client application
      ├── package.json       # React dependencies
      ├── public/            # Public assets
      └── src/               # React components and logic
```

## API Endpoints

### Cart Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/items` | Add item to cart |
| PUT | `/api/cart/items/:itemId` | Update cart item quantity |
| DELETE | `/api/cart/items/:itemId` | Remove item from cart |
| DELETE | `/api/cart` | Clear cart (remove all items) |
| GET | `/api/cart/summary` | Get cart summary (item count and total) |

### Coupon Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/coupons` | Apply coupon to cart |
| DELETE | `/api/cart/coupons/:couponCode` | Remove coupon from cart |

## Data Model

### Cart Schema

```javascript
{
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      salePrice: Number,
      quantity: Number,
      image: String,
      attributes: Map<String, String>
    }
  ],
  subtotal: Number,
  totalDiscount: Number,
  total: Number,
  appliedCoupons: [
    {
      code: String,
      discountAmount: Number,
      type: String
    }
  ],
  status: String,
  metadata: Map<String, Mixed>
}
```

## Architecture

### Database
- MongoDB with Mongoose ODM
- Optimized indexing on frequently queried fields
- Pre-save hooks for calculating totals

### Backend
- Express.js RESTful API
- Modular architecture (controllers, routes, models, middleware)
- Input validation with express-validator
- Error handling middleware
- Rate limiting for API protection

### Frontend
- React with functional components and hooks
- React Bootstrap for responsive UI
- React Router for navigation
- Axios for API requests
- Component-based architecture

## Production Deployment

To build the app for production:

```
npm run build
```

This will create optimized bundles for the React frontend that can be served by the Express backend.

## Production Considerations

- **Caching**: Implement Redis for caching frequently accessed cart data
- **Logging**: Add structured logging for production monitoring
- **Authentication**: Implement proper JWT authentication
- **Testing**: Add unit and integration tests
- **CI/CD**: Set up automated testing and deployment pipeline
- **Monitoring**: Add health checks and monitoring endpoints
- **Documentation**: Complete API documentation with Swagger/OpenAPI # styli
