// ============================================================================
// PAGE : LiveAuctions.jsx
// ROLE : Live Bidding & Product Auctions Portal (/auctions)
// ============================================================================

import React, { useState } from "react";
import { Gavel, Clock, Trophy, TrendingUp } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const LiveAuctions = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(450.0);

  const handlePlaceBid = (e) => {
    e.preventDefault();
    const numericBid = Number(bidAmount);
    if (numericBid <= currentBid) {
      addToast(`Bid must be higher than current bid of ${formatPrice(currentBid)}!`, "error");
      return;
    }
    setCurrentBid(numericBid);
    addToast(`Bid placed successfully of ${formatPrice(numericBid)}! You are highest bidder.`, "success");
    setBidAmount("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Gavel className="w-4 h-4" /> Live Auctions
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Real-Time Product Bidding</h1>
        <p className="text-xs text-gray-500">Bid on rare electronics, collectibles, and flagship Pro Boutique items</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" alt="Auction Item" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">Live Bidding Active</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange-500" /> Ends in 02h 15m</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Limited Edition Apple Watch Series 9 Gold Titanium</h2>
            <p className="text-xs text-gray-400 leading-relaxed">Rare collector item with original packaging, certified supplier authenticity, and 1-year global warranty.</p>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl space-y-1">
              <span className="text-xs text-gray-500 font-semibold block">Current Highest Bid</span>
              <span className="text-3xl font-black text-orange-500">{formatPrice(currentBid)}</span>
            </div>

            <form onSubmit={handlePlaceBid} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Your Bid Amount (€)</label>
                <input
                  type="number"
                  step="5"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Min. bid ${currentBid + 5}`}
                  required
                  className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 text-sm font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-xs"
              >
                <TrendingUp className="w-4 h-4" /> Place Bid Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctions;
