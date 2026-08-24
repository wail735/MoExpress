// ============================================================================
// HOOK : useLocalStorage.js
// ROLE : State Synchronized with Browser LocalStorage
// ============================================================================

import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
