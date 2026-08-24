// ============================================================================
// PAGE : BulkRFQRequest.jsx
// ROLE : Global Trade Wholesale Request for Quotation (RFQ) Portal (/bulk-request)
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Send, ShieldCheck, Award, Globe, Building } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

export const BulkRFQRequest = () => {
  const { addToast } = useNotification();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [productCategory, setProductCategory] = useState("Electronics");
  const [quantity, setQuantity] = useState(500);
  const [targetUnitPrice, setTargetUnitPrice] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmitRFQ = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast("Please log in to submit RFQ wholesale quotes!", "warning");
      navigate("/login");
      return;
    }
    addToast("RFQ Wholesale Quote request submitted to Certified Suppliers!", "success");
    setDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <span className="bg-blue-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <ShieldCheck className="w-4 h-4" /> Global Trade B2B Sourcing
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Submit RFQ Wholesale Order Quote
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">
          Get custom volume discounts, OEM manufacturing quotes, and direct pricing from verified Certified Suppliers worldwide.
        </p>
      </div>

      <form onSubmit={handleSubmitRFQ} className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-500" /> Product Sourcing Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Company / Business Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Global Tech Import SARL"
              required
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Product Industry Category</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            >
              <option value="Electronics">Electronics & Hardware</option>
              <option value="Fashion">Apparel & Textiles</option>
              <option value="Home">Home & Kitchen Goods</option>
              <option value="Industrial">Industrial Equipment</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Requested Quantity (Units)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="50"
              required
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none font-bold text-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Target Price per Unit (€)</label>
            <input
              type="number"
              step="0.01"
              value={targetUnitPrice}
              onChange={(e) => setTargetUnitPrice(e.target.value)}
              placeholder="e.g. 15.50"
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-500 font-semibold block mb-1">Detailed Sourcing Requirements & Specifications</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe product specifications, custom packaging, logo printing, or delivery timeline..."
            required
            rows="4"
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-sm"
        >
          <Send className="w-4 h-4" /> Submit RFQ Request to Certified Suppliers
        </button>
      </form>
    </div>
  );
};

export default BulkRFQRequest;
