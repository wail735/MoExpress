// ============================================================================
// PAGE : AdminNavbarCMS.jsx
// ROLE : SuperAdmin Control for Navbar Header, Logo Title, Announcement & Slogans
// ============================================================================

import React, { useState } from "react";
import { Globe, Save, Sparkles, Layout } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminNavbarCMS = () => {
  const { cms, updateCMSSection } = useCMS();
  const { addToast } = useNotification();

  const [announcement, setAnnouncement] = useState(cms.navbar?.announcement || "");
  const [brandName, setBrandName] = useState(cms.navbar?.brandName || "MoExpress");
  const [brandSub, setBrandSub] = useState(cms.navbar?.brandSub || "MARKETPLACE");
  const [slogan, setSlogan] = useState(cms.navbar?.slogan || "Shop More, Live Better!");

  const handleSave = (e) => {
    e.preventDefault();
    updateCMSSection("navbar", { announcement, brandName, brandSub, slogan });
    addToast("Navbar Header CMS configuration saved successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Navbar Header CMS Editor</h1>
        <p className="text-xs text-gray-400">Edit top announcement bar, logo titles, and marketplace slogans</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Layout className="w-5 h-5 text-orange-500" /> Header Announcement & Brand Title
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Brand Name Title</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Brand Sub-Title</label>
            <input
              type="text"
              value={brandSub}
              onChange={(e) => setBrandSub(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Official Marketplace Slogan</label>
          <input
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-yellow-300"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Navbar Settings
        </button>
      </form>
    </div>
  );
};

export default AdminNavbarCMS;
