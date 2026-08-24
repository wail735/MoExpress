// ============================================================================
// PAGE : AdminCoinPacksCMS.jsx
// ROLE : SuperAdmin Control for Coin Packages & Purchase Pricing
// ============================================================================

import React, { useState } from "react";
import { Coins, Save, Plus, Trash2 } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminCoinPacksCMS = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [packs, setPacks] = useState([
    { id: "pack_100", coins: 100, priceEuros: 1.0 },
    { id: "pack_500", coins: 500, priceEuros: 4.5 },
    { id: "pack_1000", coins: 1000, priceEuros: 8.5 },
    { id: "pack_5000", coins: 5000, priceEuros: 39.0 },
  ]);

  const handlePackChange = (index, field, value) => {
    const updated = [...packs];
    updated[index][field] = value;
    setPacks(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Coin packages & purchase rates updated successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Virtual Coin Packs & Rates</h1>
        <p className="text-xs text-gray-400">Configure virtual coin bundle amounts and purchase prices in EUR</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Coins className="w-5 h-5 text-brand-yellow" /> Coin Packages Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {packs.map((pack, idx) => (
            <div key={pack.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 space-y-3">
              <div className="flex items-center justify-between font-bold text-sm text-yellow-300">
                <span>{pack.id}</span>
                <span className="text-xs text-gray-400">{formatPrice(pack.priceEuros)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">Coins Count</label>
                  <input
                    type="number"
                    value={pack.coins}
                    onChange={(e) => handlePackChange(idx, "coins", Number(e.target.value))}
                    className="w-full bg-gray-900 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Price (€)</label>
                  <input
                    type="number"
                    step="0.10"
                    value={pack.priceEuros}
                    onChange={(e) => handlePackChange(idx, "priceEuros", Number(e.target.value))}
                    className="w-full bg-gray-900 text-white p-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Coin Rates
        </button>
      </form>
    </div>
  );
};

export default AdminCoinPacksCMS;
