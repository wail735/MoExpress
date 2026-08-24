// ============================================================================
// CONTEXT : WishlistContext.jsx
// ROLE : Saved favorite products (Wishlist)
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useNotification();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("moexpress_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moexpress_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    if (!product) return;
    if (!isAuthenticated) {
      if (addToast) addToast("Please log in to save items to your wishlist!", "warning");
      return;
    }
    const targetId = product._id || product.id;
    setWishlistItems((prev) => {
      const exists = prev.some((item) => (item._id || item.id) === targetId);
      if (exists) {
        if (addToast) addToast("Removed from Wishlist", "info");
        return prev.filter((item) => (item._id || item.id) !== targetId);
      } else {
        if (addToast) addToast("Saved to Wishlist!", "success");
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productIdOrProduct) => {
    const targetId =
      typeof productIdOrProduct === "object" && productIdOrProduct !== null
        ? productIdOrProduct._id || productIdOrProduct.id
        : productIdOrProduct;
    setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== targetId));
  };

  const isInWishlist = (productId) =>
    (wishlistItems || []).some((item) => (item._id || item.id) === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlistItems || [],
        wishlistItems: wishlistItems || [],
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
