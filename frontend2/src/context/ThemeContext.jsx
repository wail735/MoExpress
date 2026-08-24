// ============================================================================
// CONTEXT : ThemeContext.jsx
// ROLE : Dark mode and Light mode state management
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("moexpress_theme");
    return saved ? saved === "dark" : true; // Dark mode by default for rich aesthetics!
  });

  useEffect(() => {
    localStorage.setItem("moexpress_theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const setTheme = (mode) => setIsDark(mode === "dark");

  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? "dark" : "light", toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return { isDark: true, theme: "dark", toggleTheme: () => {}, setTheme: () => {} };
  }
  return context;
};
