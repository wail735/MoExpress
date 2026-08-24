// ============================================================================
// PAGE : GiftRegistry.jsx
// ROLE : Target & Amazon Inspired Wedding & Birthday Gift Registry (/gift-registry)
// ============================================================================

import React, { useState } from "react";
import { Gift, Plus, Share2, Heart } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const GiftRegistry = () => {
  const { addToast } = useNotification();
  const [registryTitle, setRegistryTitle] = useState("");

  const [registries, setRegistries] = useState([
    { id: "reg_1", title: "Amine & Sarah Wedding Registry", date: "15 Oct 2026", itemsCount: 12 },
  ]);

  const handleCreateRegistry = (e) => {
    e.preventDefault();
    if (!registryTitle.trim()) return;
    setRegistries((prev) => [...prev, { id: "reg_" + Date.now(), title: registryTitle, date: "2026", itemsCount: 0 }]);
    addToast(`Gift Registry [${registryTitle}] created & shareable link ready!`, "success");
    setRegistryTitle("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-pink-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Gift className="w-4 h-4" /> Gift Registry
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Wedding & Event Gift Registries</h1>
        <p className="text-xs text-gray-500">Create shareable gift registries for weddings, baby showers, and birthdays</p>
      </div>

      <form onSubmit={handleCreateRegistry} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> Create New Registry
        </h3>

        <div>
          <label className="text-gray-500 font-semibold block mb-1">Registry Title</label>
          <input
            type="text"
            value={registryTitle}
            onChange={(e) => setRegistryTitle(e.target.value)}
            placeholder="e.g. Karim's Birthday Wishlist 2026..."
            required
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Create Registry
        </button>
      </form>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">My Active Gift Registries</h3>
        {registries.map((r) => (
          <div key={r.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{r.title}</h4>
              <p className="text-gray-400">Date: {r.date} | Saved Items: {r.itemsCount}</p>
            </div>
            <button onClick={() => addToast("Registry link copied to clipboard!", "info")} className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> Share Link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftRegistry;
