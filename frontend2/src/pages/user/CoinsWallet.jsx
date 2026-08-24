// ============================================================================
// PAGE : CoinsWallet.jsx
// ROLE : MoExpress Virtual Coins Wallet & Packages Purchase
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coins, PlusCircle, CheckCircle, Sparkles, LogIn, CreditCard, X, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const CoinsWallet = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [selectedPack, setSelectedPack] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  const userCoins = isAuthenticated ? (user?.coins || 0) : 0;
  const coinsMoneyValue = userCoins * 0.01;

  const coinPacks = [
    { id: "pack_100", coins: 100, priceEuros: 1.0 },
    { id: "pack_500", coins: 500, priceEuros: 4.5 },
    { id: "pack_1000", coins: 1000, priceEuros: 8.5 },
    { id: "pack_5000", coins: 5000, priceEuros: 39.0 },
  ];

  const handleOpenBuyModal = (pack) => {
    if (!isAuthenticated) {
      addToast("Please sign in to your account to purchase coin packages!", "warning");
      navigate("/login");
      return;
    }
    setSelectedPack(pack);
  };

  const handleConfirmCoinPayment = async () => {
    if (!selectedPack) return;
    setLoading(true);

    try {
      if (paymentMethod === "stripe") {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/v1/payments/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentType: "coins",
            referenceId: selectedPack.id,
            amount: selectedPack.priceEuros,
            description: `Purchase of +${selectedPack.coins} MoExpress Coins`,
          }),
        });
        const data = await res.json();
        if (data.success && data.data?.url) {
          window.location.href = data.data.url;
          return;
        }
      }

      updateUserProfile({ coins: userCoins + selectedPack.coins });
      addToast(`Payment Confirmed! Successfully purchased +${selectedPack.coins} Coins.`, "success");
      setSelectedPack(null);
    } catch (err) {
      addToast("Payment error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-white/80">
            {isAuthenticated ? "My Virtual Wallet Balance" : "Guest Offline Balance"}
          </span>
          <h2 className="text-4xl font-black flex items-center gap-2 mt-1">
            <Coins className="w-9 h-9 text-yellow-200 animate-bounce" /> {userCoins.toLocaleString()} Coins
          </h2>
          <p className="text-xs text-white/90 mt-1">
            Monetary Value: <span className="font-extrabold">{formatPrice(coinsMoneyValue)}</span> — Use coins for discounts, subscriptions, or Meta Ads!
          </p>
        </div>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="bg-slate-900 text-white hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In to View & Purchase
          </Link>
        )}
      </div>

      {/* Coin Packages Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-orange-500" /> Buy Coin Packs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {coinPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3 hover:border-orange-500 transition shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-1">
                <Coins className="w-8 h-8 text-brand-yellow mx-auto" />
                <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">+{pack.coins} Coins</h4>
                <p className="text-xs text-gray-400">Value: ≈ {formatPrice(pack.coins * 0.01)}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-lg font-black text-orange-500 block">{formatPrice(pack.priceEuros)}</span>
                <button
                  onClick={() => handleOpenBuyModal(pack)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-4 h-4" /> {isAuthenticated ? `Buy (${formatPrice(pack.priceEuros)})` : "Sign In to Buy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coins Payment Selection Modal */}
      {selectedPack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" /> Buy +{selectedPack.coins} Coins ({formatPrice(selectedPack.priceEuros)})
              </h3>
              <button onClick={() => setSelectedPack(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Select Payment Gateway:</label>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "stripe" ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <input type="radio" name="coin_pay" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} />
                  <span>Stripe Official Credit Card (Visa / MasterCard)</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "cib" ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <input type="radio" name="coin_pay" value="cib" checked={paymentMethod === "cib"} onChange={() => setPaymentMethod("cib")} />
                  <span>Satim CIB Algérie (Carte Interbancaire)</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "ccp" ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <input type="radio" name="coin_pay" value="ccp" checked={paymentMethod === "ccp"} onChange={() => setPaymentMethod("ccp")} />
                  <span>Edahabia CCP (Algérie Poste / BaridiMob)</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleConfirmCoinPayment}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
            >
              {loading ? "Processing Payment..." : `Confirm & Pay ${formatPrice(selectedPack.priceEuros)}`} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinsWallet;
