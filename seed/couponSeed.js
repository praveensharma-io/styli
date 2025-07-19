const Coupon = require('../models/Coupon');
const Product = require('../models/Product');

const seedCoupons = async () => {
  try {
    // Clear existing coupons
    await Coupon.deleteMany({});
    
    // Get some product IDs for testing
    const products = await Product.find().limit(10);
    const productIds = products.map(p => p._id);
    
    // Get current date and future dates
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(currentDate.getFullYear() + 1); // 1 year from now
    
    const coupons = [
      // Percentage discount coupons
      {
        code: 'NEW50',
        name: 'New Customer 50% Off',
        description: 'Get 50% off on your first order',
        discountType: 'percentage',
        discountValue: 50,
        minimumOrderAmount: 100,
        maximumDiscount: 200,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 1000,
        userUsageLimit: 1,
        isFirstTimeOnly: true,
        priority: 10
      },
      {
        code: 'SAVE20',
        name: 'Save 20% on Everything',
        description: 'Get 20% off on all items',
        discountType: 'percentage',
        discountValue: 20,
        minimumOrderAmount: 50,
        maximumDiscount: 100,
        startDate: currentDate,
        endDate: futureDate,
        // startDate: new Date('2024-01-01'),
        // endDate: new Date('2024-12-31'),
        isActive: true,
        usageLimit: 5000,
        userUsageLimit: 3,
        priority: 5
      },
      {
        code: 'WELCOME10',
        name: 'Welcome 10% Off',
        description: '10% off for new customers',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrderAmount: 30,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 2000,
        userUsageLimit: 1,
        isNewUserOnly: true,
        priority: 8
      },
      
      // Fixed amount discount coupons
      {
        code: 'FLAT25',
        name: 'Flat AED 25 Off',
        description: 'Get AED 25 off on orders above AED 100',
        discountType: 'fixed',
        discountValue: 25,
        minimumOrderAmount: 100,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 3000,
        userUsageLimit: 2,
        priority: 6
      },
      {
        code: 'SAVE50',
        name: 'Save AED 50',
        description: 'Get AED 50 off on orders above AED 200',
        discountType: 'fixed',
        discountValue: 50,
        minimumOrderAmount: 200,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 1500,
        userUsageLimit: 1,
        priority: 7
      },
      
      // Free shipping coupons
      {
        code: 'FREESHIP',
        name: 'Free Shipping',
        description: 'Free shipping on orders above AED 150',
        discountType: 'free_shipping',
        discountValue: 12,
        minimumOrderAmount: 150,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 10000,
        userUsageLimit: 5,
        priority: 4
      },
      
      // Category-specific coupons
      {
        code: 'CLOTHING30',
        name: '30% Off Clothing',
        description: 'Get 30% off on all clothing items',
        discountType: 'percentage',
        discountValue: 30,
        applicableCategories: ['Clothing'],
        minimumOrderAmount: 75,
        maximumDiscount: 150,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 2000,
        userUsageLimit: 2,
        priority: 9
      },
      {
        code: 'SHOES25',
        name: '25% Off Shoes',
        description: 'Get 25% off on all footwear',
        discountType: 'percentage',
        discountValue: 25,
        applicableCategories: ['Footwear'],
        minimumOrderAmount: 60,
        maximumDiscount: 100,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 1500,
        userUsageLimit: 1,
        priority: 8
      },
      
      // Product-specific coupons
      {
        code: 'SPECIAL15',
        name: 'Special 15% Off',
        description: '15% off on selected products',
        discountType: 'percentage',
        discountValue: 15,
        applicableProducts: productIds.slice(0, 3), // First 3 products
        minimumOrderAmount: 40,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 1000,
        userUsageLimit: 1,
        priority: 6
      },
      
      // Stackable coupons
      {
        code: 'STACK10',
        name: 'Stackable 10% Off',
        description: '10% off that can be combined with other offers',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrderAmount: 25,
        maximumDiscount: 50,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 5000,
        userUsageLimit: 3,
        stackable: true,
        priority: 3
      },
      
      // Expired coupon for testing
      {
        code: 'EXPIRED',
        name: 'Expired Coupon',
        description: 'This coupon has expired',
        discountType: 'percentage',
        discountValue: 20,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-02-01'),
        isActive: true,
        usageLimit: 100,
        userUsageLimit: 1,
        priority: 1
      },
      
      // Inactive coupon for testing
      {
        code: 'INACTIVE',
        name: 'Inactive Coupon',
        description: 'This coupon is inactive',
        discountType: 'percentage',
        discountValue: 15,
        startDate: currentDate,
        endDate: futureDate,
        isActive: false,
        usageLimit: 100,
        userUsageLimit: 1,
        priority: 1
      },
      
      // High value coupon with restrictions
      {
        code: 'VIP100',
        name: 'VIP AED 100 Off',
        description: 'Exclusive AED 100 off for VIP customers',
        discountType: 'fixed',
        discountValue: 100,
        minimumOrderAmount: 500,
        startDate: currentDate,
        endDate: futureDate,
        isActive: true,
        usageLimit: 100,
        userUsageLimit: 1,
        priority: 15
      },
      
      // Flash sale coupon
      {
        code: 'FLASH40',
        name: 'Flash Sale 40% Off',
        description: 'Limited time 40% off on everything',
        discountType: 'percentage',
        discountValue: 40,
        minimumOrderAmount: 80,
        maximumDiscount: 200,
        startDate: currentDate,
        endDate: new Date(currentDate.getTime() + (3 * 30 * 24 * 60 * 60 * 1000)), // 3 months from now
        isActive: true,
        usageLimit: 500,
        userUsageLimit: 1,
        priority: 12
      }
    ];
    
    // Insert coupons
    const createdCoupons = await Coupon.insertMany(coupons);
    
    console.log(`✅ Seeded ${createdCoupons.length} coupons successfully`);
    
    // Log some coupon details for testing
    console.log('\n📋 Available Coupons for Testing:');
    console.log('--------------------------------');
    createdCoupons.forEach(coupon => {
      console.log(`${coupon.code}: ${coupon.name} - ${coupon.discountValue}${coupon.discountType === 'percentage' ? '%' : ' AED'} off`);
    });
    
    return createdCoupons;
  } catch (error) {
    console.error('❌ Error seeding coupons:', error);
    throw error;
  }
};

module.exports = { seedCoupons }; 