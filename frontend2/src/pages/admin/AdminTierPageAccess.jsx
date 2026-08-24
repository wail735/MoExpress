// ============================================================================
// PAGE : AdminTierPageAccess.jsx
// ROLE : SuperAdmin Subscription Tier Page & Feature Access Matrix (/admin/tier-access)
// ============================================================================

import React, { useState } from "react";
import { Lock, Unlock, ShieldCheck, Save, Sliders, Check, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminTierPageAccess = () => {
  const { addToast } = useNotification();

  const [features, setFeatures] = useState([
    {
      id: "feat_1",
      name: "Meta Ads Manager",
      route: "/ads-manager",
      free: false,
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      id: "feat_2",
      name: "Vendor Storefront Manager (Custom Branding & Colors)",
      route: "/seller/storefront",
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      id: "feat_3",
      name: "Bulk RFQ Wholesale Purchasing",
      route: "/bulk-request",
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      id: "feat_4",
      name: "CSV Bulk Product Importer/Exporter",
      route: "/seller/bulk-import",
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      id: "feat_5",
      name: "24/7 Automated Boutique FAQ Chatbot",
      route: "/seller/bot",
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      id: "feat_6",
      name: "Local Express Courier API Integration (Yalidine/EMS)",
      route: "/seller/couriers",
      free: false,
      basic: false,
      pro: false,
      enterprise: true,
    },
    {
      id: "feat_7",
      name: "Multi-User Staff & Sub-Accounts",
      route: "/seller/staff",
      free: false,
      basic: false,
      pro: false,
      enterprise: true,
    },
  ]);

  const handleToggle = (featureId, planKey) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, [planKey]: !f[planKey] } : f))
    );
  };

  const handleSaveMatrix = (e) => {
    e.preventDefault();
    addToast("Subscription Tier Page Access Matrix updated successfully!", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Lock className="w-8 h-8 text-orange-500" /> Subscription Tier Page Access Matrix
          </h1>
          <p className="text-xs text-gray-400">Assign specific pages, tools, and features to different subscription plans</p>
        </div>

        <button
          onClick={handleSaveMatrix}
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-6 py-3 rounded-full transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Access Matrix
        </button>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Feature / Page Name</th>
                <th className="py-3 px-4">Route Path</th>
                <th className="py-3 px-4 text-center">Free Buyer</th>
                <th className="py-3 px-4 text-center">Basic Seller</th>
                <th className="py-3 px-4 text-center">Pro Boutique</th>
                <th className="py-3 px-4 text-center">Enterprise Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-white">
              {features.map((f) => (
                <tr key={f.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-gray-200">{f.name}</td>
                  <td className="py-3.5 px-4 font-mono text-orange-500 text-[11px]">{f.route}</td>

                  {["free", "basic", "pro", "enterprise"].map((planKey) => (
                    <td key={planKey} className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(f.id, planKey)}
                        className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                          f[planKey]
                            ? "bg-green-600/20 text-green-400 border border-green-500/40"
                            : "bg-red-600/10 text-red-500 border border-red-500/30"
                        }`}
                      >
                        {f[planKey] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTierPageAccess;
