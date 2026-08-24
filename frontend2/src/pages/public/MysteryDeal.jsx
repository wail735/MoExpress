// ============================================================================
// PAGE : MysteryDeal.jsx
// ROLE : Scratch-Off Mystery Discount Box Reveal Portal (/mystery-deal)
// ============================================================================

import React, { useState } from "react";
import { Sparkles, Gift, ShoppingBag, RefreshCw } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const MysteryDeal = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [revealed, setRevealed] = useState(false);

  const handleScratch = () => {
    setRevealed(true);
    addToast("🎉 Mystery Box Revealed! 85% OFF Sony XM5 Headphones!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-yellow-500 text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Gift className="w-4 h-4" /> Scratch & Win
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Daily Mystery Scratch Box</h1>
        <p className="text-xs text-gray-500">Scratch off the card to reveal your secret mystery deal up to 90% OFF</p>
      </div>

      <div className="bg-gradient-to-br from-brand-navy to-gray-900 p-8 rounded-3xl border border-gray-800 text-white shadow-2xl text-center space-y-6">
        <div
          onClick={handleScratch}
          className="aspect-square max-w-sm mx-auto bg-yellow-500 rounded-3xl p-8 flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 transition transform text-slate-900 font-black text-xl"
        >
          {revealed ? (
            <div className="space-y-2">
              <span className="text-3xl font-black text-red-600 block">85% OFF</span>
              <h3 className="font-bold text-sm">Sony WH-1000XM5</h3>
              <span className="text-xl font-black text-slate-900">{formatPrice(49.99)}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <Gift className="w-16 h-16 mx-auto animate-bounce" />
              <span>Click to Scratch Card!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MysteryDeal;
