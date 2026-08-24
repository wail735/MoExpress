// ============================================================================
// PAGE : AdminMaintenanceMode.jsx
// ROLE : One-Click Platform Maintenance Mode Banner Toggle (/admin/maintenance-mode)
// ============================================================================

import React, { useState } from "react";
import { AlertTriangle, Power, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminMaintenanceMode = () => {
  const { addToast } = useNotification();
  const [maintenance, setMaintenance] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("Platform Maintenance in Progress. We will be back online shortly!");

  const handleSave = (e) => {
    e.preventDefault();
    addToast(`Maintenance mode is now [${maintenance ? "ENABLED" : "DISABLED"}]!`, maintenance ? "warning" : "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Platform Maintenance Mode Controller</h1>
        <p className="text-xs text-gray-400">Toggle site-wide maintenance banner and restrict public buyer access during database upgrades</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Power className="w-5 h-5 text-orange-500" /> Maintenance Mode Toggle
        </h3>

        <div className="flex items-center gap-4 py-2">
          <label className="text-white font-bold text-sm cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={maintenance}
              onChange={(e) => setMaintenance(e.target.checked)}
              className="w-5 h-5 accent-brand-orange"
            />
            <span>Enable Platform Maintenance Mode</span>
          </label>
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Maintenance Banner Announcement Text</label>
          <input
            type="text"
            value={bannerMessage}
            onChange={(e) => setBannerMessage(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs">
          <Save className="w-4 h-4" /> Save Maintenance Settings
        </button>
      </form>
    </div>
  );
};

export default AdminMaintenanceMode;
