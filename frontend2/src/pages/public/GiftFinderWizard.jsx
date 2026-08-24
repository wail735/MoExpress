// ============================================================================
// PAGE : GiftFinderWizard.jsx
// ROLE : Interactive Gift Recommendation Questionnaire Wizard (/gift-finder)
// ============================================================================

import React, { useState } from "react";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const GiftFinderWizard = () => {
  const { formatPrice } = useCurrency();
  const [recipient, setRecipient] = useState("friend");
  const [budget, setBudget] = useState("50");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-pink-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Gift className="w-4 h-4" /> AI Gift Assistant
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Gift Recommendation Wizard</h1>
        <p className="text-xs text-gray-500">Answer 2 questions to get personalized present suggestions for any occasion</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Who is the gift for?</label>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none">
              <option value="friend">Best Friend</option>
              <option value="partner">Partner / Spouse</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Budget Limit (€)</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none">
              <option value="25">Under {formatPrice(25)}</option>
              <option value="50">Under {formatPrice(50)}</option>
              <option value="100">Under {formatPrice(100)}</option>
              <option value="250">{formatPrice(250)}+ Premium</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-2xl">
          <h4 className="font-bold text-pink-500 flex items-center gap-1"><Sparkles className="w-4 h-4" /> Top Gift Match: Sony Headphones & Gift Card Bundle</h4>
        </div>
      </div>
    </div>
  );
};

export default GiftFinderWizard;
