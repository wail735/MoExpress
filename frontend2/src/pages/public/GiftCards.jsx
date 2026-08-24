// ============================================================================
// PAGE : GiftCards.jsx
// ROLE : Digital Gift Cards & Store Credit Portal (/gift-cards)
// ============================================================================

import React, { useState } from "react";
import { Gift, CreditCard, Coins, Check } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const GiftCards = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [redeemCode, setRedeemCode] = useState("");

  const giftCards = [
    { amount: 25, bonusCoins: 50 },
    { amount: 50, bonusCoins: 120 },
    { amount: 100, bonusCoins: 300 },
    { amount: 250, bonusCoins: 900 },
  ];

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!redeemCode.trim()) return;
    addToast(`Gift Voucher [${redeemCode}] redeemed! Balance & Coins added.`, "success");
    setRedeemCode("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Gift className="w-4 h-4" /> Digital Store Credits
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">MoExpress Gift Cards & Vouchers</h1>
        <p className="text-xs text-gray-500">Buy digital gift cards or redeem voucher codes for instant coins and shopping credit</p>
      </div>

      {/* Redeem Voucher Form */}
      <form onSubmit={handleRedeem} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={redeemCode}
          onChange={(e) => setRedeemCode(e.target.value)}
          placeholder="Enter Gift Card Code (e.g. GIFT-2026-XXXX)..."
          required
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs font-mono focus:outline-none focus:border-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-1 text-xs"
        >
          Redeem Voucher
        </button>
      </form>

      {/* Gift Card Tier Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {giftCards.map((gc) => (
          <div key={gc.amount} className="bg-gradient-to-br from-brand-navy to-gray-900 p-6 rounded-3xl border border-gray-800 text-white space-y-4 shadow-xl text-center">
            <Gift className="w-10 h-10 text-amber-500 mx-auto animate-pulse" />
            <h3 className="text-3xl font-black text-orange-500">{formatPrice(gc.amount)}</h3>
            <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center justify-center gap-1">
              <Coins className="w-3 h-3" /> +{gc.bonusCoins} Bonus Coins
            </span>
            <button
              onClick={() => addToast(`Gift Card worth ${formatPrice(gc.amount)} purchased!`, "success")}
              className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-brand-accent transition text-xs shadow-md"
            >
              Buy Gift Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCards;
