// ============================================================================
// PAGE : PriceTracker.jsx
// ROLE : CamelCamelCamel-style Price History Graph & Price Drop Alerts (/price-tracker)
// ============================================================================

import React, { useState } from "react";
import { TrendingDown, Bell, Check, DollarSign } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const PriceTracker = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [targetPrice, setTargetPrice] = useState("");
  const [alertSet, setAlertSet] = useState(false);

  const handleSetAlert = (e) => {
    e.preventDefault();
    setAlertSet(true);
    addToast(`Price drop alert set for ${formatPrice(targetPrice)}! We will notify you when price drops.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-green-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <TrendingDown className="w-4 h-4" /> Price Drop Tracker
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Historical Price Graph & Alerts</h1>
        <p className="text-xs text-gray-500">Track 90-day price trends and set instant price drop notifications</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" alt="Product" className="w-20 h-20 object-cover rounded-2xl border" />
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Sony WH-1000XM5 Wireless Headphones</h3>
            <span className="text-xs text-gray-400">Current Price: <strong className="text-orange-500 text-sm">{formatPrice(299.99)}</strong></span>
          </div>
        </div>

        {/* Price History Bar Chart */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase text-gray-500">90-Day Price History</h4>
          <div className="h-32 bg-gray-100 dark:bg-gray-800/80 rounded-2xl border p-4 flex items-end justify-between gap-2">
            <div className="bg-orange-500/40 w-full h-[90%] rounded-t-lg relative group"><span className="opacity-0 group-hover:opacity-100 text-[10px] text-white absolute -top-5 left-0 font-bold">$399</span></div>
            <div className="bg-orange-500/60 w-full h-[75%] rounded-t-lg relative group"><span className="opacity-0 group-hover:opacity-100 text-[10px] text-white absolute -top-5 left-0 font-bold">$349</span></div>
            <div className="bg-orange-500/80 w-full h-[65%] rounded-t-lg relative group"><span className="opacity-0 group-hover:opacity-100 text-[10px] text-white absolute -top-5 left-0 font-bold">$319</span></div>
            <div className="bg-green-500 w-full h-[50%] rounded-t-lg relative group"><span className="opacity-0 group-hover:opacity-100 text-[10px] text-white absolute -top-5 left-0 font-bold">$299</span></div>
          </div>
        </div>

        {/* Price Drop Alert Form */}
        <form onSubmit={handleSetAlert} className="space-y-3 pt-2">
          <label className="text-xs font-bold text-gray-500 block">Set Price Drop Notification Threshold (€)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Target price e.g. 250.00"
              required
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:border-orange-500 font-bold"
            />
            <button
              type="submit"
              disabled={alertSet}
              className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3 rounded-xl shadow-md transition flex items-center gap-1.5 text-xs"
            >
              {alertSet ? <><Check className="w-4 h-4" /> Alert Active</> : <><Bell className="w-4 h-4" /> Set Alert</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceTracker;
