// ============================================================================
// PAGE : AdminFooterCMS.jsx
// ROLE : SuperAdmin Control for Footer Content, Copyright, Social Links & Payment Badges
// ============================================================================

import React, { useState } from "react";
import { Layout, Save } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminFooterCMS = () => {
  const { cms, updateCMSSection } = useCMS();
  const { addToast } = useNotification();

  const [copyright, setCopyright] = useState(cms.footer?.copyright || "");
  const [aboutText, setAboutText] = useState(cms.footer?.aboutText || "");
  const [contactPhone, setContactPhone] = useState(cms.footer?.contactPhone || "");
  const [contactEmail, setContactEmail] = useState(cms.footer?.contactEmail || "");

  const handleSave = (e) => {
    e.preventDefault();
    updateCMSSection("footer", { copyright, aboutText, contactPhone, contactEmail });
    addToast("Footer CMS configuration saved successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Footer CMS Editor</h1>
        <p className="text-xs text-gray-400">Edit footer copyright, about company description, and support contacts</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Layout className="w-5 h-5 text-orange-500" /> Footer Details & Copyright
        </h3>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Copyright Notice Text</label>
          <input
            type="text"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">About Company Summary</label>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Support Phone</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Support Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Footer Settings
        </button>
      </form>
    </div>
  );
};

export default AdminFooterCMS;
