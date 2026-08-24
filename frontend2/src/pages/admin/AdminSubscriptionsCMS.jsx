// ============================================================================
// PAGE : AdminSubscriptionsCMS.jsx
// ROLE : SuperAdmin Control for VIP Subscriptions Plans, Prices & Features
// ============================================================================

import React, { useState } from "react";
import { Zap, Save, Plus, Trash2 } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminSubscriptionsCMS = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [plans, setPlans] = useState([
    { name: "Basic", price: 4.99, discountRate: 5, coinsBonus: 50, noAds: true, includesProShop: false },
    { name: "Premium", price: 9.99, discountRate: 10, coinsBonus: 150, noAds: true, includesProShop: false },
    { name: "Pro", price: 19.99, discountRate: 20, coinsBonus: 400, noAds: true, includesProShop: true },
    { name: "Enterprise", price: 49.99, discountRate: 30, coinsBonus: 1000, noAds: true, includesProShop: true },
  ]);

  const handlePriceChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Subscription plans and VIP pricing updated successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">VIP Subscriptions & Pricing Management</h1>
        <p className="text-xs text-gray-400">Modify plan prices, discount rates, monthly coin bonuses, and Pro Shop access</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-500" /> Subscription Plans Configuration
        </h3>

        <div className="space-y-4">
          {plans.map((plan, idx) => (
            <div key={plan.name} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 space-y-3">
              <div className="flex items-center justify-between font-bold text-sm text-orange-500">
                <span>Plan: {plan.name}</span>
                <span className="text-xs text-gray-400">Monthly Price: {formatPrice(plan.price)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">Price (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={plan.price}
                    onChange={(e) => handlePriceChange(idx, "price", Number(e.target.value))}
                    className="w-full bg-gray-900 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Discount Rate (%)</label>
                  <input
                    type="number"
                    value={plan.discountRate}
                    onChange={(e) => handlePriceChange(idx, "discountRate", Number(e.target.value))}
                    className="w-full bg-gray-900 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Coins Bonus</label>
                  <input
                    type="number"
                    value={plan.coinsBonus}
                    onChange={(e) => handlePriceChange(idx, "coinsBonus", Number(e.target.value))}
                    className="w-full bg-gray-900 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <label className="text-gray-300 font-semibold flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={plan.includesProShop}
                      onChange={(e) => handlePriceChange(idx, "includesProShop", e.target.checked)}
                      className="accent-brand-orange"
                    />
                    <span>Includes Pro Shop</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Subscription Pricing
        </button>
      </form>
    </div>
  );
};

export default AdminSubscriptionsCMS;
