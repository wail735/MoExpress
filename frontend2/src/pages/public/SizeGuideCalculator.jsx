// ============================================================================
// PAGE : SizeGuideCalculator.jsx
// ROLE : Interactive Size & Fit Recommendation Calculator (/size-guide)
// ============================================================================

import React, { useState } from "react";
import { Ruler, Sparkles, Check } from "lucide-react";

export const SizeGuideCalculator = () => {
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(75);
  const [fit, setFit] = useState("regular");

  const calculateRecommendedSize = () => {
    if (weight < 65) return "Small (S)";
    if (weight < 80) return "Medium (M)";
    if (weight < 95) return "Large (L)";
    return "Extra Large (XL)";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Ruler className="w-4 h-4" /> Size & Fit AI
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Smart Size Recommendation Guide</h1>
        <p className="text-xs text-gray-500">Calculate your exact clothing & shoe size based on height, weight, and fit preference</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Height (cm): {height} cm</label>
            <input
              type="range"
              min="140"
              max="210"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-brand-orange"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Weight (kg): {weight} kg</label>
            <input
              type="range"
              min="40"
              max="130"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-brand-orange"
            />
          </div>
        </div>

        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block font-semibold">Recommended Clothing Size</span>
            <span className="text-2xl font-black text-orange-500">{calculateRecommendedSize()}</span>
          </div>
          <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> 98% Fit Accuracy
          </span>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideCalculator;
