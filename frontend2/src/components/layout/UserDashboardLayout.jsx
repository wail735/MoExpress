// ============================================================================
// COMPONENT : UserDashboardLayout.jsx
// ROLE : Sidebar Navigation Layout for User, Seller & Pro Boutique Dashboard Pages
// ============================================================================

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  RefreshCw,
  Store,
  LayoutDashboard,
  Box,
  Truck,
  TrendingUp,
  DollarSign,
  RotateCcw,
  Upload,
  Star,
  Tag,
  Video,
  Bot,
  Users,
  ShieldCheck,
  Coins,
  CreditCard,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Award,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import ProtectedRoute from "../common/ProtectedRoute";

export const UserDashboardLayout = ({ children }) => {
  const location = useLocation();
  const { user, isProShop, isSeller, isSuperAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuSections = [
    {
      title: "My Account",
      items: [
        { path: "/dashboard", label: "Profile & Overview", icon: User },
        { path: "/orders", label: "My Orders", icon: Package },
        { path: "/payment-methods", label: "Payment Methods", icon: CreditCard },
        { path: "/wishlist", label: "Saved Wishlist", icon: Heart },
        { path: "/addresses", label: "Address Book", icon: MapPin },
        { path: "/recurring-orders", label: "Auto-Subscriptions", icon: RefreshCw },
      ],
    },
    {
      title: "Seller & Pro Boutique Hub",
      items: [
        { path: "/seller/dashboard", label: "Seller Center", icon: LayoutDashboard, badge: isProShop ? "PRO" : null },
        { path: "/seller/storefront", label: "Storefront Manager", icon: Store },
        { path: "/seller/inventory", label: "Stock & Inventory", icon: Box },
        { path: "/seller/analytics", label: "Sales Analytics", icon: TrendingUp },
        { path: "/seller/payouts", label: "Earnings & Payouts", icon: DollarSign },
        { path: "/seller/shipping", label: "Shipping & Couriers", icon: Truck },
        { path: "/seller/returns", label: "Returns & Claims", icon: RotateCcw },
        { path: "/seller/import", label: "Bulk Product Import", icon: Upload },
        { path: "/seller/reviews", label: "Customer Reviews", icon: Star },
        { path: "/seller/coupons", label: "Coupon Builder", icon: Tag },
        { path: "/seller/digital", label: "Digital Products", icon: Sparkles },
        { path: "/seller/staff", label: "Staff Accounts", icon: Users },
      ],
    },
    {
      title: "Rewards & Promotions",
      items: [
        { path: "/wallet", label: "Coins Wallet", icon: Coins },
        { path: "/subscriptions", label: "Pro Membership Plans", icon: CreditCard },
        { path: "/seller/ads", label: "Meta Ads Campaigns", icon: Sparkles },
        { path: "/social", label: "Social Friends Network", icon: Users },
      ],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 min-h-[80vh]">
      {/* Mobile Sidebar Toggle & Theme Button */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center shadow-xs">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">{user?.name}</span>
            <span className="text-xs text-orange-500 font-semibold">{isProShop ? "Pro Boutique Seller" : "Buyer"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-5 shadow-xs flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        {/* User Card */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800/80 space-y-2 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center shadow-xs">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">{user?.name || "Account"}</h4>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 dark:border-slate-800 font-semibold text-[11px]">
            <span className="text-amber-500 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> {user?.coins || 0} Coins
            </span>
            {isProShop && (
              <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] uppercase px-1.5 py-0.5 rounded font-bold border border-orange-500/20">
                Pro Seller
              </span>
            )}
          </div>
        </div>

        {/* Menu Sections */}
        <nav className="space-y-5 text-xs font-medium">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2.5 block">
                {section.title}
              </span>
              <div className="space-y-0.5">
                {section.items.map((item, iIdx) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={iIdx}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-lg transition duration-150 text-xs ${
                        isActive
                          ? "bg-orange-500 text-white font-semibold shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-orange-500"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-orange-500"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-amber-400 text-slate-950 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* SuperAdmin Link for authorized users with Shield Icon */}
          {isSuperAdmin && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <Link
                to="/admin"
                className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs border border-red-500/20 transition"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" /> SuperAdmin Tower
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
    </ProtectedRoute>
  );
};

export default UserDashboardLayout;
