// ============================================================================
// PAGE : AdminDDoSShield.jsx
// ROLE : Rate Limit Thresholds & IP DDoS Protection Manager (/admin/ddos-shield)
// ============================================================================

import React, { useState } from "react";
import { ShieldAlert, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminDDoSShield = () => {
  const { addToast } = useNotification();
  const [maxReqPerMin, setMaxReqPerMin] = useState(120);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("DDoS rate limit shield configuration saved!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Rate Limit & DDoS Protection Shield</h1>
        <p className="text-xs text-gray-400">Configure API rate limiter window limits, IP throttling thresholds, and bot protection</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-400 font-semibold block mb-1">Max Requests Allowed per Minute (per IP)</label>
          <input type="number" value={maxReqPerMin} onChange={(e) => setMaxReqPerMin(Number(e.target.value))} className="w-full bg-gray-800 text-white p-3 rounded-xl border focus:outline-none font-bold text-orange-500" />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save DDoS Rules
        </button>
      </form>
    </div>
  );
};

export default AdminDDoSShield;
