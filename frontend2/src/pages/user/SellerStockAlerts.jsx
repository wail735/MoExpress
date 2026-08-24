// ============================================================================
// PAGE : SellerStockAlerts.jsx
// ROLE : Low-Stock SMS & Email Trigger Manager (/seller/stock-alerts)
// ============================================================================

import React, { useState } from "react";
import { Bell, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerStockAlerts = () => {
  const { addToast } = useNotification();
  const [minThreshold, setMinThreshold] = useState(10);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Low stock alert threshold saved!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-8 h-8 text-orange-500" /> Low-Stock Alert Triggers
        </h1>
        <p className="text-xs text-gray-500">Receive instant SMS and email notifications when inventory drops below safety threshold</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-500 font-semibold block mb-1">Minimum Stock Alert Threshold (Units)</label>
          <input type="number" value={minThreshold} onChange={(e) => setMinThreshold(Number(e.target.value))} className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none font-bold text-orange-500" />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Threshold
        </button>
      </form>
    </div>
  );
};

export default SellerStockAlerts;
