// ============================================================================
// CONTEXT : CompareContext.jsx
// ROLE : Product Comparison Tray & Persistent Selected Items
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  const addToCompare = (product) => {
    if (compareItems.find((item) => item._id === product._id)) return;
    if (compareItems.length >= 4) {
      alert("You can compare up to 4 products at a time.");
      return;
    }
    setCompareItems((prev) => [...prev, product]);
  };

  const removeFromCompare = (id) => {
    setCompareItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
