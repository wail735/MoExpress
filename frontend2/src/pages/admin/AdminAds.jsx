// ============================================================================
// PAGE : AdminAds.jsx
// ROLE : Review Paid Ads & Create Manual SuperAdmin Photo/Video Ads
// ============================================================================

import React, { useState } from "react";
import { Megaphone, Plus, Check, X, Eye } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminAds = () => {
  const { addToast } = useNotification();
  const [adTitle, setAdTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [placement, setPlacement] = useState("homepage_banner");

  const handleCreateManualAd = (e) => {
    e.preventDefault();
    addToast("SuperAdmin manual ad campaign created & published!", "success");
    setAdTitle("");
    setTargetUrl("");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Ads Moderation & Manual Ad Creation</h1>
        <p className="text-xs text-gray-400">Moderate paid seller ad campaigns and create official SuperAdmin photo/video homepage ads</p>
      </div>

      <form onSubmit={handleCreateManualAd} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> Create Official Platform Ad
        </h3>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Ad Title / Headline</label>
          <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            placeholder="Official MoExpress Super Sale..."
            required
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Target URL</label>
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://moexpress.com/products?category=Electronics"
            required
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          Publish Ad
        </button>
      </form>
    </div>
  );
};

export default AdminAds;
