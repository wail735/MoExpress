// ============================================================================
// PAGE : AdminAffiliateTiers.jsx
// ROLE : Multi-Tier Affiliate Referral Commission Matrix (/admin/affiliate-tiers)
// ============================================================================

import React, { useState } from "react";
import { Share2, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminAffiliateTiers = () => {
  const { addToast } = useNotification();
  const [tier1, setTier1] = useState(5.0);
  const [tier2, setTier2] = useState(2.0);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Multi-tier affiliate commission rates updated!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Multi-Tier Affiliate Referral Matrix</h1>
        <p className="text-xs text-gray-400">Set commission rates for direct referrals (Tier 1) and sub-referrals (Tier 2)</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Tier 1 Direct Referral Commission (%)</label>
            <input type="number" step="0.5" value={tier1} onChange={(e) => setTier1(Number(e.target.value))} className="w-full bg-gray-800 text-white p-3 rounded-xl border focus:outline-none font-bold text-orange-500" />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Tier 2 Sub-Referral Commission (%)</label>
            <input type="number" step="0.5" value={tier2} onChange={(e) => setTier2(Number(e.target.value))} className="w-full bg-gray-800 text-white p-3 rounded-xl border focus:outline-none font-bold text-amber-500" />
          </div>
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Tier Matrix
        </button>
      </form>
    </div>
  );
};

export default AdminAffiliateTiers;
