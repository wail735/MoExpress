// ============================================================================
// PAGE : PriceNegotiation.jsx
// ROLE : Alibaba/eBay Style Bulk Price Haggling & Custom Buyer Offers (/price-negotiation)
// ============================================================================

import React, { useState } from "react";
import { DollarSign, Send, MessageSquare } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const PriceNegotiation = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [offerPrice, setOfferPrice] = useState("");

  const handleSendOffer = (e) => {
    e.preventDefault();
    addToast(`Custom price offer of ${formatPrice(offerPrice)} sent to vendor!`, "success");
    setOfferPrice("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <DollarSign className="w-4 h-4" /> Price Haggling Desk
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Make a Custom Price Offer</h1>
        <p className="text-xs text-gray-500">Negotiate prices directly with Pro Boutiques for bulk purchases or custom bundles</p>
      </div>

      <form onSubmit={handleSendOffer} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-500 font-semibold block mb-1">Your Offered Unit Price (€)</label>
          <input
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            placeholder="e.g. 175.00"
            required
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3.5 rounded-2xl border focus:outline-none font-bold text-orange-500 text-base"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2">
          <Send className="w-4 h-4" /> Submit Offer to Vendor
        </button>
      </form>
    </div>
  );
};

export default PriceNegotiation;
