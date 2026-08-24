// ============================================================================
// PAGE : AdminFlashDealsCMS.jsx
// ROLE : Flash Sale Deal Scheduler & Homepage Banner Manager (/admin/flash-deals)
// ============================================================================

import React, { useState } from "react";
import { Zap, Clock, Save, Plus } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminFlashDealsCMS = () => {
  const { addToast } = useNotification();
  const [durationHours, setDurationHours] = useState(24);
  const [discountPercent, setDiscountPercent] = useState(50);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Flash sale event scheduled successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Flash Sale Scheduler</h1>
        <p className="text-xs text-gray-400">Schedule mega flash sale events, set discount rates, and manage countdown timers</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-500" /> Schedule Event
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Event Duration (Hours)</label>
            <input
              type="number"
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Default Flash Discount (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs"
        >
          <Save className="w-4 h-4" /> Save Flash Sale Event
        </button>
      </form>
    </div>
  );
};

export default AdminFlashDealsCMS;
