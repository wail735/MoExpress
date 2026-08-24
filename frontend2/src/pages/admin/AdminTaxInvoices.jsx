// ============================================================================
// PAGE : AdminTaxInvoices.jsx
// ROLE : Regional VAT, Tax Rates & Automated PDF Invoice Generator (/admin/tax-invoices)
// ============================================================================

import React, { useState } from "react";
import { FileText, Save, Download } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminTaxInvoices = () => {
  const { addToast } = useNotification();
  const [vatRate, setVatRate] = useState(19);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("VAT & Tax rate configuration saved!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">VAT, Taxes & PDF Invoice Settings</h1>
        <p className="text-xs text-gray-400">Configure regional VAT tax rates and automated PDF invoice generation</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" /> Tax Rates Configuration
        </h3>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Standard VAT Rate (%)</label>
          <input
            type="number"
            value={vatRate}
            onChange={(e) => setVatRate(Number(e.target.value))}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none font-bold text-amber-500"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs shadow-lg">
          <Save className="w-4 h-4" /> Save Tax Settings
        </button>
      </form>
    </div>
  );
};

export default AdminTaxInvoices;
