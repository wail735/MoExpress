// ============================================================================
// PAGE : DailyQuizRewards.jsx
// ROLE : Shopping Trivia & Daily Quiz Coins Rewards Portal (/quiz-rewards)
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Coins, Check, Trophy, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const DailyQuizRewards = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitQuiz = () => {
    if (!isAuthenticated) {
      addToast("Please sign in to claim your +100 Daily Quiz Coins!", "warning");
      navigate("/login");
      return;
    }

    setSubmitted(true);
    updateUserProfile({ coins: (user?.coins || 0) + 100 });
    addToast(`🎉 Correct Answer! +100 Bonus Coins (Value: ${formatPrice(1.00)}) credited to your wallet.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-amber-500 text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <HelpCircle className="w-4 h-4" /> Daily Trivia Rewards
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Daily Shopping Quiz Challenge</h1>
        <p className="text-xs text-gray-500">Answer 1 quick daily question to earn +100 free shopping coins (≈ {formatPrice(1.00)}) every day</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Q: What benefit do MoExpress Pro Boutiques get on the marketplace?</h3>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          {["Supplier Verified Badge + Custom Styling", "Free Unlimited Express Delivery", "24/7 Personal Account Manager"].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOpt(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition font-semibold ${
                selectedOpt === idx ? "bg-orange-500 text-white border-brand-orange font-bold" : "bg-gray-50 dark:bg-gray-800 text-slate-900 dark:text-white hover:border-orange-500"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In to Answer & Claim +100 Coins
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={selectedOpt === null || submitted}
            className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 ${
              submitted ? "bg-green-600 text-white cursor-default" : "bg-orange-500 hover:bg-brand-accent text-white"
            }`}
          >
            {submitted ? <><Check className="w-4 h-4" /> Answer Submitted (+100 Coins)</> : <><Coins className="w-4 h-4" /> Submit Answer & Claim Coins</>}
          </button>
        )}
      </div>
    </div>
  );
};

export default DailyQuizRewards;
