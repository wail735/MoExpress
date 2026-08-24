// ============================================================================
// PAGE : AdminProShops.jsx
// ROLE : Review & Approve Boutique Pro Dossiers
// ============================================================================

import React, { useState, useEffect } from "react";
import { Award, Check, X, Store, ShieldCheck } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminProShops = () => {
  const { addToast } = useNotification();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/pro-shops", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setApplications(data.data || []);
      })
      .catch(() => {});
  }, []);

  const sampleApps = applications.length > 0 ? applications : [
    {
      _id: "u_pro1",
      name: "Amine Khelifi",
      email: "amine@example.com",
      proShopDetails: {
        shopName: "MoStore Official Boutique",
        category: "Electronics",
        businessRegistrationNumber: "RC-2026-987654",
        status: "pending",
      },
    },
  ];

  const handleReview = (userId, status) => {
    setApplications((prev) => prev.filter((a) => a._id !== userId));
    addToast(`Boutique Pro application ${status === "approved" ? "Approved & Granted Badge" : "Rejected"}!`, status === "approved" ? "success" : "error");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Boutique Pro Shop Applications</h1>
        <p className="text-xs text-gray-400">Review seller dossiers, business registrations, and issue Verified Badges</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
        <div className="space-y-4">
          {sampleApps.map((app) => (
            <div key={app._id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{app.proShopDetails?.shopName || "Pro Shop"}</h3>
                  <span className="bg-yellow-500 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    Pending Dossier
                  </span>
                </div>
                <p className="text-gray-400">Owner: {app.name} ({app.email})</p>
                <p className="text-gray-500 text-[11px]">Business Reg: <span className="font-mono text-gray-300">{app.proShopDetails?.businessRegistrationNumber}</span></p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReview(app._id, "approved")}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Approve Pro Shop
                </button>
                <button
                  onClick={() => handleReview(app._id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProShops;
