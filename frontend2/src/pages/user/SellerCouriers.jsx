// ============================================================================
// PAGE : SellerCouriers.jsx
// ROLE : Yalidine, EMS Poste Local Express Courier API Connector (/seller/couriers)
// ============================================================================

import React, { useState } from "react";
import { Truck, Check, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerCouriers = () => {
  const { addToast } = useNotification();
  const [yalidineKey, setYalidineKey] = useState("YAL_API_KEY_LIVE_2026");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Yalidine & EMS Courier API credentials saved!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Truck className="w-8 h-8 text-orange-500" /> Local Courier API Integrations
        </h1>
        <p className="text-xs text-gray-500">Connect Yalidine Express, EMS Algérie Poste, and Mayestro courier APIs for automated shipping slips</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-500 font-semibold block mb-1">Yalidine Express API Key</label>
          <input type="text" value={yalidineKey} onChange={(e) => setYalidineKey(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none font-mono" />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save API Keys
        </button>
      </form>
    </div>
  );
};

export default SellerCouriers;
