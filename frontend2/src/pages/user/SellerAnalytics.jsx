// ============================================================================
// PAGE : SellerAnalytics.jsx
// ROLE : Deep Sales Analytics & Revenue Graphs (/seller/analytics)
// ============================================================================

import React, { useState } from "react";
import { TrendingUp, DollarSign, ShoppingBag, Eye, Users, Download, Calendar } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const SellerAnalytics = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [timeframe, setTimeframe] = useState("30d");

  const analyticsData = {
    "7d": { visitors: "12,400", orders: "390", revenue: 3450.5, conversion: "3.14%" },
    "30d": { visitors: "48,920", orders: "1,450", revenue: 12450.75, conversion: "2.96%" },
    "90d": { visitors: "142,000", orders: "4,120", revenue: 38900.0, conversion: "2.90%" },
  };

  const current = analyticsData[timeframe] || analyticsData["30d"];

  const handleExport = () => {
    addToast("Exporting Store Analytics report to CSV...", "info");
    setTimeout(() => {
      addToast("Analytics Report downloaded!", "success");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-orange-500" /> Store Analytics & Conversion Performance
          </h1>
          <p className="text-xs text-gray-500">Track store visits, sales conversion rate, and revenue statistics</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
            {["7d", "30d", "90d"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                  timeframe === t ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <Eye className="w-6 h-6 text-orange-500 mb-2" />
          <span className="text-xs text-gray-500 block">Store Visitors</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{current.visitors}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <ShoppingBag className="w-6 h-6 text-amber-500 mb-2" />
          <span className="text-xs text-gray-500 block">Total Orders</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{current.orders}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <DollarSign className="w-6 h-6 text-green-500 mb-2" />
          <span className="text-xs text-gray-500 block">Gross Revenue</span>
          <span className="text-2xl font-black text-green-500">{formatPrice(current.revenue)}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <Users className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-xs text-gray-500 block">Conversion Rate</span>
          <span className="text-2xl font-black text-blue-500">{current.conversion}</span>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
