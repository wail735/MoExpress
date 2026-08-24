// ============================================================================
// PAGE : SellerPayouts.jsx
// ROLE : Seller Payout & Balance Withdrawal Portal (/seller/payouts)
// ============================================================================

import React, { useState } from "react";
import { DollarSign, Building, CreditCard, Send, CheckCircle } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const SellerPayouts = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [amount, setAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("algerian_rib");

  const [payoutHistory, setPayoutHistory] = useState([
    { id: "po_1", amount: 1500.0, method: "algerian_rib", status: "completed", date: "15 Aug 2026" },
  ]);

  const handleRequestPayout = (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (num <= 0) return;
    addToast(`Payout withdrawal request of ${formatPrice(num)} submitted!`, "success");
    setPayoutHistory((prev) => [
      { id: "po_" + Date.now(), amount: num, method: payoutMethod, status: "pending", date: "Today" },
      ...prev,
    ]);
    setAmount("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <DollarSign className="w-8 h-8 text-orange-500" /> Seller Payouts & Balance Withdrawals
        </h1>
        <p className="text-xs text-gray-500">Request payout of your store balance directly to your bank account or CCP RIP</p>
      </div>

      <div className="bg-gradient-to-r from-brand-navy to-gray-900 p-6 rounded-3xl border border-gray-800 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block">Available Seller Balance</span>
          <h2 className="text-3xl font-black text-orange-500">{formatPrice(12450.75)}</h2>
        </div>
      </div>

      <form onSubmit={handleRequestPayout} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
          Request New Payout Withdrawal
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Withdrawal Amount (€)</label>
            <input
              type="number"
              step="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500.00"
              required
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none font-bold text-orange-500 text-base"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Payout Destination Method</label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            >
              <option value="algerian_rib">Algerian Bank RIB (BNA / BDL)</option>
              <option value="poste_algerienne_rip">Algérie Poste CCP RIP</option>
              <option value="visa_international">Visa / Paysera / Wise IBAN</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Submit Payout Request
        </button>
      </form>
    </div>
  );
};

export default SellerPayouts;
