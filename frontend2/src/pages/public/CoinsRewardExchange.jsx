// ============================================================================
// PAGE : CoinsRewardExchange.jsx
// ROLE : AliExpress Coins to Discount Voucher Exchange Hub (/coins-rewards)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coins, Ticket, Gift, Check, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const CoinsRewardExchange = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [claimed, setClaimed] = useState([]);

  const userCoins = isAuthenticated ? (user?.coins || 0) : 0;
  const coinsMoneyValue = userCoins * 0.01;

  const coinVouchers = [
    { id: "cv1", coins: 200, voucher: "$2 OFF Coupon", minSpend: "Min. order $10" },
    { id: "cv2", coins: 500, voucher: "$5 OFF Coupon", minSpend: "Min. order $25" },
    { id: "cv3", coins: 1000, voucher: "$10 OFF VIP Voucher", minSpend: "Min. order $50" },
  ];

  const handleExchange = (id, v) => {
    if (!isAuthenticated) {
      addToast("Please sign in to your account to redeem coins & vouchers!", "warning");
      navigate("/login");
      return;
    }

    if (userCoins < v.coins) {
      addToast(`Insufficient coins! You need ${v.coins} coins (Balance: ${userCoins}).`, "error");
      return;
    }

    updateUserProfile({ coins: userCoins - v.coins });
    setClaimed((prev) => [...prev, id]);
    addToast(`Exchanged ${v.coins} coins for [${v.voucher}]! Saved to your account.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Wallet Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 rounded-3xl p-6 text-slate-900 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider block text-slate-900/80">
            {isAuthenticated ? "Your Active Wallet Balance" : "Offline Guest Balance"}
          </span>
          <h2 className="text-3xl font-black flex items-center gap-2 mt-1">
            <Coins className="w-8 h-8 text-yellow-200 animate-pulse" />
            {userCoins.toLocaleString()} Coins
          </h2>
          <p className="text-xs font-bold text-slate-900/90 mt-1">
            Monetary Equivalent: <span className="font-extrabold">{formatPrice(coinsMoneyValue)}</span>
          </p>
        </div>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-lg transition flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Sign In to Claim Coins
          </Link>
        )}
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {coinVouchers.map((v) => {
          const isClaimed = claimed.includes(v.id);
          return (
            <div key={v.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                <span className="flex items-center gap-1"><Coins className="w-4 h-4" /> {v.coins} Coins</span>
                <span className="text-[10px] text-gray-400 font-normal">≈ {formatPrice(v.coins * 0.01)}</span>
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{v.voucher}</h3>
              <p className="text-xs text-slate-400">{v.minSpend}</p>
              <button
                onClick={() => handleExchange(v.id, v)}
                disabled={isClaimed}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                  isClaimed ? "bg-emerald-600/20 text-emerald-400 cursor-default" : "bg-orange-500 text-white hover:bg-brand-accent shadow-sm"
                }`}
              >
                {isClaimed ? <><Check className="w-4 h-4 inline" /> Exchanged</> : "Redeem Voucher"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinsRewardExchange;
