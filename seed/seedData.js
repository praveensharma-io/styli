const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
require('dotenv').config();

// Sample data
const users = [
  {
    _id: '60d21b4667d0d8992e610c85', // This ID matches the one in authMiddleware
    email: 'user@example.com',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'John',
    lastName: 'Doe',
    addresses: [
      {
        addressType: 'shipping',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA',
        isDefault: true
      }
    ],
    phoneNumber: '123-456-7890',
    isActive: true
  }
];

const products = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Men\'s Classic T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    price: 19.99,
    salePrice: null,
    images: ['https://via.placeholder.com/400x300?text=Men+Tshirt'],
    category: 'Clothing',
    stock: 100,
    attributes: {
      colors: ['Black', 'White', 'Gray', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Women\'s Slim Fit Jeans',
    description: 'Stylish slim-fit jeans with stretch for maximum comfort. Perfect for casual and semi-formal occasions.',
    price: 49.99,
    salePrice: 39.99,
    images: ['https://via.placeholder.com/400x300?text=Women+Jeans'],
    category: 'Clothing',
    stock: 75,
    attributes: {
      colors: ['Blue', 'Black', 'Gray'],
      sizes: ['26', '28', '30', '32', '34']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Running Shoes - Pro Series',
    description: 'Lightweight cushioned running shoes with advanced breathability technology. Ideal for long-distance running.',
    price: 89.99,
    salePrice: null,
    images: ['https://via.placeholder.com/400x300?text=Running+Shoes'],
    category: 'Footwear',
    stock: 50,
    attributes: {
      colors: ['Black/White', 'Gray/Blue', 'Red/White'],
      sizes: ['7', '8', '9', '10', '11', '12']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Laptop Backpack',
    description: 'Durable backpack with dedicated laptop compartment and multiple storage pockets. Water-resistant material.',
    price: 59.99,
    salePrice: 49.99,
    images: ['https://via.placeholder.com/400x300?text=Laptop+Backpack'],
    category: 'Accessories',
    stock: 30,
    attributes: {
      colors: ['Black', 'Navy', 'Gray']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 129.99,
    salePrice: 99.99,
    images: ['https://via.placeholder.com/400x300?text=Wireless+Headphones'],
    category: 'Electronics',
    stock: 25,
    attributes: {
      colors: ['Black', 'White', 'Blue']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance up to 50m.',
    price: 199.99,
    salePrice: 179.99,
    images: ['https://via.placeholder.com/400x300?text=Smart+Watch'],
    category: 'Electronics',
    stock: 15,
    attributes: {
      colors: ['Black', 'Silver', 'Rose Gold']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Women\'s Summer Dress',
    description: 'Elegant summer dress made from lightweight, breathable fabric. Perfect for warm weather occasions.',
    price: 45.99,
    salePrice: 35.99,
    images: ['https://via.placeholder.com/400x300?text=Summer+Dress'],
    category: 'Clothing',
    stock: 40,
    attributes: {
      colors: ['Floral', 'Blue', 'Pink', 'White'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Men\'s Formal Shirt',
    description: 'Classic formal shirt suitable for office wear and special occasions. Wrinkle-resistant fabric.',
    price: 35.99,
    salePrice: null,
    images: ['https://via.placeholder.com/400x300?text=Formal+Shirt'],
    category: 'Clothing',
    stock: 60,
    attributes: {
      colors: ['White', 'Blue', 'Pink', 'Striped'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Casual Sneakers',
    description: 'Comfortable casual sneakers with cushioned sole and breathable upper. Perfect for everyday wear.',
    price: 65.99,
    salePrice: 55.99,
    images: ['https://via.placeholder.com/400x300?text=Casual+Sneakers'],
    category: 'Footwear',
    stock: 35,
    attributes: {
      colors: ['White', 'Black', 'Gray', 'Red'],
      sizes: ['7', '8', '9', '10', '11']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots and RFID protection. Classic design.',
    price: 29.99,
    salePrice: null,
    images: ['https://via.placeholder.com/400x300?text=Leather+Wallet'],
    category: 'Accessories',
    stock: 45,
    attributes: {
      colors: ['Brown', 'Black', 'Tan']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Portable Charger',
    description: 'High-capacity portable charger with fast charging technology. Compatible with all devices.',
    price: 39.99,
    salePrice: 29.99,
    images: ['https://via.placeholder.com/400x300?text=Portable+Charger'],
    category: 'Electronics',
    stock: 20,
    attributes: {
      colors: ['Black', 'White', 'Blue']
    },
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with cushioning for comfortable practice. Eco-friendly materials.',
    price: 24.99,
    salePrice: 19.99,
    images: ['https://via.placeholder.com/400x300?text=Yoga+Mat'],
    category: 'Sports',
    stock: 55,
    attributes: {
      colors: ['Purple', 'Blue', 'Green', 'Pink']
    },
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stylii');
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample users
    await User.insertMany(users);
    console.log('Sample users created');

    // Insert sample products
    await Product.insertMany(products);
    console.log('Sample products created');

    // Create a sample cart
    const sampleCart = new Cart({
      userId: users[0]._id,
      items: [
        {
          productId: products[0]._id,
          name: products[0].name,
          price: products[0].price,
          salePrice: products[0].salePrice,
          quantity: 2,
          image: products[0].images[0],
          attributes: {
            color: 'Black',
            size: 'M'
          }
        },
        {
          productId: products[1]._id,
          name: products[1].name,
          price: products[1].price,
          salePrice: products[1].salePrice,
          quantity: 1,
          image: products[1].images[0],
          attributes: {
            color: 'Blue',
            size: '28'
          }
        }
      ]
    });

    await sampleCart.save();
    console.log('Sample cart created');

    console.log('Database seeded successfully');
    console.log(`Created ${products.length} products across ${new Set(products.map(p => p.category)).size} categories`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

seedDatabase(); 