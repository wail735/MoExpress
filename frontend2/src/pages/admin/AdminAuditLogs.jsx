// ============================================================================
// PAGE : AdminAuditLogs.jsx
// ROLE : SuperAdmin Audit Trail & System Event Tracker (/admin/audit-logs)
// ============================================================================

import React, { useState } from "react";
import { ShieldCheck, UserCheck, Lock, Activity, RefreshCw } from "lucide-react";

export const AdminAuditLogs = () => {
  const [logs] = useState([
    { id: "log_1", action: "User Role Updated", actor: "superadmin@moexpress.com", target: "pro@moexpress.com (Role: Seller)", date: "21 Aug, 19:40" },
    { id: "log_2", action: "IP Ban Added", actor: "superadmin@moexpress.com", target: "IP: 192.168.1.50 (DDOS Attempt)", date: "21 Aug, 18:22" },
    { id: "log_3", action: "Payment Proof Approved", actor: "superadmin@moexpress.com", target: "Payment #pay_101 ($299.99)", date: "21 Aug, 16:10" },
    { id: "log_4", action: "Exchange Rate Updated", actor: "superadmin@moexpress.com", target: "DZD Rate: 225.0", date: "21 Aug, 12:00" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">System Audit Trail Logs</h1>
        <p className="text-xs text-gray-400">Complete audit log of system events, security modifications, and admin actions</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Target Details</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-orange-500">{l.action}</td>
                  <td className="py-3 px-4 text-gray-300 font-mono">{l.actor}</td>
                  <td className="py-3 px-4 text-gray-400">{l.target}</td>
                  <td className="py-3 px-4 text-right text-gray-500 font-mono">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogs;
