// ============================================================================
// PAGE : AdminTierPlansCMS.jsx
// ROLE : SuperAdmin Subscription Plans & Pricing Tier Configurator (/admin/tier-plans)
// ============================================================================

import React, { useState } from "react";
import { Zap, Save, Plus, Award, Coins, ShieldCheck, Trash2 } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminTierPlansCMS = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [plans, setPlans] = useState([
    {
      id: "plan_basic",
      name: "Basic Seller",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      coinsMonthly: 100,
      maxProducts: 25,
      commissionDiscount: "2%",
      badge: "Standard Seller",
      badgeColor: "bg-blue-600",
      featured: false,
    },
    {
      id: "plan_pro",
      name: "Pro Boutique",
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      coinsMonthly: 500,
      maxProducts: 250,
      commissionDiscount: "5%",
      badge: "Verified Pro Shop 💎",
      badgeColor: "bg-purple-600",
      featured: true,
    },
    {
      id: "plan_enterprise",
      name: "Enterprise Supplier",
      monthlyPrice: 199.99,
      yearlyPrice: 1999.99,
      coinsMonthly: 2500,
      maxProducts: 5000,
      commissionDiscount: "10%",
      badge: "Certified Supplier 🏅",
      badgeColor: "bg-amber-500",
      featured: false,
    },
  ]);

  const handlePriceChange = (id, field, value) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: Number(value) } : p))
    );
  };

  const handleSavePlans = (e) => {
    e.preventDefault();
    addToast("Subscription tier plans & pricing updated successfully!", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Zap className="w-8 h-8 text-orange-500" /> Subscription Plans & Pricing Configurator
          </h1>
          <p className="text-xs text-gray-400">Modify subscription plan pricing, coin allowances, product upload limits, and badges</p>
        </div>

        <button
          onClick={handleSavePlans}
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-6 py-3 rounded-full transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Plan Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`bg-slate-900 text-white p-6 rounded-3xl border ${
              p.featured ? "border-brand-orange shadow-2xl scale-105" : "border-gray-800 shadow-xl"
            } space-y-4 flex flex-col justify-between`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 className="font-extrabold text-base text-white">{p.name}</h3>
                <span className={`text-[10px] font-black uppercase text-white px-2.5 py-0.5 rounded ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Monthly Price (€)</label>
                  <input
                    type="number"
                    step="5"
                    value={p.monthlyPrice}
                    onChange={(e) => handlePriceChange(p.id, "monthlyPrice", e.target.value)}
                    className="w-full bg-gray-800 text-white p-2.5 rounded-xl border border-gray-700 font-bold text-orange-500 text-base focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Annual Price (€)</label>
                  <input
                    type="number"
                    step="10"
                    value={p.yearlyPrice}
                    onChange={(e) => handlePriceChange(p.id, "yearlyPrice", e.target.value)}
                    className="w-full bg-gray-800 text-white p-2.5 rounded-xl border border-gray-700 font-bold text-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Monthly Coins Allowance</label>
                  <input
                    type="number"
                    step="50"
                    value={p.coinsMonthly}
                    onChange={(e) => handlePriceChange(p.id, "coinsMonthly", e.target.value)}
                    className="w-full bg-gray-800 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Max Product Upload Limit</label>
                  <input
                    type="number"
                    step="10"
                    value={p.maxProducts}
                    onChange={(e) => handlePriceChange(p.id, "maxProducts", e.target.value)}
                    className="w-full bg-gray-800 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 text-center">
              <span className="text-[11px] text-gray-400 font-medium">Commission Discount: <strong className="text-green-400">{p.commissionDiscount}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTierPlansCMS;
