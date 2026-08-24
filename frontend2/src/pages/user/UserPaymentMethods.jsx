// ============================================================================
// PAGE : UserPaymentMethods.jsx
// ROLE : User Dashboard - Payment Methods, Saved Cards, CIB/CCP & Bank RIB Manager
// ============================================================================

import React, { useState } from "react";
import { CreditCard, ShieldCheck, Plus, Trash2, CheckCircle, Lock, Wallet, AlertCircle, Building } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const UserPaymentMethods = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm_cib_1",
      type: "algerian_cib",
      title: "Satim CIB Interbank Card",
      provider: "CIB Algérie (Satim 3D-Secure)",
      last4: "8892",
      holder: user?.name || "MoExpress Member",
      expiry: "12/28",
      isDefault: true,
    },
    {
      id: "pm_ccp_1",
      type: "algerian_ccp",
      title: "Edahabia CCP Card",
      provider: "Algérie Poste (BaridiMob)",
      last4: "4890",
      holder: user?.name || "MoExpress Member",
      expiry: "09/27",
      isDefault: false,
    },
    {
      id: "pm_stripe_1",
      type: "stripe",
      title: "Visa Credit Card (Stripe)",
      provider: "Stripe Official Gateway",
      last4: "4242",
      holder: user?.name || "MoExpress Member",
      expiry: "06/29",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethodType, setNewMethodType] = useState("algerian_cib");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
    addToast("Default payment method updated!", "success");
  };

  const handleDeleteMethod = (id) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
    addToast("Payment method removed successfully.", "info");
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    if (!cardHolder.trim() || !cardNumber.trim()) {
      addToast("Please fill in cardholder name and number!", "warning");
      return;
    }

    const last4 = cardNumber.slice(-4) || "9999";
    const title =
      newMethodType === "algerian_cib"
        ? "Satim CIB Card"
        : newMethodType === "algerian_ccp"
        ? "Edahabia CCP Card"
        : newMethodType === "stripe"
        ? "Visa / MasterCard"
        : "Algerian Bank RIB";

    const provider =
      newMethodType === "algerian_cib"
        ? "Satim CIB Algérie"
        : newMethodType === "algerian_ccp"
        ? "Algérie Poste (BaridiMob)"
        : newMethodType === "stripe"
        ? "Stripe Official"
        : "BNA / BDL Bank";

    const newPm = {
      id: "pm_" + Date.now(),
      type: newMethodType,
      title,
      provider,
      last4,
      holder: cardHolder,
      expiry: expiry || "12/30",
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods((prev) => [...prev, newPm]);
    addToast(`Successfully added ${title}!`, "success");
    setCardHolder("");
    setCardNumber("");
    setExpiry("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white space-y-2 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <CreditCard className="w-7 h-7 text-orange-500" /> Payment Methods & Wallet Settings
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Manage your saved CIB Satim cards, Edahabia CCP accounts, Stripe credit cards, and bank RIB details.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Payment Method
          </button>
        </div>
      </div>

      {/* Add New Method Form Modal / Box */}
      {showAddForm && (
        <form onSubmit={handleAddPaymentMethod} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-500" /> Add New Payment Gateway / Card
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-500 font-bold block mb-1">Gateway Type:</label>
              <select
                value={newMethodType}
                onChange={(e) => setNewMethodType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <option value="algerian_cib">Satim CIB Card (Algérie)</option>
                <option value="algerian_ccp">Edahabia CCP Card (BaridiMob)</option>
                <option value="stripe">Visa / MasterCard (Stripe)</option>
                <option value="algerian_rib">Bank RIB Transfer (BNA/BDL)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-500 font-bold block mb-1">Card / Account Holder Name:</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Full Name as on Card"
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="text-slate-500 font-bold block mb-1">Card Number / RIB / CCP:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="**** **** **** 1234"
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2 rounded-xl transition shadow-xs"
            >
              Save Payment Method
            </button>
          </div>
        </form>
      )}

      {/* Saved Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((pm) => (
          <div
            key={pm.id}
            className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 bg-white dark:bg-slate-900 shadow-xs transition hover:scale-[1.01] ${
              pm.isDefault ? "border-2 border-orange-500" : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded">
                  {pm.provider}
                </span>
                {pm.isDefault ? (
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Default
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(pm.id)}
                    className="text-[10px] font-bold text-slate-400 hover:text-orange-500 transition"
                  >
                    Set Default
                  </button>
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{pm.title}</h4>
                <p className="font-mono text-sm tracking-wider text-slate-600 dark:text-slate-400 mt-1">
                  •••• •••• •••• {pm.last4}
                </p>
              </div>

              <div className="flex justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                <span>Holder: <strong className="text-slate-700 dark:text-slate-200">{pm.holder}</strong></span>
                <span>Exp: <strong className="text-slate-700 dark:text-slate-200">{pm.expiry}</strong></span>
              </div>
            </div>

            <button
              onClick={() => handleDeleteMethod(pm.id)}
              className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 self-end transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPaymentMethods;
