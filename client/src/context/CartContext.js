import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';

const CartDataContext = createContext();
const CartSummaryContext = createContext();
const CartActionsContext = createContext();

export const useCartData = () => {
  const context = useContext(CartDataContext);
  if (!context) {
    throw new Error('useCartData must be used within a CartProvider');
  }
  return context;
};

export const useCartSummary = () => {
  const context = useContext(CartSummaryContext);
  if (!context) {
    throw new Error('useCartSummary must be used within a CartProvider');
  }
  return context;
};

export const useCartActions = () => {
  const context = useContext(CartActionsContext);
  if (!context) {
    throw new Error('useCartActions must be used within a CartProvider');
  }
  return context;
};

export const useCart = () => {
  return {
    ...useCartData(),
    ...useCartSummary(),
    ...useCartActions()
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartSummary, setCartSummary] = useState({
    itemCount: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/cart');
      if (response.data && response.data.success) {
        setCart(response.data.cart);
      } else {
        setError('Failed to retrieve cart data');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('An error occurred while fetching cart data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCartSummary = useCallback(async () => {
    try {
      const response = await axios.get('/api/cart/summary');
      if (response.data && response.data.success) {
        setCartSummary(response.data.summary);
      }
    } catch (error) {
      console.error('Error fetching cart summary:', error);
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity = 1, selectedSize = null) => {
    try {
      const response = await axios.post('/api/cart/items', {
        productId,
        quantity,
        attributes: selectedSize ? { size: selectedSize } : {}
      });

      if (response.data && response.data.success) {
        setCart(response.data.cart);
        await fetchCartSummary();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to add item to cart');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('An error occurred while adding item to cart');
      return { success: false, error: 'An error occurred while adding item to cart' };
    }
  }, [fetchCartSummary]);

  const updateCartItem = useCallback(async (itemId, quantity) => {
    try {
      const response = await axios.put(`/api/cart/items/${itemId}`, { quantity });
      if (response.data && response.data.success) {
        setCart(response.data.cart);
        await fetchCartSummary();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to update quantity');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('An error occurred while updating the quantity');
      return { success: false, error: 'An error occurred while updating the quantity' };
    }
  }, [fetchCartSummary]);

  const updateCartItemAttributes = useCallback(async (itemId, attributes) => {
    try {
      const response = await axios.put(`/api/cart/items/${itemId}`, { attributes });
      if (response.data && response.data.success) {
        setCart(response.data.cart);
        await fetchCartSummary();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to update item attributes');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error('Error updating item attributes:', error);
      setError('An error occurred while updating item attributes');
      return { success: false, error: 'An error occurred while updating item attributes' };
    }
  }, [fetchCartSummary]);

  const removeCartItem = useCallback(async (itemId) => {
    try {
      const response = await axios.delete(`/api/cart/items/${itemId}`);
      if (response.data && response.data.success) {
        setCart(response.data.cart);
        await fetchCartSummary();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to remove item');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setError('An error occurred while removing the item');
      return { success: false, error: 'An error occurred while removing the item' };
    }
  }, [fetchCartSummary]);

  const applyCoupon = useCallback(async (couponCode) => {
    try {
      const response = await axios.post('/api/cart/coupons', { couponCode });
      if (response.data && response.data.success) {
        setCart(response.data.cart);
        await fetchCartSummary();
        return { success: true };
      } else {
        return { success: false, error: response.data.message || 'Failed to apply coupon' };
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      return { success: false, error: 'An error occurred while applying the coupon' };
    }
  }, [fetchCartSummary]);

  const removeCoupon = useCallback(async (code) => {
    try {
      const response = await axios.delete(`/api/cart/coupons/${code}`);
      if (response.data && response.data.success) {
        setCart(response.data.cart);
        await fetchCartSummary();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to remove coupon');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error('Error removing coupon:', error);
      setError('An error occurred while removing the coupon');
      return { success: false, error: 'An error occurred while removing the coupon' };
    }
  }, [fetchCartSummary]);

  useEffect(() => {
    fetchCart();
    fetchCartSummary();
  }, [fetchCart, fetchCartSummary]);

  const cartDataValue = useMemo(() => ({
    cart,
    loading,
    error
  }), [cart, loading, error]);

  const cartSummaryValue = useMemo(() => ({
    cartSummary
  }), [cartSummary]);

  const cartActionsValue = useMemo(() => ({
    addToCart,
    updateCartItem,
    updateCartItemAttributes,
    removeCartItem,
    applyCoupon,
    removeCoupon,
    fetchCart,
    fetchCartSummary,
    setError
  }), [addToCart, updateCartItem, updateCartItemAttributes, removeCartItem, applyCoupon, removeCoupon, fetchCart, fetchCartSummary]);

  return (
    <CartDataContext.Provider value={cartDataValue}>
      <CartSummaryContext.Provider value={cartSummaryValue}>
        <CartActionsContext.Provider value={cartActionsValue}>
          {children}
        </CartActionsContext.Provider>
      </CartSummaryContext.Provider>
    </CartDataContext.Provider>
  );
}; 