// ============================================================================
// PAGE : AdminProductInspection.jsx
// ROLE : Product Listing Quality Score & Photo Resolution Inspector (/admin/product-inspection)
// ============================================================================

import React, { useState } from "react";
import { Award, Check, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminProductInspection = () => {
  const { addToast } = useNotification();
  const [inspections] = useState([
    { id: "pi_1", title: "Sony WH-1000XM5 Listing", seller: "pro@moexpress.com", qualityScore: 98, status: "passed" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Product Quality Score Inspector</h1>
        <p className="text-xs text-gray-400">Enforce photo resolution standards, description completeness, and listing quality scores</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {inspections.map((i) => (
            <div key={i.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{i.title}</h4>
                <p className="text-gray-400">Seller: {i.seller} | Quality Score: <span className="text-green-400 font-bold">{i.qualityScore} / 100</span></p>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">{i.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductInspection;
