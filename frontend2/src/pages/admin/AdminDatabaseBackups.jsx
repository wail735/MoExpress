// ============================================================================
// PAGE : AdminDatabaseBackups.jsx
// ROLE : Scheduled MongoDB Database Backup & JSON Dump Export Center (/admin/database-backups)
// ============================================================================

import React, { useState } from "react";
import { Database, Download, RefreshCw, Check } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminDatabaseBackups = () => {
  const { addToast } = useNotification();
  const [backups, setBackups] = useState([
    { id: "bk_1", name: "moexpress_backup_2026_08_21.json", size: "48.2 MB", date: "21 Aug, 04:00 AM" },
  ]);

  const handleTriggerBackup = () => {
    addToast("MongoDB Database backup trigger started!", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Database Backup & Export Center</h1>
          <p className="text-xs text-gray-400">Trigger manual MongoDB dumps, scheduled backups, and download JSON/BSON archives</p>
        </div>

        <button
          onClick={handleTriggerBackup}
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-6 py-3 rounded-full transition flex items-center gap-2 shadow-lg"
        >
          <Database className="w-4 h-4" /> Trigger Backup Now
        </button>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">Available Backup Archives</h3>
        <div className="space-y-3">
          {backups.map((b) => (
            <div key={b.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-mono font-bold text-sm text-white">{b.name}</h4>
                <p className="text-gray-400">Size: {b.size} | Date: {b.date}</p>
              </div>
              <button onClick={() => addToast(`Downloading ${b.name}...`, "info")} className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDatabaseBackups;
