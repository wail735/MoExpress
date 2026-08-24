// ============================================================================
// PAGE : UserProfile.jsx
// ROLE : User Dashboard Overview, Profile Info, Executive Metrics & Shipping Address
// ============================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  Award,
  MapPin,
  Save,
  Store,
  Package,
  Coins,
  Sparkles,
  Heart,
  CreditCard,
  Truck,
  CheckCircle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const UserProfile = () => {
  const { user, isProShop, isSupplier, updateUserProfile } = useAuth();
  const { addToast } = useNotification();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [address, setAddress] = useState("Rue 5 Juillet, Alger Centre, Algérie");
  const [phone, setPhone] = useState("+213 555 12 34 56");

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name });
    addToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      {/* Executive Header Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-xl flex items-center justify-center shadow-xs">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {user?.name}
              {isProShop && <Award className="w-4 h-4 text-orange-500" title="Verified Pro Shop" />}
              {isSupplier && <ShieldCheck className="w-4 h-4 text-blue-500" title="Certified Supplier" />}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold">
              <span className="text-slate-500">Account Tier:</span>
              <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.2 rounded font-bold border border-orange-500/20 uppercase text-[9px]">
                {user?.role || (isProShop ? "Pro Boutique Seller" : "Buyer")}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/seller/dashboard"
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <Store className="w-4 h-4" /> Pro Boutique Center
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Total Orders</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">12 Orders</p>
          <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> 2 Active In Transit
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Wishlist Saved</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">8 Items</p>
          <span className="text-[10px] text-slate-400 block">Saved for Later</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Coins Balance</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-amber-500">{user?.coins || 250} Coins</p>
          <span className="text-[10px] text-orange-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +50 Coins Ready
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Membership Tier</span>
            <CreditCard className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400">{isProShop ? "Pro Seller" : "Gold VIP"}</p>
          <span className="text-[10px] text-slate-400 block">Active Status</span>
        </div>
      </div>

      {/* Quick Access Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <Link
          to="/orders"
          className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition shadow-xs text-center space-y-1 group"
        >
          <Package className="w-5 h-5 text-blue-500 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 dark:text-white block">My Orders</span>
          <span className="text-[10px] text-slate-400 block">Track Shipments</span>
        </Link>

        <Link
          to="/wallet"
          className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition shadow-xs text-center space-y-1 group"
        >
          <Coins className="w-5 h-5 text-amber-500 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 dark:text-white block">Coins Wallet</span>
          <span className="text-[10px] text-slate-400 block">{user?.coins || 250} Coins</span>
        </Link>

        <Link
          to="/subscriptions"
          className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition shadow-xs text-center space-y-1 group"
        >
          <CreditCard className="w-5 h-5 text-emerald-500 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 dark:text-white block">Subscriptions</span>
          <span className="text-[10px] text-slate-400 block">Pro Tier Plans</span>
        </Link>

        <Link
          to="/wishlist"
          className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition shadow-xs text-center space-y-1 group"
        >
          <Heart className="w-5 h-5 text-red-500 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 dark:text-white block">Wishlist</span>
          <span className="text-[10px] text-slate-400 block">Saved Products</span>
        </Link>

        <Link
          to="/seller/dashboard"
          className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition shadow-xs text-center space-y-1 group"
        >
          <Store className="w-5 h-5 text-orange-500 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 dark:text-white block">Seller Hub</span>
          <span className="text-[10px] text-slate-400 block">Pro Dashboard</span>
        </Link>

        <Link
          to="/seller/ads"
          className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition shadow-xs text-center space-y-1 group"
        >
          <Sparkles className="w-5 h-5 text-purple-500 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 dark:text-white block">Meta Ads</span>
          <span className="text-[10px] text-slate-400 block">Promotions</span>
        </Link>
      </div>

      {/* Active Order Tracker */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-orange-500" /> Active Shipment Tracker
          </h3>
          <Link to="/orders" className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1">
            View All Orders <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Order #MOEX-89230</span>
              <p className="text-[11px] text-slate-500">Sony WH-1000XM5 Wireless Headphones</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:w-48 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full w-3/4 rounded-full" />
            </div>
            <span className="text-[11px] font-bold text-orange-500 whitespace-nowrap">In Transit</span>
          </div>
        </div>
      </div>

      {/* Edit Personal Details & Address Form */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
          Personal Profile & Shipping Address
        </h3>

        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-slate-200/60 dark:bg-slate-800/50 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Default Shipping Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="2"
              className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

