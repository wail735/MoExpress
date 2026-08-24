// ============================================================================
// PAGE : EcoImpact.jsx
// ROLE : Product Carbon Footprint & Sustainability Scorecard inspired by Patagonia (/eco-impact)
// ============================================================================

import React, { useState } from "react";
import { Leaf, Award, ShieldCheck, Check, TreePine, Recycle } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const EcoImpact = () => {
  const { addToast } = useNotification();
  const [pledged, setPledged] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("electronics");

  const impactData = {
    electronics: { score: "A", recycledPercent: 88, carbonSavedKg: 12.4, cert: "EnergyStar & RoHS Certified" },
    apparel: { score: "A+", recycledPercent: 95, carbonSavedKg: 18.2, cert: "GOTS Organic Cotton" },
    home: { score: "A", recycledPercent: 82, carbonSavedKg: 9.6, cert: "FSC Certified Wood" },
  };

  const currentImpact = impactData[selectedCategory] || impactData.electronics;

  const handlePledge = () => {
    setPledged(true);
    addToast("Thank you for pledging! Carbon-Neutral Shipping activated on your cart.", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-green-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Leaf className="w-4 h-4" /> Sustainability Rating
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Eco Impact & Carbon Scorecard</h1>
        <p className="text-xs text-gray-500">Track recycled material usage, carbon-neutral shipping, and ethical factory certifications</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Category Selector */}
        <div className="flex justify-center gap-2">
          {["electronics", "apparel", "home"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Impact Display */}
        <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-semibold">Category Sustainability Rating</span>
            <span className="text-2xl font-black text-green-400">{currentImpact.score} - {currentImpact.cert}</span>
          </div>
          <Leaf className="w-10 h-10 text-green-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
            <span className="text-gray-400 flex items-center gap-1"><Recycle className="w-4 h-4 text-green-500" /> Recycled Materials</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{currentImpact.recycledPercent}% PCR Plastic</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
            <span className="text-gray-400 flex items-center gap-1"><TreePine className="w-4 h-4 text-emerald-400" /> Carbon Offset</span>
            <span className="text-xl font-black text-emerald-400">{currentImpact.carbonSavedKg} kg CO₂ saved per unit</span>
          </div>
        </div>

        <button
          onClick={handlePledge}
          className={`w-full py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 ${
            pledged ? "bg-green-600 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          }`}
        >
          {pledged ? <><Check className="w-4 h-4" /> Eco-Pledge Active on Your Account</> : "Pledge 100% Carbon-Neutral Shipping ($0.00)"}
        </button>
      </div>
    </div>
  );
};

export default EcoImpact;
