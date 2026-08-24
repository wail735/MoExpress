// ============================================================================
// CONTEXT : CartContext.jsx
// ROLE : Shopping Cart State Management & Total Calculations
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("moexpress_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moexpress_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("moexpress_cart");
      if (!saved) setCartItems([]);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const targetId = product._id || product.id;
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => {
        const itemId = item.product?._id || item.product?.id || item._id || item.id;
        return itemId === targetId;
      });
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 0) + Number(quantity);
        return updated;
      } else {
        return [...prevItems, { product, quantity: Number(quantity) }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const itemId = item.product?._id || item.product?.id || item._id || item.id;
        return itemId !== productId;
      })
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const itemId = item.product?._id || item.product?.id || item._id || item.id;
        return itemId === productId ? { ...item, quantity: Number(quantity) } : item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = (cartItems || []).reduce((sum, item) => {
    const price = item.product?.price ?? item.price ?? 0;
    return sum + (price * (item.quantity || 1));
  }, 0);
  const totalCount = (cartItems || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
