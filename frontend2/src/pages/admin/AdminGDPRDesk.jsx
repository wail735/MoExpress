// ============================================================================
// PAGE : AdminGDPRDesk.jsx
// ROLE : GDPR / Data Privacy Compliance & Export Request Desk (/admin/gdpr)
// ============================================================================

import React, { useState } from "react";
import { ShieldCheck, Download, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminGDPRDesk = () => {
  const { addToast } = useNotification();
  const [requests] = useState([
    { id: "gdpr_1", user: "user@example.com", type: "Data Access Export (JSON)", date: "20 Aug 2026", status: "pending" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">GDPR & Data Privacy Desk</h1>
        <p className="text-xs text-gray-400">Process user Right to Access data export archives and account deletion requests</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{r.user}</h4>
                <p className="text-gray-400">Request: {r.type} | Date: {r.date}</p>
              </div>
              <button onClick={() => addToast(`Exported user data archive for ${r.user}!`, "success")} className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1">
                <Download className="w-4 h-4" /> Export Data ZIP
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGDPRDesk;
