// ============================================================================
// PAGE : SellerShippingSettings.jsx
// ROLE : Freight & Shipping Rules Manager (/seller/shipping)
// ============================================================================

import React, { useState } from "react";
import { Truck, Save, Check, Globe } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerShippingSettings = () => {
  const { addToast } = useNotification();
  const [flatRate, setFlatRate] = useState(5.0);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50.0);
  const [expressCarrier, setExpressCarrier] = useState("DHL Express");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Shipping & logistics rules saved successfully!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Truck className="w-8 h-8 text-orange-500" /> Shipping & Logistics Rules
        </h1>
        <p className="text-xs text-gray-500">Configure flat rates, express carriers, and free shipping thresholds</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-orange-500" /> Regional Delivery Rates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Flat Rate Shipping Fee (€)</label>
            <input
              type="number"
              step="0.50"
              value={flatRate}
              onChange={(e) => setFlatRate(Number(e.target.value))}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Free Shipping Threshold Order Amount (€)</label>
            <input
              type="number"
              step="5.00"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-500 font-semibold block mb-1">Preferred Express Carrier</label>
          <select
            value={expressCarrier}
            onChange={(e) => setExpressCarrier(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
          >
            <option value="DHL Express">DHL Express Air Cargo</option>
            <option value="FedEx">FedEx International Priority</option>
            <option value="Yalidine">Yalidine Express Algeria</option>
            <option value="EMS Poste">EMS Algérie Poste</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold px-8 py-3.5 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Shipping Rates
        </button>
      </form>
    </div>
  );
};

export default SellerShippingSettings;
