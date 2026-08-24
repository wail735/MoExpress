// ============================================================================
// PAGE : LuckyDraw.jsx
// ROLE : Temu-Style Gamified Reward Spin Wheel & Mystery Box Portal (/lucky-draw)
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Trophy, Gift, RefreshCw, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const LuckyDraw = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState(null);

  const prizes = [
    { text: "50 Bonus Coins", bonusCoins: 50 },
    { text: "$20 Pro Shop Voucher", bonusCoins: 0 },
    { text: "Mystery Tech Box", bonusCoins: 100 },
    { text: "Free Express Shipping Coupon", bonusCoins: 0 },
  ];

  const userCoins = isAuthenticated ? (user?.coins || 0) : 0;

  const handleSpin = () => {
    if (!isAuthenticated) {
      addToast("Please sign in to your account to spin the wheel & win rewards!", "warning");
      navigate("/login");
      return;
    }

    if (userCoins < 10) {
      addToast("Insufficient coins! 10 coins required per spin.", "error");
      return;
    }

    if (spinning) return;
    setSpinning(true);
    setPrize(null);

    // Deduct 10 coins for the spin
    updateUserProfile({ coins: userCoins - 10 });

    setTimeout(() => {
      const won = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(won.text);
      setSpinning(false);

      if (won.bonusCoins > 0) {
        updateUserProfile({ coins: userCoins - 10 + won.bonusCoins });
      }

      addToast(`🎉 Congratulations! You won: [${won.text}]!`, "success");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-yellow-500 text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Trophy className="w-4 h-4" /> Gamified Rewards
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Spin the Wheel & Win Rewards</h1>
        <p className="text-xs text-gray-500">Spend 10 coins per spin to win mystery tech boxes, discount vouchers, and bonus coins</p>
      </div>

      <div className="bg-gradient-to-br from-brand-navy via-gray-900 to-brand-dark p-8 rounded-3xl border border-gray-800 text-white shadow-2xl text-center space-y-6">
        <div className={`w-48 h-48 rounded-full border-4 border-yellow-400 mx-auto flex items-center justify-center bg-slate-900 text-white shadow-2xl relative transition-transform duration-1000 ${
          spinning ? "rotate-[1440deg]" : ""
        }`}>
          <div className="space-y-1">
            <Gift className="w-12 h-12 text-yellow-400 mx-auto animate-pulse" />
            <span className="font-black text-xs text-orange-500 block">SPIN WHEEL</span>
          </div>
        </div>

        {prize && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-400/40 rounded-2xl animate-fadeIn">
            <h3 className="font-black text-lg text-yellow-300">🎉 You Won: {prize}!</h3>
          </div>
        )}

        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-full transition flex items-center gap-2 mx-auto shadow-lg text-xs"
          >
            <LogIn className="w-4 h-4" /> Sign In to Spin Wheel & Win
          </button>
        ) : (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black px-8 py-3.5 rounded-full hover:opacity-95 transition flex items-center gap-2 mx-auto shadow-lg text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} /> Spin Wheel (10 Coins)
          </button>
        )}
      </div>
    </div>
  );
};

export default LuckyDraw;
