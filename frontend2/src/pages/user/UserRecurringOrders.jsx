// ============================================================================
// PAGE : UserRecurringOrders.jsx
// ROLE : Amazon-Style Subscribe & Save Recurring Orders Manager (/user/recurring-orders)
// ============================================================================

import React, { useState } from "react";
import { RefreshCw, Calendar, Check, Trash2 } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const UserRecurringOrders = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [subscriptions, setSubscriptions] = useState([
    { id: "sub_1", product: "Organic Gourmet Coffee Beans 1kg", interval: "Every 30 Days", nextDelivery: "15 Sep 2026", price: 22.50 },
  ]);

  const handleCancelSub = (id) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    addToast("Recurring Subscribe & Save delivery cancelled.", "info");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <RefreshCw className="w-8 h-8 text-orange-500" /> Subscribe & Save Recurring Deliveries
        </h1>
        <p className="text-xs text-gray-500">Manage automated monthly recurring deliveries with 15% discount</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Active Subscribe & Save Subscriptions</h3>
        <div className="space-y-3">
          {subscriptions.map((s) => (
            <div key={s.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.product}</h4>
                <p className="text-gray-400">Frequency: {s.interval} | Next Delivery: <span className="font-mono text-amber-500">{s.nextDelivery}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-black text-orange-500 text-sm">{formatPrice(s.price)}</span>
                <button onClick={() => handleCancelSub(s.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRecurringOrders;
