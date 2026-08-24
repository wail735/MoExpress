// ============================================================================
// COMPONENT : ExchangeBar.jsx
// ROLE : Header Live Currency & Exchange Rate Ticker Bar
// ============================================================================

import React from "react";
import { TrendingUp } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const ExchangeBar = () => {
  const { rates } = useCurrency();

  return (
    <div className="bg-brand-dark border-b border-gray-800 text-[11px] py-1.5 px-4 text-gray-300 flex items-center justify-between overflow-x-auto no-scrollbar font-mono">
      <div className="flex items-center gap-4 whitespace-nowrap">
        <span className="text-orange-500 font-bold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> Live Rates:
        </span>
        <span>🇪🇺 1 EUR = {rates.DZD?.rate} DZD</span>
        <span>🇺🇸 1 EUR = {rates.USD?.rate} USD</span>
        <span>🇬🇧 1 EUR = {rates.GBP?.rate} GBP</span>
        <span>🇸🇦 1 EUR = {rates.SAR?.rate} SAR</span>
        <span>🇹🇷 1 EUR = {rates.TRY?.rate} TRY</span>
      </div>
    </div>
  );
};

export default ExchangeBar;
