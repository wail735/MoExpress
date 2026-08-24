// ============================================================================
// PAGE : SellerCouponBuilder.jsx
// ROLE : Pro Boutique Custom Promo Code & Voucher Builder (/seller/coupons)
// ============================================================================

import React, { useState } from "react";
import { Ticket, Plus, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerCouponBuilder = () => {
  const { addToast } = useNotification();
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(15);

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    addToast(`Pro Boutique voucher code [${code}] created!`, "success");
    setCode("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Ticket className="w-8 h-8 text-orange-500" /> Pro Boutique Voucher Builder
        </h1>
        <p className="text-xs text-gray-500">Create custom store discount promo codes for your boutique customers</p>
      </div>

      <form onSubmit={handleCreateCoupon} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> Create Store Coupon
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Store Promo Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. STORE2026"
              required
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 font-mono font-bold text-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Discount Rate (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" /> Create Store Coupon
        </button>
      </form>
    </div>
  );
};

export default SellerCouponBuilder;
