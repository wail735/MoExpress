// ============================================================================
// PAGE : AdminCouponsCMS.jsx
// ROLE : Promo Codes & Coin Vouchers Generator (/admin/coupons)
// ============================================================================

import React, { useState } from "react";
import { Ticket, Plus, Save, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminCouponsCMS = () => {
  const { addToast } = useNotification();
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [coinsBonus, setCoinsBonus] = useState(50);

  const [coupons, setCoupons] = useState([
    { id: "c1", code: "MOEX2026", discountPercent: 15, coinsBonus: 100 },
    { id: "c2", code: "VIPPRO50", discountPercent: 20, coinsBonus: 200 },
  ]);

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setCoupons((prev) => [{ id: "c_" + Date.now(), code, discountPercent, coinsBonus }, ...prev]);
    addToast(`Coupon code [${code}] created!`, "success");
    setCode("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Promo Codes & Coupon Generator</h1>
        <p className="text-xs text-gray-400">Create site-wide discount codes, VIP vouchers, and coin bonus codes</p>
      </div>

      <form onSubmit={handleCreateCoupon} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-orange-500" /> Create New Coupon Voucher
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FLASH2026"
              required
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 font-mono font-bold text-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Discount (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Bonus Coins</label>
            <input
              type="number"
              value={coinsBonus}
              onChange={(e) => setCoinsBonus(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs"
        >
          <Plus className="w-4 h-4" /> Generate Coupon Code
        </button>
      </form>
    </div>
  );
};

export default AdminCouponsCMS;
