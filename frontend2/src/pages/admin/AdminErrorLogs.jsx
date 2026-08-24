// ============================================================================
// PAGE : AdminErrorLogs.jsx
// ROLE : Unhandled Exception Logs Inspector & Stack Trace Console (/admin/error-logs)
// ============================================================================

import React, { useState } from "react";
import { AlertTriangle, Terminal, RefreshCw } from "lucide-react";

export const AdminErrorLogs = () => {
  const [logs] = useState([
    { id: "err_1", type: "Unhandled Promise Rejection", path: "/api/v1/payments/process", time: "21 Aug, 20:15", status: "caught" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Unhandled Error Logs Console</h1>
        <p className="text-xs text-gray-400">Live exception stack traces, HTTP 500 error logs, and API crash reports</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs font-mono">
        <div className="space-y-3">
          {logs.map((l) => (
            <div key={l.id} className="p-4 bg-gray-900 rounded-2xl border border-red-500/30 text-red-400 space-y-1">
              <span className="font-bold text-white">[{l.time}] {l.type}</span>
              <p className="text-gray-400">Target Endpoint: {l.path}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminErrorLogs;
