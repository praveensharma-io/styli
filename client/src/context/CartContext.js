import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total: 0, totalDiscount: 0, appliedCoupons: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    try {
      const response = await axios.get('/api/cart', {
        headers: {
          'Authorization': 'Bearer test-token'
        },
        params: {
          userId: '60d21b4667d0d8992e610c85'
        }
      });
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(async (productId, quantity = 1, size = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/cart/items', {
        userId: '60d21b4667d0d8992e610c85',
        productId,
        quantity,
        attributes: size ? { size } : {}
      });

      if (response.data.success) {
        setCart(response.data.cart);
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`/api/cart/items/${itemId}`, { 
        quantity,
        userId: '60d21b4667d0d8992e610c85'
      });
      
      if (response.data.success) {
        setCart(response.data.cart);
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update quantity';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (itemId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete(`/api/cart/items/${itemId}`, {
        params: {
          userId: '60d21b4667d0d8992e610c85'
        }
      });
      
      if (response.data.success) {
        setCart(response.data.cart);
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const applyCoupon = useCallback(async (couponCode) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/cart/coupons', { 
        couponCode,
        userId: '60d21b4667d0d8992e610c85'
      });
      
      if (response.data.success) {
        setCart(response.data.cart);
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to apply coupon';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeCoupon = useCallback(async (couponCode) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete(`/api/cart/coupons/${couponCode}`, {
        params: {
          userId: '60d21b4667d0d8992e610c85'
        }
      });
      
      if (response.data.success) {
        setCart(response.data.cart);
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove coupon';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const getAvailableCoupons = useCallback(async () => {
    try {
      const cartItems = cart.items.map(item => ({
        productId: item.productId,
        category: item.category || 'General',
        price: item.salePrice || item.price,
        quantity: item.quantity
      }));
      
      const response = await axios.get('/api/coupons/available', {
        params: {
          cartItems: JSON.stringify(cartItems),
          subtotal: cart.subtotal,
          userId: '60d21b4667d0d8992e610c85'
        }
      });

      if (response.data.success) {
        return { 
          success: true, 
          coupons: response.data.coupons,
          unavailableCoupons: response.data.unavailableCoupons || []
        };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      return { success: false, error: 'Failed to get available coupons' };
    }
  }, [cart]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], subtotal: 0, total: 0, totalDiscount: 0, appliedCoupons: [] });
  }, []);

  const value = {
    cart,
    loading,
    error,
    loadCart,
    addToCart,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    getAvailableCoupons,
    clearError,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 