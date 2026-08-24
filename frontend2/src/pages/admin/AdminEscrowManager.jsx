// ============================================================================
// PAGE : AdminEscrowManager.jsx
// ROLE : 14-Day Escrow Holding Balances & Payout Release Manager (/admin/escrow)
// ============================================================================

import React, { useState } from "react";
import { ShieldCheck, DollarSign, CheckCircle } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminEscrowManager = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [escrows, setEscrows] = useState([
    { id: "esc_1", order: "ORD-98765", amount: 299.99, seller: "pro@moexpress.com", daysRemaining: 3 },
  ]);

  const handleRelease = (id) => {
    setEscrows((prev) => prev.filter((e) => e.id !== id));
    addToast(`Escrow funds released to seller balance!`, "success");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Escrow Protection Balances</h1>
        <p className="text-xs text-gray-400">Monitor buyer protection escrow holdings and release funds after 14-day delivery verification</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {escrows.map((e) => (
            <div key={e.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-orange-500">{e.order}</span>
                <h4 className="font-bold text-sm text-white">Escrow Holding: {formatPrice(e.amount)}</h4>
                <p className="text-gray-400">Seller: {e.seller} | Protection Window: {e.daysRemaining} days remaining</p>
              </div>
              <button onClick={() => handleRelease(e.id)} className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl">
                Release Funds Early
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEscrowManager;
