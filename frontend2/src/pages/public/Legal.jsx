// ============================================================================
// PAGE : Legal.jsx
// ROLE : Legal Policies (Terms of Service, Privacy Policy, Cookie Policy, Refunds)
// ============================================================================

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText, ShieldCheck, Lock, RefreshCcw, Award } from "lucide-react";

export const Legal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "terms";

  const setTab = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white space-y-2 shadow-md border border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2 text-white">
          <FileText className="w-7 h-7 text-orange-500" /> Legal Policies & Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Official terms, privacy standards, escrow refund rules, and seller guidelines for MoExpress Marketplace.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: "terms", label: "Terms of Service", icon: FileText },
          { id: "privacy", label: "Privacy Policy", icon: Lock },
          { id: "cookies", label: "Cookie Policy", icon: ShieldCheck },
          { id: "refunds", label: "Refund & Returns Policy", icon: RefreshCcw },
          { id: "intellectual", label: "Intellectual Property", icon: Award },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4 text-orange-500" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
        {activeTab === "terms" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Terms of Service</h2>
            <p>
              Welcome to MoExpress MARKETPLACE ("Shop More, Live Better!"). By using our platform, buyers and sellers agree to strictly adhere to international e-commerce regulations, accurate product descriptions, and fair pricing.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white">1. Buyer & Seller Responsibilities</h3>
            <p>
              Sellers are required to maintain active inventory and deliver items matching uploaded product images. Fraudulent listings, counterfeit items, or delayed shipping will result in immediate account ban via our security blacklist.
            </p>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Privacy Policy</h2>
            <p>
              Your privacy and security are paramount. MoExpress encrypts all personal credentials, payment tokens, and communications using modern SSL standards and secure JWT sessions.
            </p>
          </div>
        )}

        {activeTab === "cookies" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Cookie Policy</h2>
            <p>
              We use essential cookies to persist your cart, active currency selections, theme preferences, and 9-language locale settings for a seamless shopping experience.
            </p>
          </div>
        )}

        {activeTab === "refunds" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Refund & Returns Escrow Policy</h2>
            <p>
              All purchases on MoExpress are protected by 100% Buyer Protection. If an item is defective or not received, submit a dispute claim in our Conflict Center within 30 days for a full refund.
            </p>
          </div>
        )}

        {activeTab === "intellectual" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Intellectual Property & Trademarks</h2>
            <p>
              MoExpress MARKETPLACE, its orange shopping bag logo, and slogan "Shop More, Live Better!" are protected brand assets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Legal;
