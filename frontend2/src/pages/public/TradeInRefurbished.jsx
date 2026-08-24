// ============================================================================
// PAGE : TradeInRefurbished.jsx
// ROLE : Certified Refurbished Directory & Device Trade-In Estimator (/trade-in)
// ============================================================================

import React, { useState } from "react";
import { RefreshCw, ShieldCheck, DollarSign, ArrowRight } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const TradeInRefurbished = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [deviceModel, setDeviceModel] = useState("iPhone 13 128GB");
  const [condition, setCondition] = useState("good");

  const estimateTradeIn = () => {
    let value = 280.0;
    if (condition === "flawless") value = 350.0;
    if (condition === "fair") value = 190.0;
    return value;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-green-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <RefreshCw className="w-4 h-4" /> Certified Refurbished & Trade-In
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Trade-In & Refurbished Hub</h1>
        <p className="text-xs text-gray-500">Trade in your old tech for store credit or shop 100% tested certified refurbished electronics</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-orange-500" /> Trade-In Value Estimator
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Select Old Device</label>
            <select
              value={deviceModel}
              onChange={(e) => setDeviceModel(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            >
              <option value="iPhone 13 128GB">iPhone 13 128GB</option>
              <option value="Samsung Galaxy S22">Samsung Galaxy S22</option>
              <option value="Sony WH-1000XM4">Sony WH-1000XM4 Headphones</option>
            </select>
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Device Cosmetic Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            >
              <option value="flawless">Flawless (Like New, no scratches)</option>
              <option value="good">Good (Normal wear, minor scuffs)</option>
              <option value="fair">Fair (Visible scratches, fully functional)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block">Estimated Trade-In Store Credit</span>
            <span className="text-2xl font-black text-green-500">{formatPrice(estimateTradeIn())}</span>
          </div>

          <button
            onClick={() => addToast(`Trade-In request initiated for ${formatPrice(estimateTradeIn())}! Shipping label sent to email.`, "success")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-1"
          >
            Start Trade-In <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeInRefurbished;
