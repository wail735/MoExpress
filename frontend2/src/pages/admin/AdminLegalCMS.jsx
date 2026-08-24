// ============================================================================
// PAGE : AdminLegalCMS.jsx
// ROLE : SuperAdmin Control for Legal Pages Content (Terms, Privacy, Refunds, IP)
// ============================================================================

import React, { useState } from "react";
import { FileText, Save } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminLegalCMS = () => {
  const { cms, updateCMSSection } = useCMS();
  const { addToast } = useNotification();

  const [terms, setTerms] = useState(cms.legal?.terms || "");
  const [privacy, setPrivacy] = useState(cms.legal?.privacy || "");
  const [cookies, setCookies] = useState(cms.legal?.cookies || "");
  const [refunds, setRefunds] = useState(cms.legal?.refunds || "");
  const [intellectual, setIntellectual] = useState(cms.legal?.intellectual || "");

  const handleSave = (e) => {
    e.preventDefault();
    updateCMSSection("legal", { terms, privacy, cookies, refunds, intellectual });
    addToast("Legal Policies CMS configuration saved successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Legal Pages Content Editor</h1>
        <p className="text-xs text-gray-400">Edit Terms of Service, Privacy Policy, Cookie Policy, Refunds & Intellectual Property text</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" /> Legal Documents Content
        </h3>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Terms of Service</label>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Privacy Policy</label>
          <textarea
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Cookie Policy</label>
          <textarea
            value={cookies}
            onChange={(e) => setCookies(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Refund & Returns Policy</label>
          <textarea
            value={refunds}
            onChange={(e) => setRefunds(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Intellectual Property & Trademarks</label>
          <textarea
            value={intellectual}
            onChange={(e) => setIntellectual(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Legal Policies
        </button>
      </form>
    </div>
  );
};

export default AdminLegalCMS;
