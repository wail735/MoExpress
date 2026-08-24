// ============================================================================
// PAGE : SellerDashboard.jsx
// ROLE : Seller Center Dashboard & Product Creation Modal
// ============================================================================

import React, { useState } from "react";
import { Store, Plus, DollarSign, Package, TrendingUp, Award, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const SellerDashboard = () => {
  const { user, isProShop, isSupplier } = useAuth();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [showProductModal, setShowProductModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");

  const handleCreateProduct = (e) => {
    e.preventDefault();
    addToast(`Product "${name}" submitted for publishing!`, "success");
    setShowProductModal(false);
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-navy via-brand-dark to-brand-navy p-8 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange-500/30 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2 justify-center sm:justify-start">
            <Store className="w-8 h-8 text-orange-500" />
            {isProShop ? "Pro Shop Seller Center" : "Standard Seller Dashboard"}
          </h2>
          <p className="text-xs text-gray-300">Manage products, track orders, and view earnings</p>
        </div>

        <button
          onClick={() => setShowProductModal(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:opacity-95 transition flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {/* Upgrade Prompt for Standard Non-Pro Sellers */}
      {!isProShop && (
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Upgrade to Boutique Pro Shop!</h4>
              <p className="text-gray-500">Free accounts are limited to 3 listings. Pro Shops get unlimited products, Verified Badges, and Meta Ads links.</p>
            </div>
          </div>
          <a
            href="/subscriptions"
            className="bg-orange-500 text-white font-bold px-4 py-2 rounded-full hover:bg-brand-accent transition whitespace-nowrap shadow"
          >
            Upgrade Now
          </a>
        </div>
      )}

      {/* Sales Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Total Sales Balance</span>
          <h3 className="text-xl font-black text-orange-500">{formatPrice(user?.sellerBalance || 12450.75)}</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Orders Received</span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">256 Orders</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Store Visitors</span>
          <h3 className="text-xl font-black text-amber-500">8,452</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Conversion Rate</span>
          <h3 className="text-xl font-black text-green-500">3.2%</h3>
        </div>
      </div>

      {/* Create Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-orange-500" /> Add New Product Listing
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product name..."
                  required
                  className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Price (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="99.99"
                    required
                    className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  placeholder="Detailed description..."
                  required
                  className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold text-xs sm:text-sm py-3 rounded-xl hover:bg-brand-accent transition shadow-lg"
              >
                Publish Product Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
