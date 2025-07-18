# Stylii Shopping Cart - React Client

This is the React client application for the Stylii Shopping Cart. It provides a modern, responsive user interface for interacting with the cart service.

## Features

- Modern React components using React Bootstrap
- Complete cart functionality (view, add, update, remove)
- Coupon application and removal
- Real-time cart summary updates
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- NPM or Yarn

### Installation

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm start
```

This will start the React development server on port 3001 and proxy API requests to the backend server running on port 3000.

### Building for Production

To build the app for production:
```
npm run build
```

This creates an optimized build in the `build` folder that can be served by the backend Express server.

## Project Structure

- `src/components/` - React components
- `src/App.js` - Main application component with routing
- `src/index.js` - Entry point for React application

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Runs the test suite
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Integration with Backend

The React app integrates with the backend cart service through API calls. The `proxy` setting in `package.json` forwards API requests to the backend server during development. 