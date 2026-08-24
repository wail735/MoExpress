import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, ShieldCheck, Check, Sparkles, Zap, CreditCard, Lock, X, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const Subscriptions = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  const plans = [
    { id: "plan_basic", name: "Basic", price: 4.99, coinsBonus: 50, noAds: true, includesProShop: false, features: ["Standard Support", "5% Extra Discount", "No Ads Experience"] },
    { id: "plan_premium", name: "Premium", price: 9.99, coinsBonus: 150, noAds: true, includesProShop: false, features: ["Priority Support", "10% Extra Discount", "No Ads Experience", "150 Coins Bonus"] },
    { id: "plan_pro", name: "Pro", price: 19.99, coinsBonus: 400, noAds: true, includesProShop: true, features: ["Verified Pro Shop Badge", "Certified Supplier Badge", "20% Extra Discount", "No Ads", "400 Coins Bonus"] },
    { id: "plan_enterprise", name: "Enterprise", price: 49.99, coinsBonus: 1000, noAds: true, includesProShop: true, features: ["Pro Shop + Supplier Badge", "Dedicated Account Manager", "30% Discount", "1000 Coins Bonus"] },
  ];

  const handleOpenSubscribeModal = async (plan) => {
    if (!isAuthenticated) {
      addToast("Please log in to your account to subscribe to a membership plan!", "warning");
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const data = await apiClient.post("/payments/stripe/checkout", {
        paymentType: "subscription",
        referenceId: plan.id,
        amount: plan.price,
        description: `${plan.name} Subscription Plan Upgrade`,
      });
      if (data?.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
        return;
      }
      if (data?.data?.url) {
        window.location.href = data.data.url;
        return;
      }
      addToast("Failed to initiate Stripe payment. Please try again.", "error");
    } catch (err) {
      addToast("Payment processing error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async () => {
    if (!selectedPlan) return;
    handleOpenSubscribeModal(selectedPlan);
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white space-y-2 border border-slate-800 shadow-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
          <Zap className="w-7 h-7 text-orange-500" /> VIP Subscription Plans
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Subscribe to remove all ads, unlock Verified Pro Shop & Certified Supplier Badges, and claim monthly Coins!
        </p>
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border flex flex-col justify-between space-y-4 shadow-xs transition hover:scale-[1.02] ${
              plan.includesProShop ? "border-2 border-orange-500 shadow-md" : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="space-y-3">
              {plan.includesProShop && (
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-xs uppercase tracking-wider inline-block">
                  Includes Pro Shop & Supplier
                </span>
              )}
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{plan.name}</h3>
              <div className="text-3xl font-black text-orange-500">
                {formatPrice(plan.price)} <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-slate-800">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleOpenSubscribeModal(plan)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" /> Subscribe ({formatPrice(plan.price)})
            </button>
          </div>
        ))}
      </div>

      {/* Subscription Payment Selection Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-500" /> Checkout: {selectedPlan.name} Plan ({formatPrice(selectedPlan.price)})
              </h3>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Select Payment Gateway:</label>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "stripe" ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <input type="radio" name="sub_pay" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} />
                  <span>Stripe Official Credit Card (Visa / MasterCard)</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "cib" ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <input type="radio" name="sub_pay" value="cib" checked={paymentMethod === "cib"} onChange={() => setPaymentMethod("cib")} />
                  <span>Satim CIB AlgÃ©rie (Carte Interbancaire)</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "ccp" ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <input type="radio" name="sub_pay" value="ccp" checked={paymentMethod === "ccp"} onChange={() => setPaymentMethod("ccp")} />
                  <span>Edahabia CCP (AlgÃ©rie Poste / BaridiMob)</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleProcessPayment}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
            >
              {loading ? "Processing Payment..." : `Confirm & Pay ${formatPrice(selectedPlan.price)}`} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;



