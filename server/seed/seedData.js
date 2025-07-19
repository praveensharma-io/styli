const mongoose = require('mongoose');
const Product = require('../models/Product');
const { seedCoupons } = require('./couponSeed');

mongoose.connect('mongodb://localhost:27017/styli', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  
  {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "description": "Premium noise-canceling wireless headphones with 30-hour battery life.",
    "price": 199.99,
    "salePrice": 159.99,
    "brand": "SoundMax",
    "category": "Electronics",
    "stock": 28,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "One Size", "stock": 28}
    ],
    "colors": [
      {"name": "Black", "price": 159.99, "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop", "stock": 15},
      {"name": "White", "price": 159.99, "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop", "stock": 13}
    ],
    "tags": ["wireless", "premium", "noise-canceling"],
    "rating": 4.7,
    "reviews": 342
  },
  {
    "id": 2,
    "name": "Smart Fitness Watch",
    "description": "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
    "price": 299.99,
    "salePrice": 249.99,
    "brand": "FitTech",
    "category": "Electronics",
    "stock": 45,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "38mm", "stock": 20},
      {"name": "42mm", "stock": 25}
    ],
    "colors": [
      {"name": "Space Gray", "price": 249.99, "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop", "stock": 25},
      {"name": "Rose Gold", "price": 249.99, "image": "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=500&h=600&fit=crop", "stock": 20}
    ],
    "tags": ["fitness", "smartwatch", "gps", "health"],
    "rating": 4.5,
    "reviews": 189
  },
  {
    "id": 3,
    "name": "Organic Cotton T-Shirt",
    "description": "Comfortable organic cotton t-shirt with sustainable manufacturing.",
    "price": 29.99,
    "salePrice": 24.99,
    "brand": "EcoWear",
    "category": "Clothing",
    "stock": 120,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341338985-b2a5ad1ce5b1?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "XS", "stock": 15},
      {"name": "S", "stock": 25},
      {"name": "M", "stock": 35},
      {"name": "L", "stock": 30},
      {"name": "XL", "stock": 15}
    ],
    "colors": [
      {"name": "Navy Blue", "price": 24.99, "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop", "stock": 60},
      {"name": "Forest Green", "price": 24.99, "image": "https://images.unsplash.com/photo-1503341338985-b2a5ad1ce5b1?w=500&h=600&fit=crop", "stock": 60}
    ],
    "tags": ["organic", "cotton", "sustainable", "basic"],
    "rating": 4.3,
    "reviews": 567
  },
  {
    "id": 4,
    "name": "Ceramic Coffee Mug Set",
    "description": "Set of 4 handcrafted ceramic coffee mugs with unique glazed finish.",
    "price": 49.99,
    "salePrice": 39.99,
    "brand": "ArtisanCraft",
    "category": "Home & Kitchen",
    "stock": 85,
    "images": [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "12oz", "stock": 85}
    ],
    "colors": [
      {"name": "Earth Tones", "price": 39.99, "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=600&fit=crop", "stock": 45},
      {"name": "Ocean Blue", "price": 39.99, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=600&fit=crop", "stock": 40}
    ],
    "tags": ["ceramic", "handcrafted", "coffee", "set"],
    "rating": 4.8,
    "reviews": 123
  },
  {
    "id": 5,
    "name": "Leather Crossbody Bag",
    "description": "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
    "price": 129.99,
    "salePrice": 99.99,
    "brand": "LeatherCraft Co.",
    "category": "Accessories",
    "stock": 32,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "One Size", "stock": 32}
    ],
    "colors": [
      {"name": "Cognac Brown", "price": 99.99, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop", "stock": 18},
      {"name": "Black", "price": 99.99, "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop", "stock": 14}
    ],
    "tags": ["leather", "crossbody", "genuine", "handmade"],
    "rating": 4.6,
    "reviews": 89
  },
  {
    "id": 6,
    "name": "Wireless Charging Pad",
    "description": "Fast wireless charging pad compatible with all Qi-enabled devices.",
    "price": 39.99,
    "salePrice": 29.99,
    "brand": "PowerTech",
    "category": "Electronics",
    "stock": 156,
    "images": [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard", "stock": 156}
    ],
    "colors": [
      {"name": "Black", "price": 29.99, "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop", "stock": 156}
    ],
    "tags": ["wireless", "charging", "qi", "fast"],
    "rating": 4.4,
    "reviews": 234
  },
  {
    "id": 7,
    "name": "Yoga Mat Premium",
    "description": "Non-slip premium yoga mat with extra cushioning and carrying strap.",
    "price": 89.99,
    "salePrice": 69.99,
    "brand": "ZenFlow",
    "category": "Sports & Fitness",
    "stock": 78,
    "images": [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-ce19bc8eb35a?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard (68in)", "stock": 78}
    ],
    "colors": [
      {"name": "Purple", "price": 69.99, "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop", "stock": 40},
      {"name": "Teal", "price": 69.99, "image": "https://images.unsplash.com/photo-1506629905607-ce19bc8eb35a?w=500&h=600&fit=crop", "stock": 38}
    ],
    "tags": ["yoga", "fitness", "non-slip", "premium"],
    "rating": 4.7,
    "reviews": 167
  },
  {
    "id": 8,
    "name": "Scented Candle Collection",
    "description": "Set of 3 premium soy wax candles with relaxing scents and 45-hour burn time each.",
    "price": 59.99,
    "salePrice": 49.99,
    "brand": "Aromatherapy Co.",
    "category": "Home & Kitchen",
    "stock": 94,
    "images": [
      "https://images.unsplash.com/photo-1602874801006-bc7d9e0ee5fb?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "8oz each", "stock": 94}
    ],
    "colors": [
      {"name": "Spa Collection", "price": 49.99, "image": "https://images.unsplash.com/photo-1602874801006-bc7d9e0ee5fb?w=500&h=600&fit=crop", "stock": 50},
      {"name": "Vanilla Dreams", "price": 49.99, "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop", "stock": 44}
    ],
    "tags": ["candles", "soy wax", "aromatherapy", "relaxing"],
    "rating": 4.5,
    "reviews": 198
  },
  {
    "id": 9,
    "name": "Running Shoes",
    "description": "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
    "price": 149.99,
    "salePrice": 119.99,
    "brand": "RunMax",
    "category": "Sports & Fitness",
    "stock": 67,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "7", "stock": 8},
      {"name": "8", "stock": 12},
      {"name": "9", "stock": 15},
      {"name": "10", "stock": 18},
      {"name": "11", "stock": 10},
      {"name": "12", "stock": 4}
    ],
    "colors": [
      {"name": "Black/White", "price": 119.99, "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop", "stock": 35},
      {"name": "Navy/Orange", "price": 119.99, "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop", "stock": 32}
    ],
    "tags": ["running", "lightweight", "cushioning", "breathable"],
    "rating": 4.6,
    "reviews": 312
  },
  {
    "id": 10,
    "name": "Stainless Steel Water Bottle",
    "description": "Double-wall insulated water bottle that keeps drinks cold for 24 hours.",
    "price": 34.99,
    "salePrice": 27.99,
    "brand": "HydroLife",
    "category": "Sports & Fitness",
    "stock": 143,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "16oz", "stock": 50},
      {"name": "24oz", "stock": 93}
    ],
    "colors": [
      {"name": "Matte Black", "price": 27.99, "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop", "stock": 75},
      {"name": "Ocean Blue", "price": 27.99, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop", "stock": 68}
    ],
    "tags": ["water bottle", "insulated", "stainless steel", "eco-friendly"],
    "rating": 4.8,
    "reviews": 456
  },
  {
    "id": 11,
    "name": "Desktop Plant Terrarium",
    "description": "Modern glass terrarium with succulent plants, perfect for office or home decor.",
    "price": 45.99,
    "salePrice": 35.99,
    "brand": "GreenSpace",
    "category": "Home & Kitchen",
    "stock": 56,
    "images": [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Small", "stock": 32},
      {"name": "Medium", "stock": 24}
    ],
    "colors": [
      {"name": "Clear Glass", "price": 35.99, "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop", "stock": 30},
      {"name": "Geometric", "price": 35.99, "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=600&fit=crop", "stock": 26}
    ],
    "tags": ["plants", "terrarium", "succulent", "decor"],
    "rating": 4.4,
    "reviews": 78
  },
  {
    "id": 12,
    "name": "Bluetooth Speaker Portable",
    "description": "Waterproof portable speaker with 360-degree sound and 12-hour battery.",
    "price": 79.99,
    "salePrice": 59.99,
    "brand": "SoundWave",
    "category": "Electronics",
    "stock": 89,
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Compact", "stock": 89}
    ],
    "colors": [
      {"name": "Midnight Black", "price": 59.99, "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop", "stock": 45},
      {"name": "Ocean Blue", "price": 59.99, "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=600&fit=crop", "stock": 44}
    ],
    "tags": ["bluetooth", "portable", "waterproof", "360-sound"],
    "rating": 4.5,
    "reviews": 267
  },
  {
    "id": 13,
    "name": "Silk Scarf Designer",
    "description": "Luxurious silk scarf with hand-painted floral design and premium finish.",
    "price": 89.99,
    "salePrice": 69.99,
    "brand": "Elegance",
    "category": "Accessories",
    "stock": 24,
    "images": [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "90cm x 90cm", "stock": 24}
    ],
    "colors": [
      {"name": "Rose Garden", "price": 69.99, "image": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&h=600&fit=crop", "stock": 12},
      {"name": "Abstract Blue", "price": 69.99, "image": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop", "stock": 12}
    ],
    "tags": ["silk", "designer", "luxury", "hand-painted"],
    "rating": 4.7,
    "reviews": 43
  },
  {
    "id": 14,
    "name": "Gaming Mechanical Keyboard",
    "description": "RGB backlit mechanical keyboard with tactile switches and programmable keys.",
    "price": 159.99,
    "salePrice": 129.99,
    "brand": "GamePro",
    "category": "Electronics",
    "stock": 38,
    "images": [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Full Size", "stock": 20},
      {"name": "Compact", "stock": 18}
    ],
    "colors": [
      {"name": "RGB Black", "price": 129.99, "image": "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=600&fit=crop", "stock": 22},
      {"name": "White LED", "price": 129.99, "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=600&fit=crop", "stock": 16}
    ],
    "tags": ["gaming", "mechanical", "rgb", "programmable"],
    "rating": 4.6,
    "reviews": 156
  },
  {
    "id": 15,
    "name": "Artisan Soap Set",
    "description": "Natural handmade soap set with organic ingredients and essential oils.",
    "price": 29.99,
    "salePrice": 24.99,
    "brand": "Pure Essence",
    "category": "Beauty & Health",
    "stock": 112,
    "images": [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607301421394-491cf764ffde?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Set of 4", "stock": 112}
    ],
    "colors": [
      {"name": "Lavender Collection", "price": 24.99, "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop", "stock": 58},
      {"name": "Citrus Burst", "price": 24.99, "image": "https://images.unsplash.com/photo-1607301421394-491cf764ffde?w=500&h=600&fit=crop", "stock": 54}
    ],
    "tags": ["handmade", "natural", "organic", "essential oils"],
    "rating": 4.6,
    "reviews": 289
  },
  {
    "id": 16,
    "name": "Reading Glasses Blue Light",
    "description": "Stylish reading glasses with blue light filtering technology for digital eye strain.",
    "price": 49.99,
    "salePrice": 39.99,
    "brand": "VisionCare",
    "category": "Accessories",
    "stock": 76,
    "images": [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "+1.0", "stock": 15},
      {"name": "+1.5", "stock": 20},
      {"name": "+2.0", "stock": 25},
      {"name": "+2.5", "stock": 16}
    ],
    "colors": [
      {"name": "Tortoise Shell", "price": 39.99, "image": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=600&fit=crop", "stock": 40},
      {"name": "Classic Black", "price": 39.99, "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop", "stock": 36}
    ],
    "tags": ["reading glasses", "blue light", "digital", "eye strain"],
    "rating": 4.3,
    "reviews": 134
  },
  {
    "id": 17,
    "name": "Ceramic Dinner Plate Set",
    "description": "Modern ceramic dinner plates set with matte finish, dishwasher and microwave safe.",
    "price": 79.99,
    "salePrice": 64.99,
    "brand": "TableCraft",
    "category": "Home & Kitchen",
    "stock": 45,
    "images": [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Set of 6", "stock": 45}
    ],
    "colors": [
      {"name": "Sage Green", "price": 64.99, "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop", "stock": 23},
      {"name": "Cream White", "price": 64.99, "image": "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=600&fit=crop", "stock": 22}
    ],
    "tags": ["ceramic", "dinner plates", "modern", "dishwasher safe"],
    "rating": 4.5,
    "reviews": 87
  },
  {
    "id": 18,
    "name": "Wireless Gaming Mouse",
    "description": "High-precision wireless gaming mouse with customizable RGB lighting and 16000 DPI.",
    "price": 89.99,
    "salePrice": 74.99,
    "brand": "GamePro",
    "category": "Electronics",
    "stock": 52,
    "images": [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard", "stock": 52}
    ],
    "colors": [
      {"name": "Matte Black", "price": 74.99, "image": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=600&fit=crop", "stock": 28},
      {"name": "RGB Gaming", "price": 74.99, "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=600&fit=crop", "stock": 24}
    ],
    "tags": ["wireless", "gaming", "high-precision", "rgb"],
    "rating": 4.7,
    "reviews": 203
  },
  {
    "id": 19,
    "name": "Bamboo Cutting Board Set",
    "description": "Sustainable bamboo cutting board set with different sizes and built-in handles.",
    "price": 39.99,
    "salePrice": 32.99,
    "brand": "EcoKitchen",
    "category": "Home & Kitchen",
    "stock": 68,
    "images": [
      "https://images.unsplash.com/photo-1594736797933-d0701ba6fe65?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Set of 3", "stock": 68}
    ],
    "colors": [
      {"name": "Natural Bamboo", "price": 32.99, "image": "https://images.unsplash.com/photo-1594736797933-d0701ba6fe65?w=500&h=600&fit=crop", "stock": 68}
    ],
    "tags": ["bamboo", "sustainable", "cutting board", "eco-friendly"],
    "rating": 4.6,
    "reviews": 145
  },
  {
    "id": 20,
    "name": "Premium Throw Pillow",
    "description": "Luxurious velvet throw pillow with down alternative fill and hidden zipper.",
    "price": 34.99,
    "salePrice": 27.99,
    "brand": "ComfortHome",
    "category": "Home & Kitchen",
    "stock": 89,
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "18x18 inches", "stock": 45},
      {"name": "20x20 inches", "stock": 44}
    ],
    "colors": [
      {"name": "Emerald Green", "price": 27.99, "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop", "stock": 48},
      {"name": "Dusty Rose", "price": 27.99, "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop", "stock": 41}
    ],
    "tags": ["velvet", "throw pillow", "luxury", "home decor"],
    "rating": 4.4,
    "reviews": 112
  },
  {
    "id": 21,
    "name": "Wireless Earbuds Pro",
    "description": "True wireless earbuds with active noise cancellation and wireless charging case.",
    "price": 179.99,
    "salePrice": 149.99,
    "brand": "AudioMax",
    "category": "Electronics",
    "stock": 43,
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "One Size", "stock": 43}
    ],
    "colors": [
      {"name": "Pearl White", "price": 149.99, "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=600&fit=crop", "stock": 22},
      {"name": "Space Black", "price": 149.99, "image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop", "stock": 21}
    ],
    "tags": ["wireless", "earbuds", "noise-cancellation", "charging case"],
    "rating": 4.8,
    "reviews": 378
  },
  {
    "id": 22,
    "name": "Resistance Band Set",
    "description": "Complete resistance band workout set with 5 bands, handles, and door anchor.",
    "price": 49.99,
    "salePrice": 39.99,
    "brand": "FitnessPro",
    "category": "Sports & Fitness",
    "stock": 95,
    "images": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Complete Set", "stock": 95}
    ],
    "colors": [
      {"name": "Multi-Color", "price": 39.99, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop", "stock": 95}
    ],
    "tags": ["resistance bands", "workout", "fitness", "home gym"],
    "rating": 4.5,
    "reviews": 267
  },
  {
    "id": 23,
    "name": "Vintage Denim Jacket",
    "description": "Classic vintage-style denim jacket with distressed details and relaxed fit.",
    "price": 79.99,
    "salePrice": 64.99,
    "brand": "RetroStyle",
    "category": "Clothing",
    "stock": 56,
    "images": [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "XS", "stock": 6},
      {"name": "S", "stock": 12},
      {"name": "M", "stock": 18},
      {"name": "L", "stock": 15},
      {"name": "XL", "stock": 5}
    ],
    "colors": [
      {"name": "Light Wash", "price": 64.99, "image": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop", "stock": 28},
      {"name": "Dark Indigo", "price": 64.99, "image": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop", "stock": 28}
    ],
    "tags": ["denim", "vintage", "jacket", "distressed"],
    "rating": 4.3,
    "reviews": 89
  },
  {
    "id": 24,
    "name": "LED Desk Lamp Adjustable",
    "description": "Modern LED desk lamp with touch controls, USB charging port, and adjustable brightness.",
    "price": 69.99,
    "salePrice": 54.99,
    "brand": "BrightWork",
    "category": "Home & Kitchen",
    "stock": 72,
    "images": [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard", "stock": 72}
    ],
    "colors": [
      {"name": "Matte Black", "price": 54.99, "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop", "stock": 40},
      {"name": "Silver", "price": 54.99, "image": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop", "stock": 32}
    ],
    "tags": ["led", "desk lamp", "adjustable", "usb charging"],
    "rating": 4.6,
    "reviews": 156
  },
  {
    "id": 25,
    "name": "Protein Powder Vanilla",
    "description": "Premium whey protein powder with natural vanilla flavor and 25g protein per serving.",
    "price": 59.99,
    "salePrice": 49.99,
    "brand": "NutriMax",
    "category": "Beauty & Health",
    "stock": 84,
    "images": [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "2lbs", "stock": 45},
      {"name": "5lbs", "stock": 39}
    ],
    "colors": [
      {"name": "Vanilla", "price": 49.99, "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=600&fit=crop", "stock": 84}
    ],
    "tags": ["protein", "whey", "vanilla", "fitness supplement"],
    "rating": 4.4,
    "reviews": 234
  },
  {
    "id": 26,
    "name": "Wooden Wall Clock",
    "description": "Handcrafted wooden wall clock with silent movement and modern minimalist design.",
    "price": 89.99,
    "salePrice": 69.99,
    "brand": "TimeCraft",
    "category": "Home & Kitchen",
    "stock": 31,
    "images": [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0701ba6fe65?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "12 inches", "stock": 18},
      {"name": "16 inches", "stock": 13}
    ],
    "colors": [
      {"name": "Natural Oak", "price": 69.99, "image": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=600&fit=crop", "stock": 17},
      {"name": "Walnut", "price": 69.99, "image": "https://images.unsplash.com/photo-1594736797933-d0701ba6fe65?w=500&h=600&fit=crop", "stock": 14}
    ],
    "tags": ["wooden", "wall clock", "handcrafted", "minimalist"],
    "rating": 4.7,
    "reviews": 67
  },
  {
    "id": 27,
    "name": "Wireless Phone Charger Stand",
    "description": "Fast wireless charging stand with adjustable viewing angle and LED indicator.",
    "price": 44.99,
    "salePrice": 34.99,
    "brand": "ChargeTech",
    "category": "Electronics",
    "stock": 98,
    "images": [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard", "stock": 98}
    ],
    "colors": [
      {"name": "Black", "price": 34.99, "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop", "stock": 52},
      {"name": "White", "price": 34.99, "image": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop", "stock": 46}
    ],
    "tags": ["wireless", "charging stand", "fast charge", "adjustable"],
    "rating": 4.5,
    "reviews": 189
  },
  {
    "id": 28,
    "name": "Essential Oil Diffuser",
    "description": "Ultrasonic essential oil diffuser with color-changing LED lights and timer function.",
    "price": 54.99,
    "salePrice": 42.99,
    "brand": "AromaZen",
    "category": "Home & Kitchen",
    "stock": 67,
    "images": [
      "https://images.unsplash.com/photo-1602874801006-bc7d9e0ee5fb?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "300ml", "stock": 67}
    ],
    "colors": [
      {"name": "Wood Grain", "price": 42.99, "image": "https://images.unsplash.com/photo-1602874801006-bc7d9e0ee5fb?w=500&h=600&fit=crop", "stock": 35},
      {"name": "Pure White", "price": 42.99, "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop", "stock": 32}
    ],
    "tags": ["essential oil", "diffuser", "ultrasonic", "led lights"],
    "rating": 4.6,
    "reviews": 278
  },
  {
    "id": 29,
    "name": "Memory Foam Pillow",
    "description": "Contour memory foam pillow with cooling gel layer and bamboo cover.",
    "price": 79.99,
    "salePrice": 64.99,
    "brand": "SleepWell",
    "category": "Home & Kitchen",
    "stock": 54,
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard", "stock": 32},
      {"name": "King", "stock": 22}
    ],
    "colors": [
      {"name": "White", "price": 64.99, "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop", "stock": 54}
    ],
    "tags": ["memory foam", "cooling gel", "bamboo", "contour"],
    "rating": 4.8,
    "reviews": 445
  },
  {
    "id": 30,
    "name": "Laptop Stand Aluminum",
    "description": "Adjustable aluminum laptop stand with heat dissipation and ergonomic design.",
    "price": 49.99,
    "salePrice": 39.99,
    "brand": "WorkSpace",
    "category": "Electronics",
    "stock": 76,
    "images": [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Universal", "stock": 76}
    ],
    "colors": [
      {"name": "Space Gray", "price": 39.99, "image": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=600&fit=crop", "stock": 42},
      {"name": "Silver", "price": 39.99, "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=600&fit=crop", "stock": 34}
    ],
    "tags": ["laptop stand", "aluminum", "adjustable", "ergonomic"],
    "rating": 4.7,
    "reviews": 234
  },
  {
    "id": 31,
    "name": "Sunglasses Polarized",
    "description": "Classic aviator sunglasses with polarized lenses and UV400 protection.",
    "price": 89.99,
    "salePrice": 69.99,
    "brand": "SunShield",
    "category": "Accessories",
    "stock": 63,
    "images": [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Medium", "stock": 35},
      {"name": "Large", "stock": 28}
    ],
    "colors": [
      {"name": "Gold Frame", "price": 69.99, "image": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=600&fit=crop", "stock": 32},
      {"name": "Black Frame", "price": 69.99, "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop", "stock": 31}
    ],
    "tags": ["sunglasses", "polarized", "aviator", "uv protection"],
    "rating": 4.5,
    "reviews": 167
  },
  {
    "id": 32,
    "name": "Smart Home Security Camera",
    "description": "WiFi security camera with 1080p HD, night vision, and smartphone app control.",
    "price": 129.99,
    "salePrice": 99.99,
    "brand": "SecureHome",
    "category": "Electronics",
    "stock": 41,
    "images": [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Indoor", "stock": 25},
      {"name": "Outdoor", "stock": 16}
    ],
    "colors": [
      {"name": "White", "price": 99.99, "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=600&fit=crop", "stock": 23},
      {"name": "Black", "price": 99.99, "image": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop", "stock": 18}
    ],
    "tags": ["security camera", "wifi", "1080p", "night vision"],
    "rating": 4.4,
    "reviews": 123
  },
  {
    "id": 33,
    "name": "Cookbook Stand Bamboo",
    "description": "Adjustable bamboo cookbook and tablet stand with splatter guard and page holders.",
    "price": 24.99,
    "salePrice": 19.99,
    "brand": "KitchenAid",
    "category": "Home & Kitchen",
    "stock": 87,
    "images": [
      "https://images.unsplash.com/photo-1594736797933-d0701ba6fe65?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Standard", "stock": 87}
    ],
    "colors": [
      {"name": "Natural Bamboo", "price": 19.99, "image": "https://images.unsplash.com/photo-1594736797933-d0701ba6fe65?w=500&h=600&fit=crop", "stock": 87}
    ],
    "tags": ["bamboo", "cookbook stand", "adjustable", "kitchen"],
    "rating": 4.6,
    "reviews": 234
  },
  {
    "id": 34,
    "name": "Skincare Face Serum",
    "description": "Anti-aging vitamin C serum with hyaluronic acid and natural botanical extracts.",
    "price": 39.99,
    "salePrice": 32.99,
    "brand": "GlowLab",
    "category": "Beauty & Health",
    "stock": 93,
    "images": [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607301421394-491cf764ffde?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "1oz", "stock": 93}
    ],
    "colors": [
      {"name": "Vitamin C", "price": 32.99, "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop", "stock": 93}
    ],
    "tags": ["skincare", "vitamin c", "anti-aging", "serum"],
    "rating": 4.7,
    "reviews": 389
  },
  {
    "id": 35,
    "name": "Portable Power Bank",
    "description": "20,000mAh portable power bank with fast charging and LED display for charge level.",
    "price": 49.99,
    "salePrice": 39.99,
    "brand": "PowerMax",
    "category": "Electronics",
    "stock": 78,
    "images": [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "20,000mAh", "stock": 78}
    ],
    "colors": [
      {"name": "Black", "price": 39.99, "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop", "stock": 42},
      {"name": "White", "price": 39.99, "image": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop", "stock": 36}
    ],
    "tags": ["power bank", "portable", "fast charging", "led display"],
    "rating": 4.5,
    "reviews": 267
  },
  {
    "id": 36,
    "name": "Garden Tool Set",
    "description": "Complete 10-piece garden tool set with ergonomic handles and storage bag.",
    "price": 69.99,
    "salePrice": 54.99,
    "brand": "GreenThumb",
    "category": "Home & Kitchen",
    "stock": 45,
    "images": [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "10-Piece Set", "stock": 45}
    ],
    "colors": [
      {"name": "Green Handles", "price": 54.99, "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop", "stock": 45}
    ],
    "tags": ["garden tools", "ergonomic", "10-piece", "storage bag"],
    "rating": 4.6,
    "reviews": 134
  },
  {
    "id": 37,
    "name": "Wireless Phone Stand",
    "description": "Adjustable wireless phone stand with fast charging and multi-angle viewing.",
    "price": 34.99,
    "salePrice": 27.99,
    "brand": "StandTech",
    "category": "Electronics",
    "stock": 112,
    "images": [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Universal", "stock": 112}
    ],
    "colors": [
      {"name": "Black", "price": 27.99, "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop", "stock": 58},
      {"name": "White", "price": 27.99, "image": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop", "stock": 54}
    ],
    "tags": ["wireless", "phone stand", "adjustable", "fast charging"],
    "rating": 4.4,
    "reviews": 198
  },
  {
    "id": 38,
    "name": "Insulated Travel Mug",
    "description": "Double-wall stainless steel travel mug with leak-proof lid and 6-hour heat retention.",
    "price": 29.99,
    "salePrice": 24.99,
    "brand": "TravelMax",
    "category": "Home & Kitchen",
    "stock": 126,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "16oz", "stock": 67},
      {"name": "20oz", "stock": 59}
    ],
    "colors": [
      {"name": "Stainless Steel", "price": 24.99, "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop", "stock": 68},
      {"name": "Matte Black", "price": 24.99, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop", "stock": 58}
    ],
    "tags": ["travel mug", "insulated", "leak-proof", "stainless steel"],
    "rating": 4.7,
    "reviews": 345
  },
  {
    "id": 39,
    "name": "Wireless Car Charger",
    "description": "Wireless car charger mount with automatic clamping and fast charging capability.",
    "price": 44.99,
    "salePrice": 34.99,
    "brand": "CarTech",
    "category": "Electronics",
    "stock": 67,
    "images": [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "Universal", "stock": 67}
    ],
    "colors": [
      {"name": "Black", "price": 34.99, "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop", "stock": 35},
      {"name": "Gray", "price": 34.99, "image": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=600&fit=crop", "stock": 32}
    ],
    "tags": ["wireless", "car charger", "automatic", "fast charging"],
    "rating": 4.5,
    "reviews": 189
  },
  {
    "id": 40,
    "name": "Premium Tea Collection",
    "description": "Artisan tea collection with 12 premium loose-leaf varieties and elegant gift box.",
    "price": 49.99,
    "salePrice": 39.99,
    "brand": "TeaLoft",
    "category": "Home & Kitchen",
    "stock": 58,
    "images": [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607301421394-491cf764ffde?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "12 Variety Set", "stock": 58}
    ],
    "colors": [
      {"name": "Assorted", "price": 39.99, "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop", "stock": 58}
    ],
    "tags": ["tea", "premium", "loose-leaf", "gift set"],
    "rating": 4.8,
    "reviews": 245
  },
  {
    "id": 41,
    "name": "Adjustable Dumbbells",
    "description": "Space-saving adjustable dumbbells with quick-change weight system, 5-50lbs per dumbbell.",
    "price": 299.99,
    "salePrice": 249.99,
    "brand": "FitnessPro",
    "category": "Sports & Fitness",
    "stock": 23,
    "images": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&h=600&fit=crop"
    ],
    "sizes": [
      {"name": "5-50lbs", "stock": 23}
    ],
    "colors": [
      {"name": "Black/Red", "price": 249.99, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop", "stock": 23}
    ],
    "tags": ["dumbbells", "adjustable", "space-saving", "home gym"],
    "rating": 4.7,
    "reviews": 145
  },
  
  {
  "name": "Classic Denim Jacket",
  "description": "Timeless denim jacket perfect for layering. Features button closure and chest pockets.",
  "price": 89.99,
  "salePrice": 67.49,
  "brand": "UrbanStyle",
  "category": "Jackets",
  "stock": 45,
  "images": [
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "S", "stock": 8},
    {"name": "M", "stock": 12},
    {"name": "L", "stock": 15},
    {"name": "XL", "stock": 10}
  ],
  "colors": [
    {"name": "Blue", "price": 67.49, "image": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop", "stock": 25},
    {"name": "Black", "price": 67.49, "image": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500&h=600&fit=crop", "stock": 20}
  ],
  "tags": ["classic", "versatile", "casual"]
},
{
  "name": "Wireless Bluetooth Headphones",
  "description": "Premium noise-canceling wireless headphones with 30-hour battery life.",
  "price": 199.99,
  "salePrice": 159.99,
  "brand": "SoundMax",
  "category": "Electronics",
  "stock": 28,
  "images": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 28}
  ],
  "colors": [
    {"name": "Black", "price": 159.99, "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop", "stock": 15},
    {"name": "White", "price": 159.99, "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop", "stock": 13}
  ],
  "tags": ["wireless", "premium", "noise-canceling"]
},
{
  "name": "Vintage Leather Boots",
  "description": "Handcrafted leather boots with vintage styling and durable construction.",
  "price": 145.00,
  "salePrice": 116.00,
  "brand": "Heritage",
  "category": "Shoes",
  "stock": 35,
  "images": [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605812830455-1d6e5d2ba39d?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "7", "stock": 4},
    {"name": "8", "stock": 8},
    {"name": "9", "stock": 12},
    {"name": "10", "stock": 7},
    {"name": "11", "stock": 4}
  ],
  "colors": [
    {"name": "Brown", "price": 116.00, "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop", "stock": 20},
    {"name": "Black", "price": 116.00, "image": "https://images.unsplash.com/photo-1605812830455-1d6e5d2ba39d?w=500&h=600&fit=crop", "stock": 15}
  ],
  "tags": ["vintage", "leather", "durable"]
},
{
  "name": "Cotton Crew Neck T-Shirt",
  "description": "Soft 100% cotton t-shirt with classic crew neck design. Perfect for everyday wear.",
  "price": 24.99,
  "salePrice": 19.99,
  "brand": "Comfort Co",
  "category": "T-Shirts",
  "stock": 120,
  "images": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "XS", "stock": 15},
    {"name": "S", "stock": 25},
    {"name": "M", "stock": 35},
    {"name": "L", "stock": 30},
    {"name": "XL", "stock": 15}
  ],
  "colors": [
    {"name": "White", "price": 19.99, "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop", "stock": 40},
    {"name": "Black", "price": 19.99, "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop", "stock": 35},
    {"name": "Gray", "price": 19.99, "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop", "stock": 45}
  ],
  "tags": ["basic", "cotton", "everyday"]
},
{
  "name": "Stainless Steel Water Bottle",
  "description": "Insulated stainless steel water bottle keeps drinks cold for 24 hours.",
  "price": 34.99,
  "salePrice": 27.99,
  "brand": "HydroLife",
  "category": "Accessories",
  "stock": 75,
  "images": [
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "500ml", "stock": 35},
    {"name": "750ml", "stock": 40}
  ],
  "colors": [
    {"name": "Silver", "price": 27.99, "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop", "stock": 30},
    {"name": "Black", "price": 27.99, "image": "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=600&fit=crop", "stock": 25},
    {"name": "Blue", "price": 27.99, "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&h=600&fit=crop", "stock": 20}
  ],
  "tags": ["insulated", "eco-friendly", "durable"]
},
{
  "name": "Minimalist Watch",
  "description": "Sleek minimalist watch with leather strap and clean dial design.",
  "price": 129.99,
  "salePrice": 97.49,
  "brand": "TimeKeeper",
  "category": "Watches",
  "stock": 22,
  "images": [
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 22}
  ],
  "colors": [
    {"name": "Brown Leather", "price": 97.49, "image": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop", "stock": 12},
    {"name": "Black Leather", "price": 97.49, "image": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500&h=600&fit=crop", "stock": 10}
  ],
  "tags": ["minimalist", "elegant", "timeless"]
},
{
  "name": "Yoga Mat Premium",
  "description": "Extra thick yoga mat with superior grip and cushioning for all yoga practices.",
  "price": 59.99,
  "salePrice": 47.99,
  "brand": "ZenFit",
  "category": "Sports",
  "stock": 40,
  "images": [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "Standard", "stock": 40}
  ],
  "colors": [
    {"name": "Purple", "price": 47.99, "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop", "stock": 15},
    {"name": "Pink", "price": 47.99, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop", "stock": 12},
    {"name": "Green", "price": 47.99, "image": "https://images.unsplash.com/photo-1506629905607-a8d85209ad4e?w=500&h=600&fit=crop", "stock": 13}
  ],
  "tags": ["yoga", "fitness", "premium"]
},
{
  "name": "Ceramic Coffee Mug",
  "description": "Handcrafted ceramic coffee mug with unique glazed finish. Perfect for your morning brew.",
  "price": 18.99,
  "salePrice": 14.99,
  "brand": "Artisan",
  "category": "Kitchen",
  "stock": 65,
  "images": [
    "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "12oz", "stock": 40},
    {"name": "16oz", "stock": 25}
  ],
  "colors": [
    {"name": "White", "price": 14.99, "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=600&fit=crop", "stock": 25},
    {"name": "Black", "price": 14.99, "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=600&fit=crop", "stock": 20},
    {"name": "Blue", "price": 14.99, "image": "https://images.unsplash.com/photo-1506802913710-40e2e66339c9?w=500&h=600&fit=crop", "stock": 20}
  ],
  "tags": ["ceramic", "handcrafted", "coffee"]
},
{
  "name": "Canvas Backpack",
  "description": "Durable canvas backpack with multiple compartments and laptop sleeve.",
  "price": 79.99,
  "salePrice": 63.99,
  "brand": "Explorer",
  "category": "Bags",
  "stock": 30,
  "images": [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 30}
  ],
  "colors": [
    {"name": "Khaki", "price": 63.99, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop", "stock": 15},
    {"name": "Navy", "price": 63.99, "image": "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=600&fit=crop", "stock": 15}
  ],
  "tags": ["canvas", "durable", "travel"]
},
{
  "name": "Silk Scarf",
  "description": "Luxurious silk scarf with vibrant patterns. Perfect accessory for any outfit.",
  "price": 85.00,
  "salePrice": 68.00,
  "brand": "LuxeFashion",
  "category": "Accessories",
  "stock": 25,
  "images": [
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "90x90cm", "stock": 25}
  ],
  "colors": [
    {"name": "Floral", "price": 68.00, "image": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop", "stock": 12},
    {"name": "Geometric", "price": 68.00, "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop", "stock": 13}
  ],
  "tags": ["silk", "luxury", "accessory"]
},
{
  "name": "Smart Phone Case",
  "description": "Protective smartphone case with shock absorption and wireless charging compatibility.",
  "price": 39.99,
  "salePrice": 29.99,
  "brand": "TechGuard",
  "category": "Electronics",
  "stock": 85,
  "images": [
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "iPhone 14", "stock": 25},
    {"name": "iPhone 15", "stock": 30},
    {"name": "Samsung S24", "stock": 30}
  ],
  "colors": [
    {"name": "Clear", "price": 29.99, "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=600&fit=crop", "stock": 40},
    {"name": "Black", "price": 29.99, "image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop", "stock": 45}
  ],
  "tags": ["protective", "wireless", "smartphone"]
},
{
  "name": "Cozy Throw Blanket",
  "description": "Ultra-soft fleece throw blanket perfect for couch snuggling and bedroom decor.",
  "price": 49.99,
  "salePrice": 39.99,
  "brand": "HomeFeel",
  "category": "Home",
  "stock": 50,
  "images": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "50x60 inches", "stock": 50}
  ],
  "colors": [
    {"name": "Gray", "price": 39.99, "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop", "stock": 20},
    {"name": "Beige", "price": 39.99, "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop", "stock": 30}
  ],
  "tags": ["cozy", "soft", "home"]
},
{
  "name": "Running Sneakers",
  "description": "Lightweight running sneakers with advanced cushioning and breathable mesh upper.",
  "price": 119.99,
  "salePrice": 95.99,
  "brand": "RunFast",
  "category": "Shoes",
  "stock": 60,
  "images": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "7", "stock": 8},
    {"name": "8", "stock": 12},
    {"name": "9", "stock": 15},
    {"name": "10", "stock": 12},
    {"name": "11", "stock": 8},
    {"name": "12", "stock": 5}
  ],
  "colors": [
    {"name": "White/Black", "price": 95.99, "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop", "stock": 35},
    {"name": "Blue", "price": 95.99, "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop", "stock": 25}
  ],
  "tags": ["running", "lightweight", "athletic"]
},
{
  "name": "Wireless Charging Pad",
  "description": "Fast wireless charging pad compatible with all Qi-enabled devices.",
  "price": 45.00,
  "salePrice": 35.00,
  "brand": "PowerTech",
  "category": "Electronics",
  "stock": 42,
  "images": [
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 42}
  ],
  "colors": [
    {"name": "Black", "price": 35.00, "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop", "stock": 22},
    {"name": "White", "price": 35.00, "image": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=600&fit=crop", "stock": 20}
  ],
  "tags": ["wireless", "fast-charging", "convenient"]
},
{
  "name": "Summer Dress",
  "description": "Flowy summer dress with floral print, perfect for warm weather occasions.",
  "price": 65.99,
  "salePrice": 52.79,
  "brand": "SunnyDays",
  "category": "Dresses",
  "stock": 35,
  "images": [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "XS", "stock": 5},
    {"name": "S", "stock": 8},
    {"name": "M", "stock": 10},
    {"name": "L", "stock": 8},
    {"name": "XL", "stock": 4}
  ],
  "colors": [
    {"name": "Floral Blue", "price": 52.79, "image": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop", "stock": 18},
    {"name": "Floral Pink", "price": 52.79, "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop", "stock": 17}
  ],
  "tags": ["summer", "floral", "feminine"]
},
{
  "name": "Desk Lamp LED",
  "description": "Adjustable LED desk lamp with touch controls and USB charging port.",
  "price": 69.99,
  "salePrice": 55.99,
  "brand": "BrightWork",
  "category": "Home",
  "stock": 38,
  "images": [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 38}
  ],
  "colors": [
    {"name": "White", "price": 55.99, "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop", "stock": 20},
    {"name": "Black", "price": 55.99, "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=600&fit=crop", "stock": 18}
  ],
  "tags": ["LED", "adjustable", "modern"]
},
{
  "name": "Leather Wallet",
  "description": "Genuine leather bifold wallet with RFID blocking technology and multiple card slots.",
  "price": 55.00,
  "salePrice": 44.00,
  "brand": "CraftMen",
  "category": "Accessories",
  "stock": 45,
  "images": [
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 45}
  ],
  "colors": [
    {"name": "Brown", "price": 44.00, "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop", "stock": 25},
    {"name": "Black", "price": 44.00, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop", "stock": 20}
  ],
  "tags": ["leather", "RFID", "classic"]
},
{
  "name": "Gaming Mouse",
  "description": "High-precision gaming mouse with RGB lighting and programmable buttons.",
  "price": 79.99,
  "salePrice": 63.99,
  "brand": "GamePro",
  "category": "Electronics",
  "stock": 32,
  "images": [
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 32}
  ],
  "colors": [
    {"name": "Black", "price": 63.99, "image": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=600&fit=crop", "stock": 20},
    {"name": "White", "price": 63.99, "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=600&fit=crop", "stock": 12}
  ],
  "tags": ["gaming", "RGB", "precision"]
},
{
  "name": "Sunglasses Aviator",
  "description": "Classic aviator sunglasses with UV400 protection and polarized lenses.",
  "price": 89.99,
  "salePrice": 71.99,
  "brand": "SunShield",
  "category": "Accessories",
  "stock": 28,
  "images": [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 28}
  ],
  "colors": [
    {"name": "Gold Frame", "price": 71.99, "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop", "stock": 15},
    {"name": "Silver Frame", "price": 71.99, "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop", "stock": 13}
  ],
  "tags": ["aviator", "UV400", "classic"]
},
{
  "name": "Kitchen Knife Set",
  "description": "Professional kitchen knife set with wooden block and sharpening steel.",
  "price": 149.99,
  "salePrice": 119.99,
  "brand": "ChefMaster",
  "category": "Kitchen",
  "stock": 18,
  "images": [
    "https://images.unsplash.com/photo-1594736797933-d0b22ac3734a?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "8-Piece Set", "stock": 18}
  ],
  "colors": [
    {"name": "Stainless Steel", "price": 119.99, "image": "https://images.unsplash.com/photo-1594736797933-d0b22ac3734a?w=500&h=600&fit=crop", "stock": 18}
  ],
  "tags": ["professional", "sharp", "kitchen"]
},
{
  "name": "Hoodie Pullover",
  "description": "Comfortable cotton blend hoodie with kangaroo pocket and adjustable drawstrings.",
  "price": 55.99,
  "salePrice": 44.79,
  "brand": "CozyWear",
  "category": "Hoodies",
  "stock": 65,
  "images": [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "S", "stock": 12},
    {"name": "M", "stock": 18},
    {"name": "L", "stock": 20},
    {"name": "XL", "stock": 15}
  ],
  "colors": [
    {"name": "Gray", "price": 44.79, "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop", "stock": 30},
    {"name": "Black", "price": 44.79, "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop", "stock": 35}
  ],
  "tags": ["comfortable", "casual", "cozy"]
},
{
  "name": "Bluetooth Speaker",
  "description": "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
  "price": 89.99,
  "salePrice": 71.99,
  "brand": "SoundWave",
  "category": "Electronics",
  "stock": 40,
  "images": [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 40}
  ],
  "colors": [
    {"name": "Black", "price": 71.99, "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop", "stock": 25},
    {"name": "Blue", "price": 71.99, "image": "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=600&fit=crop", "stock": 15}
  ],
  "tags": ["portable", "waterproof", "360-sound"]
},
{
  "name": "Chino Pants",
  "description": "Classic chino pants with comfortable fit and versatile styling options.",
  "price": 49.99,
  "salePrice": 39.99,
  "brand": "StyleFit",
  "category": "Pants",
  "stock": 55,
  "images": [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "30", "stock": 8},
    {"name": "32", "stock": 12},
    {"name": "34", "stock": 15},
    {"name": "36", "stock": 12},
    {"name": "38", "stock": 8}
  ],
  "colors": [
    {"name": "Khaki", "price": 39.99, "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop", "stock": 30},
    {"name": "Navy", "price": 39.99, "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop", "stock": 25}
  ],
  "tags": ["chino", "versatile", "classic"]
},
{
  "name": "Plant Pot Ceramic",
  "description": "Decorative ceramic plant pot with drainage hole, perfect for indoor plants.",
  "price": 28.99,
  "salePrice": 23.19,
  "brand": "GreenHome",
  "category": "Home",
  "stock": 48,
  "images": [
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "Small", "stock": 20},
    {"name": "Medium", "stock": 18},
    {"name": "Large", "stock": 10}
  ],
  "colors": [
    {"name": "White", "price": 23.19, "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=600&fit=crop", "stock": 25},
    {"name": "Terracotta", "price": 23.19, "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop", "stock": 23}
  ],
  "tags": ["ceramic", "decorative", "indoor"]
},
{
  "name": "Fitness Tracker",
  "description": "Advanced fitness tracker with heart rate monitoring and sleep tracking.",
  "price": 129.99,
  "salePrice": 103.99,
  "brand": "FitTech",
  "category": "Electronics",
  "stock": 35,
  "images": [
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "S/M", "stock": 18},
    {"name": "L/XL", "stock": 17}
  ],
  "colors": [
    {"name": "Black", "price": 103.99, "image": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop", "stock": 20},
    {"name": "Blue", "price": 103.99, "image": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=600&fit=crop", "stock": 15}
  ],
  "tags": ["fitness", "tracking", "health"]
},
{
  "name": "Reading Glasses",
  "description": "Stylish reading glasses with blue light filtering and comfortable frames.",
  "price": 35.99,
  "salePrice": 28.79,
  "brand": "ClearView",
  "category": "Accessories",
  "stock": 52,
  "images": [
    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "+1.0", "stock": 12},
    {"name": "+1.5", "stock": 15},
    {"name": "+2.0", "stock": 15},
    {"name": "+2.5", "stock": 10}
  ],
  "colors": [
    {"name": "Black Frame", "price": 28.79, "image": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=600&fit=crop", "stock": 30},
    {"name": "Tortoise", "price": 28.79, "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop", "stock": 22}
  ],
  "tags": ["reading", "blue-light", "comfortable"]
},
{
  "name": "Perfume Bottle",
  "description": "Elegant perfume with floral notes, perfect for everyday wear or special occasions.",
  "price": 75.00,
  "salePrice": 60.00,
  "brand": "Essence",
  "category": "Beauty",
  "stock": 25,
  "images": [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594736797933-d0b22ac3734a?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "50ml", "stock": 15},
    {"name": "100ml", "stock": 10}
  ],
  "colors": [
    {"name": "Classic", "price": 60.00, "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop", "stock": 25}
  ],
  "tags": ["floral", "elegant", "fragrance"]
},
{
  "name": "USB-C Cable",
  "description": "High-speed USB-C to USB-C cable with fast charging and data transfer capabilities.",
  "price": 19.99,
  "salePrice": 15.99,
  "brand": "ConnectTech",
  "category": "Electronics",
  "stock": 95,
  "images": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606924842584-daea5e36c5a4?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "1m", "stock": 45},
    {"name": "2m", "stock": 50}
  ],
  "colors": [
    {"name": "Black", "price": 15.99, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop", "stock": 50},
    {"name": "White", "price": 15.99, "image": "https://images.unsplash.com/photo-1606924842584-daea5e36c5a4?w=500&h=600&fit=crop", "stock": 45}
  ],
  "tags": ["USB-C", "fast-charging", "durable"]
},
{
  "name": "Lip Balm Set",
  "description": "Natural lip balm set with moisturizing ingredients and various flavors.",
  "price": 24.99,
  "salePrice": 19.99,
  "brand": "NaturalCare",
  "category": "Beauty",
  "stock": 68,
  "images": [
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583247318331-9b91d7aae1a0?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "3-Pack", "stock": 68}
  ],
  "colors": [
    {"name": "Mixed Flavors", "price": 19.99, "image": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=600&fit=crop", "stock": 68}
  ],
  "tags": ["natural", "moisturizing", "flavored"]
},
{
  "name": "Baseball Cap",
  "description": "Classic baseball cap with adjustable strap and embroidered logo.",
  "price": 29.99,
  "salePrice": 23.99,
  "brand": "SportStyle",
  "category": "Accessories",
  "stock": 75,
  "images": [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 75}
  ],
  "colors": [
    {"name": "Navy", "price": 23.99, "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop", "stock": 35},
    {"name": "Black", "price": 23.99, "image": "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop", "stock": 40}
  ],
  "tags": ["baseball", "adjustable", "classic"]
},
{
  "name": "Candle Set",
  "description": "Aromatherapy candle set with relaxing scents, perfect for home ambiance.",
  "price": 45.00,
  "salePrice": 36.00,
  "brand": "AromaHome",
  "category": "Home",
  "stock": 42,
  "images": [
    "https://images.unsplash.com/photo-1602874801006-96864fb5082a?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "3-Pack", "stock": 42}
  ],
  "colors": [
    {"name": "Vanilla & Lavender", "price": 36.00, "image": "https://images.unsplash.com/photo-1602874801006-96864fb5082a?w=500&h=600&fit=crop", "stock": 22},
    {"name": "Citrus & Mint", "price": 36.00, "image": "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=600&fit=crop", "stock": 20}
  ],
  "tags": ["aromatherapy", "relaxing", "home"]
},
{
  "name": "Laptop Stand",
  "description": "Adjustable aluminum laptop stand for improved ergonomics and ventilation.",
  "price": 59.99,
  "salePrice": 47.99,
  "brand": "ErgoWork",
  "category": "Electronics",
  "stock": 30,
  "images": [
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 30}
  ],
  "colors": [
    {"name": "Silver", "price": 47.99, "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=600&fit=crop", "stock": 18},
    {"name": "Space Gray", "price": 47.99, "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=600&fit=crop", "stock": 12}
  ],
  "tags": ["ergonomic", "aluminum", "adjustable"]
},
{
  "name": "Polo Shirt",
  "description": "Classic polo shirt with three-button placket and comfortable cotton blend fabric.",
  "price": 39.99,
  "salePrice": 31.99,
  "brand": "ClassicFit",
  "category": "Shirts",
  "stock": 85,
  "images": [
    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "S", "stock": 15},
    {"name": "M", "stock": 25},
    {"name": "L", "stock": 25},
    {"name": "XL", "stock": 20}
  ],
  "colors": [
    {"name": "White", "price": 31.99, "image": "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop", "stock": 45},
    {"name": "Navy", "price": 31.99, "image": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&h=600&fit=crop", "stock": 40}
  ],
  "tags": ["polo", "classic", "comfortable"]
},
{
  "name": "Essential Oil Diffuser",
  "description": "Ultrasonic essential oil diffuser with LED mood lighting and timer settings.",
  "price": 49.99,
  "salePrice": 39.99,
  "brand": "ZenSpace",
  "category": "Home",
  "stock": 35,
  "images": [
    "https://images.unsplash.com/photo-1544535157-6ca9ac1d1088?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1539839456043-e46d20e64c5c?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "300ml", "stock": 35}
  ],
  "colors": [
    {"name": "Wood Grain", "price": 39.99, "image": "https://images.unsplash.com/photo-1544535157-6ca9ac1d1088?w=500&h=600&fit=crop", "stock": 20},
    {"name": "White", "price": 39.99, "image": "https://images.unsplash.com/photo-1539839456043-e46d20e64c5c?w=500&h=600&fit=crop", "stock": 15}
  ],
  "tags": ["ultrasonic", "mood-lighting", "aromatherapy"]
},
{
  "name": "Phone Grip Ring",
  "description": "360-degree rotating phone grip ring with car mount compatibility.",
  "price": 12.99,
  "salePrice": 9.99,
  "brand": "GripTech",
  "category": "Electronics",
  "stock": 120,
  "images": [
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 120}
  ],
  "colors": [
    {"name": "Black", "price": 9.99, "image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop", "stock": 60},
    {"name": "Silver", "price": 9.99, "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=600&fit=crop", "stock": 60}
  ],
  "tags": ["rotating", "phone-grip", "car-mount"]
},
{
  "name": "Sweatshirt Crewneck",
  "description": "Soft fleece crewneck sweatshirt perfect for casual wear and layering.",
  "price": 45.99,
  "salePrice": 36.79,
  "brand": "ComfortZone",
  "category": "Sweatshirts",
  "stock": 70,
  "images": [
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "S", "stock": 12},
    {"name": "M", "stock": 20},
    {"name": "L", "stock": 22},
    {"name": "XL", "stock": 16}
  ],
  "colors": [
    {"name": "Heather Gray", "price": 36.79, "image": "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&h=600&fit=crop", "stock": 40},
    {"name": "Navy", "price": 36.79, "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop", "stock": 30}
  ],
  "tags": ["fleece", "crewneck", "comfortable"]
},
{
  "name": "Travel Mug",
  "description": "Insulated travel mug with leak-proof lid and comfortable grip handle.",
  "price": 32.99,
  "salePrice": 26.39,
  "brand": "TravelPro",
  "category": "Kitchen",
  "stock": 58,
  "images": [
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "16oz", "stock": 30},
    {"name": "20oz", "stock": 28}
  ],
  "colors": [
    {"name": "Black", "price": 26.39, "image": "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=600&fit=crop", "stock": 30},
    {"name": "Stainless", "price": 26.39, "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=600&fit=crop", "stock": 28}
  ],
  "tags": ["insulated", "leak-proof", "travel"]
},
{
  "name": "Resistance Bands Set",
  "description": "Complete resistance bands set with various resistance levels and accessories.",
  "price": 39.99,
  "salePrice": 31.99,
  "brand": "FitStrong",
  "category": "Sports",
  "stock": 45,
  "images": [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "Complete Set", "stock": 45}
  ],
  "colors": [
    {"name": "Multi-Color", "price": 31.99, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop", "stock": 45}
  ],
  "tags": ["resistance", "fitness", "complete-set"]
},
{
  "name": "Picture Frame Set",
  "description": "Elegant picture frame set in various sizes for displaying your favorite memories.",
  "price": 42.99,
  "salePrice": 34.39,
  "brand": "MemoryKeeper",
  "category": "Home",
  "stock": 38,
  "images": [
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "Mixed Set", "stock": 38}
  ],
  "colors": [
    {"name": "Black", "price": 34.39, "image": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop", "stock": 20},
    {"name": "White", "price": 34.39, "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop", "stock": 18}
  ],
  "tags": ["elegant", "memories", "decorative"]
},
{
  "name": "Wireless Earbuds",
  "description": "True wireless earbuds with active noise cancellation and touch controls.",
  "price": 149.99,
  "salePrice": 119.99,
  "brand": "AudioMax",
  "category": "Electronics",
  "stock": 32,
  "images": [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "One Size", "stock": 32}
  ],
  "colors": [
    {"name": "Black", "price": 119.99, "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=600&fit=crop", "stock": 18},
    {"name": "White", "price": 119.99, "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop", "stock": 14}
  ],
  "tags": ["wireless", "noise-cancellation", "touch-controls"]
},
{
  "name": "Jeans Skinny Fit",
  "description": "Modern skinny fit jeans with stretch fabric for comfort and style.",
  "price": 69.99,
  "salePrice": 55.99,
  "brand": "DenimCo",
  "category": "Jeans",
  "stock": 78,
  "images": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "28", "stock": 12},
    {"name": "30", "stock": 18},
    {"name": "32", "stock": 20},
    {"name": "34", "stock": 16},
    {"name": "36", "stock": 12}
  ],
  "colors": [
    {"name": "Dark Blue", "price": 55.99, "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop", "stock": 40},
    {"name": "Light Blue", "price": 55.99, "image": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop", "stock": 38}
  ],
  "tags": ["skinny-fit", "stretch", "modern"]
},
{
  "name": "Notebook Set",
  "description": "Premium notebook set with dotted pages, perfect for journaling and planning.",
  "price": 29.99,
  "salePrice": 23.99,
  "brand": "WriteWell",
  "category": "Stationery",
  "stock": 85,
  "images": [
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=600&fit=crop"
  ],
  "sizes": [
    {"name": "A5", "stock": 50},
    {"name": "A4", "stock": 35}
  ],
  "colors": [
    {"name": "Black", "price": 23.99, "image": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=600&fit=crop", "stock": 45},
    {"name": "Brown", "price": 23.99, "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=600&fit=crop", "stock": 40}
  ],
  "tags": ["premium", "dotted", "journaling"]
}]

async function seedProducts() {
  try {
    console.log('Starting product seeding...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Successfully seeded ${result.length} products`);
    
    console.log('Product seeding completed!');
    
    // Seed coupons after products
    console.log('Starting coupon seeding...');
    await seedCoupons();
    console.log('Coupon seeding completed!');
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedProducts(); 