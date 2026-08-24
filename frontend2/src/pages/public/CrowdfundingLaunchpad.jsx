// ============================================================================
// PAGE : CrowdfundingLaunchpad.jsx
// ROLE : Kickstarter/Indiegogo Style Product Crowdfunding & Pre-Orders (/crowdfunding)
// ============================================================================

import React from "react";
import { Zap, Rocket, Users } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const CrowdfundingLaunchpad = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-purple-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Rocket className="w-4 h-4" /> Innovation Launchpad
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Product Crowdfunding & Pre-Orders</h1>
        <p className="text-xs text-gray-500">Back upcoming hardware innovations and pre-order products before mass production</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">NextGen AI Smart Ring Tracker</h3>
          <p className="text-xs text-gray-400">Continuous health monitoring, sleep analysis, and 7-day battery life.</p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-orange-500">{formatPrice(12450.0)} Raised</span>
            <span className="text-gray-400">83% of {formatPrice(15000.0)} Goal</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: "83%" }} />
          </div>
        </div>

        <button
          onClick={() => addToast("Backer reward selected! Pre-order confirmed.", "success")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-xs flex items-center justify-center gap-1"
        >
          <Rocket className="w-4 h-4" /> Back This Project ({formatPrice(79.0)})
        </button>
      </div>
    </div>
  );
};

export default CrowdfundingLaunchpad;
