// ============================================================================
// PAGE : AdminUserHeatmaps.jsx
// ROLE : User Session Activity Heatmaps & Country Analytics (/admin/user-heatmaps)
// ============================================================================

import React, { useState } from "react";
import { Activity, Globe, Eye, Download, Filter, MapPin } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminUserHeatmaps = () => {
  const { addToast } = useNotification();
  const [selectedCountry, setSelectedCountry] = useState("all");

  const countriesData = [
    { country: "Algeria 🇩🇿", activeUsers: 240, percentage: "68%", topPage: "/choice-deals", avgDuration: "4m 50s" },
    { country: "France 🇫🇷", activeUsers: 64, percentage: "18%", topPage: "/digital-market", avgDuration: "3m 40s" },
    { country: "UAE 🇦🇪", activeUsers: 38, percentage: "14%", topPage: "/flash-deals", avgDuration: "5m 12s" },
  ];

  const filteredCountries = countriesData.filter(
    (c) => selectedCountry === "all" || c.country.toLowerCase().includes(selectedCountry.toLowerCase())
  );

  const handleExportLogs = () => {
    addToast("Exporting 1,000+ session click heatmaps to CSV...", "info");
    setTimeout(() => {
      addToast("Heatmap Session Log CSV downloaded!", "success");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" /> User Session Heatmaps & Geolocation
          </h1>
          <p className="text-xs text-gray-400">Live country session traffic, page click heatmaps, and buyer navigation paths</p>
        </div>

        <button
          onClick={handleExportLogs}
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Download className="w-4 h-4" /> Export Heatmap Logs
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-gray-800 space-y-1 shadow-xl">
          <Globe className="w-6 h-6 text-orange-500 mb-1" />
          <span className="text-gray-400 block font-semibold">Top Traffic Origin</span>
          <span className="text-xl font-black text-white">Algeria (68%)</span>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-gray-800 space-y-1 shadow-xl">
          <Activity className="w-6 h-6 text-green-400 mb-1" />
          <span className="text-gray-400 block font-semibold">Active Live Users</span>
          <span className="text-xl font-black text-white">342 Online</span>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-gray-800 space-y-1 shadow-xl">
          <Eye className="w-6 h-6 text-blue-400 mb-1" />
          <span className="text-gray-400 block font-semibold">Avg. Session Duration</span>
          <span className="text-xl font-black text-white">4m 18s</span>
        </div>
      </div>

      {/* Country Session Table */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="font-bold text-base text-white">Live Geolocation Traffic Breakdown</h3>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-xl border border-gray-700 focus:outline-none"
          >
            <option value="all">All Countries</option>
            <option value="algeria">Algeria</option>
            <option value="france">France</option>
            <option value="uae">UAE</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredCountries.map((c, i) => (
            <div key={i} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <h4 className="font-bold text-sm text-white">{c.country}</h4>
                  <span className="text-gray-400">Most Visited: {c.topPage}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <span className="text-gray-400 block">Active Users</span>
                  <span className="font-black text-green-400">{c.activeUsers} ({c.percentage})</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Avg Duration</span>
                  <span className="font-bold text-white">{c.avgDuration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserHeatmaps;
