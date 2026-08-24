// ============================================================================
// PAGE : ReferralProgram.jsx
// ROLE : Affiliate Referral Program & Commission Earnings Portal (/referral)
// ============================================================================

import React, { useState } from "react";
import { Share2, Copy, DollarSign, Users, Award, Check } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const ReferralProgram = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [copied, setCopied] = useState(false);

  const referralLink = "https://moexpress.com/register?ref=MY_AFFILIATE_CODE_2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    addToast("Referral link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Share2 className="w-4 h-4" /> Affiliate Program
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Earn Cash & Coins with Referrals</h1>
        <p className="text-xs text-gray-500">Invite friends and buyers to MoExpress Marketplace and earn 5% cash commission on all their orders</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Share2 className="w-5 h-5 text-orange-500" /> Your Unique Referral Link
        </h3>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            onChange={() => {}}
            className="flex-1 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs font-mono"
          />
          <button
            onClick={handleCopy}
            className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs"
          >
            {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Link</>}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl">
            <Users className="w-6 h-6 text-orange-500 mx-auto mb-1" />
            <span className="text-xs text-gray-500 block">Total Referrals</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">18 Users</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl">
            <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-1" />
            <span className="text-xs text-gray-500 block">Earned Cash</span>
            <span className="text-2xl font-black text-green-500">{formatPrice(142.50)}</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl">
            <Award className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <span className="text-xs text-gray-500 block">Commission Rate</span>
            <span className="text-2xl font-black text-amber-500">5.0 %</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;
