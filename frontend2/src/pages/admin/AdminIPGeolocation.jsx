// ============================================================================
// PAGE : AdminIPGeolocation.jsx
// ROLE : IP Country Auto-Detection & Currency Auto-Switcher Config (/admin/ip-geolocation)
// ============================================================================

import React, { useState } from "react";
import { Globe, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminIPGeolocation = () => {
  const { addToast } = useNotification();
  const [autoDetect, setAutoDetect] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("IP Geolocation & auto-currency rules saved!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">IP Geolocation & Auto-Currency Switcher</h1>
        <p className="text-xs text-gray-400">Automatically detect visitor country via IP address and set default currency & language</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <label className="text-white font-bold text-sm cursor-pointer flex items-center gap-2">
          <input type="checkbox" checked={autoDetect} onChange={(e) => setAutoDetect(e.target.checked)} className="w-5 h-5 accent-brand-orange" />
          <span>Enable Automatic IP Country & Currency Detection</span>
        </label>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Geolocation Rules
        </button>
      </form>
    </div>
  );
};

export default AdminIPGeolocation;
