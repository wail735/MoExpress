// ============================================================================
// PAGE : SellerLoyaltyPoints.jsx
// ROLE : Boutique-Specific Customer Loyalty Points Configurator (/seller/loyalty)
// ============================================================================

import React, { useState } from "react";
import { Award, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerLoyaltyPoints = () => {
  const { addToast } = useNotification();
  const [pointsPerEuro, setPointsPerEuro] = useState(10);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Store customer loyalty program rules saved!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-8 h-8 text-orange-500" /> Boutique Customer Loyalty Points
        </h1>
        <p className="text-xs text-gray-500">Reward repeat customers with boutique reward points for every purchase</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-500 font-semibold block mb-1">Reward Points earned per 1 € spent</label>
          <input type="number" value={pointsPerEuro} onChange={(e) => setPointsPerEuro(Number(e.target.value))} className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none font-bold text-orange-500" />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Loyalty Program
        </button>
      </form>
    </div>
  );
};

export default SellerLoyaltyPoints;
