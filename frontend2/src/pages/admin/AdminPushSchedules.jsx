// ============================================================================
// PAGE : AdminPushSchedules.jsx
// ROLE : Scheduled Push Notification Campaign Planner (/admin/push-schedules)
// ============================================================================

import React, { useState } from "react";
import { Bell, Calendar, Plus } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminPushSchedules = () => {
  const { addToast } = useNotification();
  const [schedules] = useState([
    { id: "ps_1", title: "Black Friday Sale Teaser", date: "25 Nov 2026", status: "scheduled" },
  ]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Scheduled Push Notification Planner</h1>
        <p className="text-xs text-gray-400">Schedule automated push notifications for upcoming sales events and holidays</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {schedules.map((s) => (
            <div key={s.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{s.title}</h4>
                <p className="text-gray-400"><Calendar className="w-3.5 h-3.5 inline text-orange-500" /> Scheduled Date: {s.date}</p>
              </div>
              <span className="bg-yellow-500 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPushSchedules;
