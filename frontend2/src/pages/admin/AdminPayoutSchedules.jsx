// ============================================================================
// PAGE : AdminPayoutSchedules.jsx
// ROLE : Bi-Weekly / Monthly Automated Escrow Payout Scheduler (/admin/payout-schedules)
// ============================================================================

import React, { useState } from "react";
import { Calendar, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminPayoutSchedules = () => {
  const { addToast } = useNotification();
  const [schedule, setSchedule] = useState("biweekly");

  const handleSave = (e) => {
    e.preventDefault();
    addToast(`Automated seller payout schedule set to [${schedule.toUpperCase()}]!`, "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Automated Escrow Payout Schedule</h1>
        <p className="text-xs text-gray-400">Configure automated batch payout payout runs to seller RIB and CCP accounts</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-400 font-semibold block mb-1">Batch Payout Interval</label>
          <select value={schedule} onChange={(e) => setSchedule(e.target.value)} className="w-full bg-gray-800 text-white p-3 rounded-xl border focus:outline-none">
            <option value="weekly">Weekly (Every Monday)</option>
            <option value="biweekly">Bi-Weekly (1st & 15th of month)</option>
            <option value="monthly">Monthly (1st of month)</option>
          </select>
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs shadow-lg">
          <Save className="w-4 h-4" /> Save Payout Schedule
        </button>
      </form>
    </div>
  );
};

export default AdminPayoutSchedules;
