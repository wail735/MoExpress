// ============================================================================
// PAGE : AdminFinancialReports.jsx
// ROLE : GMV, Platform Net Profit & Financial Export Reports (/admin/reports)
// ============================================================================

import React from "react";
import { TrendingUp, DollarSign, Download, FileText } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminFinancialReports = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const handleExportCSV = () => {
    addToast("Financial statement exported as CSV!", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Financial Reports & GMV Forecasts</h1>
          <p className="text-xs text-gray-400">Gross Merchandise Value (GMV), net commission earnings, and exportable statements</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-5 py-2.5 rounded-full transition flex items-center gap-2 shadow-lg"
        >
          <Download className="w-4 h-4" /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-gray-800 space-y-1 shadow-xl">
          <span className="text-gray-400 block">Gross Merchandise Value (GMV)</span>
          <span className="text-2xl font-black text-white">{formatPrice(189400.0)}</span>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-gray-800 space-y-1 shadow-xl">
          <span className="text-gray-400 block">Net Commission Profits</span>
          <span className="text-2xl font-black text-green-400">{formatPrice(18940.0)}</span>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-gray-800 space-y-1 shadow-xl">
          <span className="text-gray-400 block">VIP Subscriptions Revenue</span>
          <span className="text-2xl font-black text-amber-500">{formatPrice(4890.0)}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancialReports;
