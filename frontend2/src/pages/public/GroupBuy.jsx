// ============================================================================
// PAGE : GroupBuy.jsx
// ROLE : Pinduoduo-Style Team Buying & Group Discount Hub (/group-buy)
// ============================================================================

import React, { useState } from "react";
import { Users, UserPlus, ShoppingBag, Sparkles } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const GroupBuy = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [joined, setJoined] = useState(false);

  const handleJoinTeam = () => {
    setJoined(true);
    addToast("Team Purchase Joined! 60% Group discount unlocked.", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-purple-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Users className="w-4 h-4" /> Team Purchase
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Pinduoduo-Style Group Buy Deals</h1>
        <p className="text-xs text-gray-500">Invite friends or join existing buyer teams to unlock up to 60% group discounts</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" alt="Group Deal" className="w-36 h-36 object-cover rounded-2xl border shadow-lg" />
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sony WH-1000XM5 Wireless Headphones</h2>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="text-xs text-gray-400 line-through">Single Price: {formatPrice(399.99)}</span>
              <span className="text-2xl font-black text-orange-500">Group Price: {formatPrice(159.99)}</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">S</div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">K</div>
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-500 text-xs font-bold flex items-center justify-center border-2 border-white">+1</div>
              </div>
              <span className="text-xs text-gray-500 font-bold">2 / 3 Buyers Needed (1 Spot Left!)</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleJoinTeam}
          disabled={joined}
          className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 ${
            joined
              ? "bg-green-600 text-white cursor-default"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-95"
          }`}
        >
          {joined ? <><Sparkles className="w-4 h-4" /> Team Complete & Discount Unlocked!</> : <><UserPlus className="w-4 h-4" /> Join Team & Pay {formatPrice(159.99)}</>}
        </button>
      </div>
    </div>
  );
};

export default GroupBuy;
