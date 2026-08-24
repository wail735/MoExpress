// ============================================================================
// PAGE : AdminAIModeration.jsx
// ROLE : AI-Powered Prohibited Items & Counterfeit Keyword Filter (/admin/ai-moderation)
// ============================================================================

import React, { useState } from "react";
import { Sparkles, ShieldAlert, Plus, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminAIModeration = () => {
  const { addToast } = useNotification();
  const [keyword, setKeyword] = useState("");
  const [bannedKeywords, setBannedKeywords] = useState(["replica", "fake", "counterfeit", "hacked"]);

  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setBannedKeywords((prev) => [...prev, keyword.toLowerCase()]);
    addToast(`AI Filter Keyword [${keyword}] added to blacklist!`, "success");
    setKeyword("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">AI Content & Prohibited Keyword Filter</h1>
        <p className="text-xs text-gray-400">Automatic AI text scanner to block counterfeit items, weapons, and scam listings</p>
      </div>

      <form onSubmit={handleAddKeyword} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-500" /> Add Banned Keyword Filter
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="prohibited term (e.g. counterfeit)..."
            required
            className="flex-1 bg-gray-800 text-white p-3 rounded-xl border focus:outline-none"
          />
          <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Keyword
          </button>
        </div>
      </form>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-3 text-xs">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">Active Banned Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {bannedKeywords.map((k, idx) => (
            <span key={idx} className="bg-red-600/20 border border-red-500/40 text-red-400 font-mono font-bold px-3 py-1.5 rounded-xl flex items-center gap-2">
              {k}
              <button onClick={() => setBannedKeywords((prev) => prev.filter((item) => item !== k))}>
                <Trash2 className="w-3.5 h-3.5 hover:text-white" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAIModeration;
