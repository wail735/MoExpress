// ============================================================================
// PAGE : AdminCMS.jsx
// ROLE : Website Content Management (Banners, Slogans & Announcements)
// ============================================================================

import React, { useState } from "react";
import { Globe, Image, Save, Sparkles } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminCMS = () => {
  const { addToast } = useNotification();
  const [heroTitle, setHeroTitle] = useState("Shop More, Live Better!");
  const [heroSubtitle, setHeroSubtitle] = useState("Discover millions of products with wholesale prices, verified Pro Shops, and certified suppliers.");
  const [announcement, setAnnouncement] = useState("Free Shipping on orders over $10 | 100% Buyer Protection Escrow Guarantee");

  const handleSaveCMS = (e) => {
    e.preventDefault();
    addToast("Website Content & CMS updated successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">CMS & Website Content Management</h1>
        <p className="text-xs text-gray-400">Update homepage slogans, top announcement banner, and promotional text</p>
      </div>

      <form onSubmit={handleSaveCMS} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-orange-500" /> Homepage Hero Content
        </h3>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Top Announcement Bar Text</label>
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Hero Section Headline Slogan</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-amber-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Hero Section Subtitle Description</label>
          <textarea
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save CMS Changes
        </button>
      </form>
    </div>
  );
};

export default AdminCMS;
