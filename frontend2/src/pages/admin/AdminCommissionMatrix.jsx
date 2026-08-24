// ============================================================================
// PAGE : AdminCommissionMatrix.jsx
// ROLE : Category Seller Commission Rates & Fee Matrix (/admin/commissions)
// ============================================================================

import React, { useState } from "react";
import { Percent, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminCommissionMatrix = () => {
  const { addToast } = useNotification();
  const [commissions, setCommissions] = useState([
    { category: "Electronics", rate: 5 },
    { category: "Fashion & Apparel", rate: 10 },
    { category: "Home & Kitchen", rate: 8 },
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Seller category commission rates saved!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Seller Commission Rates & Fee Matrix</h1>
        <p className="text-xs text-gray-400">Configure marketplace transaction commission percentages by product category</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div className="space-y-3">
          {commissions.map((c, idx) => (
            <div key={idx} className="p-3 bg-gray-800/60 rounded-xl border border-gray-700 flex items-center justify-between">
              <span className="font-bold text-white">{c.category}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={c.rate}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCommissions((prev) => prev.map((item, i) => (i === idx ? { ...item, rate: val } : item)));
                  }}
                  className="w-20 bg-gray-900 text-white p-2 rounded-lg border text-center font-bold text-orange-500"
                />
                <span className="text-gray-400 font-bold">% Fee</span>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Commission Rates
        </button>
      </form>
    </div>
  );
};

export default AdminCommissionMatrix;
