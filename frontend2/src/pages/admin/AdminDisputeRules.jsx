// ============================================================================
// PAGE : AdminDisputeRules.jsx
// ROLE : Automatic Escrow Refund Rule Engine (/admin/dispute-rules)
// ============================================================================

import React, { useState } from "react";
import { ShieldCheck, Save, Sliders } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminDisputeRules = () => {
  const { addToast } = useNotification();
  const [autoThreshold, setAutoThreshold] = useState(20);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Automated dispute resolution rule engine updated!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Dispute Auto-Resolution Rule Engine</h1>
        <p className="text-xs text-gray-400">Configure automated refund thresholds and instant buyer dispute resolution rules</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-400 font-semibold block mb-1">Instant Auto-Refund Threshold Amount (€)</label>
          <input
            type="number"
            value={autoThreshold}
            onChange={(e) => setAutoThreshold(Number(e.target.value))}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none font-bold text-orange-500"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Dispute Rules
        </button>
      </form>
    </div>
  );
};

export default AdminDisputeRules;
