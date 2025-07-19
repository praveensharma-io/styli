const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Coupon = require('../models/Coupon');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { 
      userId, 
      shippingAddress, 
      paymentMethod, 
      appliedCoupons = [] 
    } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate coupons and record usage
    const validatedCoupons = [];
    for (const couponCode of appliedCoupons) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
      
      if (!coupon) {
        return res.status(400).json({
          success: false,
          message: `Invalid coupon code: ${couponCode}`
        });
      }

      // Check if coupon is valid
      const validityCheck = coupon.isValid();
      if (!validityCheck.valid) {
        return res.status(400).json({
          success: false,
          message: validityCheck.reason
        });
      }

      // Check if user can use this coupon
      const userCheck = coupon.canUserUse(userId);
      if (!userCheck.canUse) {
        return res.status(400).json({
          success: false,
          message: userCheck.reason
        });
      }

      // Check if coupon applies to cart
      const cartItems = cart.items.map(item => ({
        productId: item.productId._id,
        category: item.productId.category
      }));
      const subtotal = cart.subtotal;
      
      const applicabilityCheck = coupon.appliesToCart(cartItems, subtotal);
      if (!applicabilityCheck.applies) {
        return res.status(400).json({
          success: false,
          message: applicabilityCheck.reason
        });
      }

      // Calculate discount amount
      const discountAmount = coupon.calculateDiscount(subtotal, cartItems);
      
      validatedCoupons.push({
        code: coupon.code,
        discountAmount,
        couponId: coupon._id
      });
    }

    // Create order items from cart
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      attributes: item.attributes || {},
      image: item.productId.image,
      images: item.productId.images
    }));

    // Calculate totals
    const subtotal = cart.subtotal;
    const shippingCost = 0; // Free shipping
    const totalDiscount = validatedCoupons.reduce((sum, coupon) => sum + coupon.discountAmount, 0);
    const total = subtotal + shippingCost - totalDiscount;

    // Generate order number
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    const orderNumber = `ORD-${timestamp}-${random}`;

    // Create the order
    const order = new Order({
      orderNumber,
      userId,
      items: orderItems,
      subtotal,
      shippingCost,
      totalDiscount,
      total,
      appliedCoupons: validatedCoupons,
      shippingAddress,
      paymentMethod,
      orderStatus: 'confirmed',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    // Save the order
    await order.save();

    // Record coupon usage
    await order.recordCouponUsage();

    // Clear the cart
    await Cart.findOneAndUpdate(
      { userId },
      { 
        $set: { 
          items: [], 
          subtotal: 0, 
          total: 0, 
          totalDiscount: 0,
          appliedCoupons: []
        }
      }
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.orderStatus,
        estimatedDelivery: order.estimatedDelivery
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .select('orderNumber total orderStatus createdAt estimatedDelivery items');

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Get order details
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.query;

    const order = await Order.findOne({ 
      _id: orderId, 
      userId 
    }).populate('items.productId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus
}; 