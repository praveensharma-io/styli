const Product = require('../models/Product');

const sampleProducts = [
  {
    name: "Men White Regular Fit Waffle Knit Shorts",
    brand: "STYLI",
    description: "Regular fit waffle knit shorts perfect for casual wear. Made from high-quality cotton blend for maximum comfort.",
    price: 42,
    salePrice: 21,
    originalPrice: 42,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&crop=center&flip=h"
    ],
    category: "Shorts",
    stock: 10,
    colors: [
      {
        name: "White",
        price: 42,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80&h=80&fit=crop&crop=center",
        stock: 5
      },
      {
        name: "Navy",
        price: 29,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80&h=80&fit=crop&crop=center&sat=-50&hue=240",
        stock: 3
      },
      {
        name: "Grey",
        price: 38,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80&h=80&fit=crop&crop=center&sat=-30&brightness=0.7",
        stock: 2
      }
    ],
    sizes: [
      { name: "S", stock: 4 },
      { name: "M", stock: 2 },
      { name: "L", stock: 2 },
      { name: "XL", stock: 0 },
      { name: "XXL", stock: 1 }
    ],
    isBestseller: true,
    loyaltyPoints: 8,
    deliveryDate: "Mon, 21st Jul",
    location: "Dubai",
    isActive: true
  },
  {
    name: "FAV Polo T-Shirt with Short Sleeves",
    brand: "FAV",
    description: "Classic polo t-shirt with short sleeves. Perfect for casual and semi-formal occasions.",
    price: 39,
    salePrice: 31,
    originalPrice: 39,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center&flip=h"
    ],
    category: "T-Shirts",
    stock: 15,
    colors: [
      {
        name: "Beige",
        price: 39,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop&crop=center",
        stock: 8
      },
      {
        name: "Brown",
        price: 39,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop&crop=center&sat=-20&hue=30",
        stock: 7
      }
    ],
    sizes: [
      { name: "S", stock: 3 },
      { name: "M", stock: 5 },
      { name: "L", stock: 4 },
      { name: "XL", stock: 2 },
      { name: "XXL", stock: 1 }
    ],
    isBestseller: false,
    loyaltyPoints: 6,
    deliveryDate: "Tue, 22nd Jul",
    location: "Dubai",
    isActive: true
  },
  {
    name: "Mascln Sassafras Men Pink Waffle Textured Oversize T-Shirt",
    brand: "Mascln Sassafras",
    description: "Oversized waffle textured t-shirt in pink. Trendy and comfortable for everyday wear.",
    price: 97,
    salePrice: 97,
    originalPrice: 97,
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop&crop=center&flip=h"
    ],
    category: "T-Shirts",
    stock: 8,
    colors: [
      {
        name: "Pink",
        price: 97,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=80&h=80&fit=crop&crop=center",
        stock: 8
      }
    ],
    sizes: [
      { name: "S", stock: 2 },
      { name: "M", stock: 3 },
      { name: "L", stock: 2 },
      { name: "XL", stock: 1 },
      { name: "XXL", stock: 0 }
    ],
    isBestseller: true,
    loyaltyPoints: 12,
    deliveryDate: "Wed, 23rd Jul",
    location: "Dubai",
    isActive: true
  },
  {
    name: "Mascln Sassafras Men Pink Waffle Textured Straight Shorts",
    brand: "Mascln Sassafras",
    description: "Matching straight-cut shorts with waffle texture. Perfect companion to the oversize t-shirt.",
    price: 54,
    salePrice: 54,
    originalPrice: 54,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&crop=center&sat=20&hue=300",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&crop=center&sat=20&hue=300&flip=h"
    ],
    category: "Shorts",
    stock: 6,
    colors: [
      {
        name: "Pink",
        price: 54,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80&h=80&fit=crop&crop=center&sat=20&hue=300",
        stock: 6
      }
    ],
    sizes: [
      { name: "S", stock: 1 },
      { name: "M", stock: 2 },
      { name: "L", stock: 2 },
      { name: "XL", stock: 1 },
      { name: "XXL", stock: 0 }
    ],
    isBestseller: false,
    loyaltyPoints: 7,
    deliveryDate: "Wed, 23rd Jul",
    location: "Dubai",
    isActive: true
  }
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);
    
    // Log the product IDs for testing
    insertedProducts.forEach(product => {
      console.log(`Product: ${product.name} - ID: ${product._id}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

module.exports = { seedProducts }; 