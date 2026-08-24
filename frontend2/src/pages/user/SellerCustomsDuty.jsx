// ============================================================================
// PAGE : SellerCustomsDuty.jsx
// ROLE : Export Customs Tariff & Cross-Border Duty Estimator (/seller/customs)
// ============================================================================

import React, { useState } from "react";
import { Globe, DollarSign, Calculator } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const SellerCustomsDuty = () => {
  const { formatPrice } = useCurrency();
  const [destination, setDestination] = useState("EU");
  const [declaredValue, setDeclaredValue] = useState(150);

  const calculateDuty = () => {
    let rate = 0.05;
    if (destination === "EU") rate = 0.20; // 20% VAT
    if (destination === "GCC") rate = 0.05;
    return declaredValue * rate;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-8 h-8 text-orange-500" /> Cross-Border Customs Tariff & Duty Calculator
        </h1>
        <p className="text-xs text-gray-500">Estimate international export customs duties and regional import taxes</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Declared Package Value (€)</label>
            <input
              type="number"
              value={declaredValue}
              onChange={(e) => setDeclaredValue(Number(e.target.value))}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none font-bold text-orange-500 text-base"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Destination Region</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none"
            >
              <option value="EU">European Union (EU - 20% VAT)</option>
              <option value="GCC">Gulf Cooperation Council (GCC - 5% Duty)</option>
              <option value="US">United States (US Customs)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block">Estimated Import Duty & VAT Tax</span>
            <span className="text-2xl font-black text-orange-500">{formatPrice(calculateDuty())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCustomsDuty;
