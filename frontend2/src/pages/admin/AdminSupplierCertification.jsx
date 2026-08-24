// ============================================================================
// PAGE : AdminSupplierCertification.jsx
// ROLE : Certified Supplier Dossier Review & Badge Granting (/admin/suppliers)
// ============================================================================

import React, { useState } from "react";
import { ShieldCheck, Award, Check, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminSupplierCertification = () => {
  const { addToast } = useNotification();
  const [suppliers, setSuppliers] = useState([
    { id: "sup_1", name: "Global Tech Wholesale Enterprise", email: "enterprise@moexpress.com", rcNumber: "RC-2026-777888", status: "pending" },
  ]);

  const handleGrantBadge = (id, status) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    addToast(`Certified Supplier badge ${status === "approved" ? "Granted" : "Rejected"}!`, status === "approved" ? "success" : "error");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Certified Supplier Accreditation</h1>
        <p className="text-xs text-gray-400">Review supplier OEM documentation and grant Certified Supplier badges</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-4">
          {suppliers.map((s) => (
            <div key={s.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm text-white">{s.name}</h3>
                <p className="text-gray-400">Email: {s.email} | RC: <span className="font-mono text-gray-300">{s.rcNumber}</span></p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGrantBadge(s.id, "approved")}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Grant Certified Supplier Badge
                </button>
                <button
                  onClick={() => handleGrantBadge(s.id, "rejected")}
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

export default AdminSupplierCertification;
