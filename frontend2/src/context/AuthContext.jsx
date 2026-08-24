import React , { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("moexpress_cart");
    localStorage.removeItem("moexpress_wishlist");
    window.dispatchEvent(new Event("storage"));
  };

  const updateUserProfile = (partialUser) => {
    setUser((prev) => ({ ...prev, ...partialUser }));
  };


  



  
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        updateUserProfile,
        isAuthenticated: !!token && !!user,
        isSuperAdmin: user?.role === "superAdmin",
        isAdmin: user?.role === "admin" || user?.role === "superAdmin",
        isSeller: user?.role === "seller" || user?.isProShop === true,
        isProShop: user?.isProShop === true,
        isSupplier: user?.isSupplier === true || user?.supplierBadge === true,
        noAds: user?.noAds === true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
