// ============================================================================
// COMPONENT : ProtectedRoute.jsx
// ROLE : Authentication & Authorization Guard for User, Seller & Admin Dashboards
// ============================================================================

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children, requiredRole, requireProShop = false }) => {
  const { user, isAuthenticated, loading, isSuperAdmin, isProShop } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-slate-900 dark:text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Verifying session credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === "superAdmin" && !isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireProShop && !isProShop && !isSuperAdmin) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
