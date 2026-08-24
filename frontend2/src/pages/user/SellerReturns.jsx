// ============================================================================
// PAGE : SellerReturns.jsx
// ROLE : Customer Return Claims Desk & RMA Processing (/seller/returns)
// ============================================================================

import React, { useState } from "react";
import { RefreshCcw, Check, X, ShieldAlert } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerReturns = () => {
  const { addToast } = useNotification();
  const [returns, setReturns] = useState([
    { id: "rma_101", buyer: "sarah@example.com", reason: "Defective Audio Jack", status: "pending", date: "20 Aug 2026" },
  ]);

  const handleProcess = (id, status) => {
    setReturns((prev) => prev.filter((r) => r.id !== id));
    addToast(`Return claim #${id} ${status === "approved" ? "Approved & Replacement Sent" : "Rejected"}!`, status === "approved" ? "success" : "error");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <RefreshCcw className="w-8 h-8 text-orange-500" /> Customer Returns & RMA Claims
        </h1>
        <p className="text-xs text-gray-500">Review buyer return claims, issue return shipping labels, or approve replacements</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Pending Return Requests</h3>
        <div className="space-y-3">
          {returns.map((r) => (
            <div key={r.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono font-bold text-orange-500">{r.id}</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Reason: {r.reason}</h4>
                <span className="text-gray-400">Buyer: {r.buyer} | Date: {r.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleProcess(r.id, "approved")} className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl">Approve Return</button>
                <button onClick={() => handleProcess(r.id, "rejected")} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerReturns;
