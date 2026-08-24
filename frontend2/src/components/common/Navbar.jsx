// ============================================================================
// COMPONENT : Navbar.jsx
// ROLE : Shadcn Marketplace Navigation with User Dropdown, Admin Shield Access & Theme Switcher
// ============================================================================

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  User,
  Heart,
  Globe,
  Coins,
  Sparkles,
  Zap,
  Flame,
  Award,
  Download,
  Menu,
  X,
  Truck,
  Store,
  Grid,
  ChevronDown,
  Gift,
  HelpCircle,
  ShieldCheck,
  ShieldAlert,
  Tag,
  Package,
  Layers,
  Camera,
  Eye,
  Percent,
  TrendingUp,
  Sun,
  Moon,
  LogOut,
  Gamepad2,
  Brain,
  RotateCw,
  Mail,
  PhoneCall,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useTheme } from "../../context/ThemeContext";
import AIChatModal from "./AIChatModal";

export const Navbar = ({ onOpenCartDrawer }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isSuperAdmin, isSeller, isProShop, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { currentLang = "en", changeLanguage = () => {}, supportedLanguages = [] } = useLanguage() || {};
  const { currentCurrency = "EUR", changeCurrency = () => {}, currencies = [] } = useCurrency() || {};
  const { isDark, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = (cartItems || []).reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const megaMenuSections = [
    {
      title: "Flash Deals & Value",
      headerIcon: Flame,
      items: [
        { path: "/flash-deals", label: "Flash Deals (Up to 80% OFF)", icon: Flame },
        { path: "/super-deals", label: "Choice Deals (3 for $5.99)", icon: Zap },
        { path: "/super-value", label: "Super Value Deals", icon: Percent },
        { path: "/clearance", label: "Clearance Outlet", icon: Tag },
        { path: "/mystery-deal", label: "Mystery Tech Deals", icon: Gift },
      ],
    },
    {
      title: "Shopping & Digital",
      headerIcon: ShoppingBag,
      items: [
        { path: "/catalog", label: "Full Product Catalog", icon: ShoppingBag },
        { path: "/digital", label: "Digital Goods Marketplace", icon: Download },
        { path: "/brands", label: "Official Brand Flagships", icon: Award },
        { path: "/franchise", label: "Physical Store Outlets", icon: Store },
        { path: "/group-buy", label: "Group Buying Discounts", icon: Layers },
        { path: "/auctions", label: "Live Auctions Hub", icon: TrendingUp },
      ],
    },
    {
      title: "Rewards & Interactive",
      headerIcon: Gamepad2,
      items: [
        { path: "/coins-exchange", label: "Coins Reward Exchange", icon: Coins },
        { path: "/quiz", label: "Daily Trivia Quiz", icon: HelpCircle },
        { path: "/lucky-draw", label: "Lucky Spin Wheel", icon: Sparkles },
        { path: "/referral", label: "Referral & Earn", icon: Gift },
        { path: "/trade-in", label: "Trade-In & Refurbished", icon: RotateCw },
      ],
    },
    {
      title: "Smart AI Tools",
      headerIcon: Brain,
      items: [
        { path: "/ai-reviews", label: "AI Review Summarizer", icon: Sparkles },
        { path: "/visual-search", label: "Visual Camera Search", icon: Camera },
        { path: "/ar-viewer", label: "3D AR Product Viewer", icon: Eye },
        { path: "/virtual-tryon", label: "Virtual Fashion Try-On", icon: Sparkles },
        { path: "/customizer", label: "Live 3D Customizer", icon: Layers },
      ],
    },
    {
      title: "Seller & Support",
      headerIcon: Store,
      items: [
        { path: "/seller/dashboard", label: "Seller & Pro Boutique Hub", icon: Store },
        { path: "/rfq", label: "Bulk RFQ Wholesale", icon: Package },
        { path: "/global-shipping", label: "7-Day Express Shipping", icon: Truck },
        { path: "/help", label: "Help Center & FAQ", icon: HelpCircle },
        { path: "/disputes", label: "Conflict & Escrow Desk", icon: ShieldCheck },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-300 text-[11px] py-1 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link to="/flash-deals" className="hover:text-red-400 transition flex items-center gap-1 font-bold text-red-400">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Flash Deals
          </Link>
          <Link to="/super-deals" className="hover:text-amber-400 transition flex items-center gap-1 font-bold text-amber-400">
            <Zap className="w-3 h-3 text-amber-400" /> Choice 3 for $5.99
          </Link>
          <Link to="/digital" className="hover:text-emerald-400 transition flex items-center gap-1">
            <Download className="w-3 h-3 text-emerald-400" /> Digital Market
          </Link>
          <Link to="/global-shipping" className="hidden sm:flex items-center gap-1 hover:text-white">
            <Truck className="w-3 h-3 text-blue-400" /> Express 7-Day Shipping
          </Link>
        </div>

        <div className="flex items-center gap-3.5">
          {/* Email / Newsletter Shortcut Icon */}
          <Link to="/help" title="Subscribe to Newsletter & Email Support" className="flex items-center gap-1 hover:text-orange-400 transition text-slate-300">
            <Mail className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline font-semibold">Newsletter</span>
          </Link>

          {/* Contact & Support Phone Icon */}
          <Link to="/help" title="24/7 Support Desk" className="flex items-center gap-1 hover:text-amber-400 transition text-slate-300">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-semibold">24/7 Support</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 dark:text-yellow-300 px-2 py-0.5 rounded-md text-[10px] border border-slate-700 transition font-bold"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-400" />}
            <span className="text-slate-200">{isDark ? "Light" : "Dark"}</span>
          </button>

          {/* Language Selector */}
          <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 text-[10px] border border-slate-700 focus:outline-none cursor-pointer"
          >
            {(supportedLanguages || []).map((l) => (
              <option key={l.code} value={l.code}>
                {l.code.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Currency Selector */}
          <select
            value={currentCurrency}
            onChange={(e) => changeCurrency(e.target.value)}
            className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 text-[10px] border border-slate-700 focus:outline-none cursor-pointer"
          >
            {(currencies || []).map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 relative">
        {/* Logo & All Pages Mega Menu Button */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Mo<span className="text-orange-500">Express</span>
            </span>
          </Link>

          {/* Mega Menu Toggle */}
          <button
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
          >
            <Grid className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden sm:inline">Categories</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Search products, flash deals, boutiques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs px-3.5 py-1.5 pl-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
          />
          <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-md transition">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-2.5 text-xs font-medium">
          {/* SuperAdmin Shield Icon Access */}
          {isSuperAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg border border-red-500/20 font-bold transition"
              title="SuperAdmin Panel Access"
            >
              <ShieldCheck className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Admin</span>
            </Link>
          )}

          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* AI Shopping Assistant Trigger Button */}
          <button
            onClick={() => setAiChatOpen(true)}
            className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-xs"
            title="MoExpress NVIDIA AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">AI Chat</span>
          </button>

          <Link to="/flash-deals" className="hidden lg:flex items-center gap-1 text-red-500 font-bold hover:text-red-400 transition">
            <Flame className="w-4 h-4 text-red-500" /> Flash Deals
          </Link>

          <Link to="/wishlist" className="relative p-1.5 text-slate-700 dark:text-slate-200 hover:text-orange-500 transition">
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button onClick={onOpenCartDrawer} className="relative p-1.5 text-slate-700 dark:text-slate-200 hover:text-orange-500 transition">
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Icon Dropdown Menu */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 hidden sm:inline truncate max-w-[90px]">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Panel */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-2 space-y-1 animate-fadeIn">
                  {/* User Profile Header */}
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800/80 mb-1">
                    <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800 text-[10px]">
                      <span className="font-semibold text-amber-500 flex items-center gap-1">
                        <Coins className="w-3 h-3" /> {user?.coins || 0} Coins
                      </span>
                      <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase">
                        {isSuperAdmin ? "SuperAdmin" : isProShop ? "Pro Seller" : "Buyer"}
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Navigation Links */}
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500 transition font-medium"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" /> Account Overview
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500 transition font-medium"
                  >
                    <Package className="w-3.5 h-3.5 text-blue-400" /> My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500 transition font-medium"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-400" /> Saved Wishlist
                  </Link>

                  <Link
                    to="/wallet"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500 transition font-medium"
                  >
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> Coins Wallet
                  </Link>

                  <Link
                    to="/seller/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500 transition font-medium"
                  >
                    <Store className="w-3.5 h-3.5 text-orange-500" /> Seller Hub
                  </Link>

                  {/* SuperAdmin Panel Link with Shield Icon */}
                  {isSuperAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 font-bold transition"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> SuperAdmin Tower
                      </span>
                      <span className="text-[9px] uppercase tracking-wider bg-red-500 text-white px-1 rounded">Pro</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        navigate("/login");
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mega Menu Dropdown Panel */}
      {megaMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-6 animate-fadeIn">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {megaMenuSections.map((section, idx) => {
              const SectionHeaderIcon = section.headerIcon;
              return (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                    <SectionHeaderIcon className="w-3.5 h-3.5 text-orange-500" />
                    <span>{section.title}</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {section.items.map((item, iIdx) => {
                      const Icon = item.icon;
                      return (
                        <li key={iIdx}>
                          <Link
                            to={item.path}
                            onClick={() => setMegaMenuOpen(false)}
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 font-medium transition"
                          >
                            <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500" /> {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="max-w-7xl mx-auto pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Direct Portal Directory</span>
            <button
              onClick={() => setMegaMenuOpen(false)}
              className="text-orange-500 font-semibold hover:underline flex items-center gap-1"
            >
              Close <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* NVIDIA Nemotron AI Assistant Modal (Tier-Gated) */}
      <AIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </header>
  );
};

export default Navbar;

