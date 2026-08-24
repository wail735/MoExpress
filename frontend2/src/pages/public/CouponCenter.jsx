// ============================================================================
// PAGE : CouponCenter.jsx
// ROLE : Interactive Voucher Wall & Coupon Collection Hub (/coupons)
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Coins, Check, Gift, Lock } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

export const CouponCenter = () => {
  const { addToast } = useNotification();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [claimedCodes, setClaimedCodes] = useState([]);

  const vouchers = [
    { id: "v1", code: "MOEX2026", discount: "$10 OFF", minSpend: "Min. spend $50", category: "Sitewide", exp: "30 Aug 2026" },
    { id: "v2", code: "VIPPRO50", discount: "20% OFF", minSpend: "Min. spend $100", category: "Pro Shops", exp: "15 Sep 2026" },
    { id: "v3", code: "COINBONUS", discount: "+200 Coins", minSpend: "Instant Bonus", category: "Wallet", exp: "31 Dec 2026" },
  ];

  const handleClaim = (v) => {
    if (!isAuthenticated) {
      addToast("Please log in to claim vouchers and save promo codes!", "warning");
      navigate("/login");
      return;
    }
    if (claimedCodes.includes(v.id)) return;
    setClaimedCodes((prev) => [...prev, v.id]);
    addToast(`Voucher [${v.code}] claimed & saved to your account!`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Ticket className="w-4 h-4" /> Coupon Center
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Claim Exclusive Vouchers & Coins</h1>
        <p className="text-xs text-gray-500">Collect promo codes and coin bonuses to use at checkout</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {vouchers.map((v) => {
          const isClaimed = claimedCodes.includes(v.id);
          return (
            <div key={v.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-xs font-bold text-gray-400 uppercase">{v.category}</span>
                <span className="text-[10px] text-gray-500 font-mono">Expires {v.exp}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-orange-500">{v.discount}</h3>
                <p className="text-xs text-gray-500 font-medium">{v.minSpend}</p>
                <span className="inline-block bg-gray-100 dark:bg-gray-800 font-mono font-bold text-xs px-3 py-1 rounded-lg text-amber-500 border">
                  {v.code}
                </span>
              </div>

              <button
                onClick={() => handleClaim(v)}
                disabled={isClaimed}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5 ${
                  isClaimed
                    ? "bg-green-600/20 text-green-400 border border-green-600/30 cursor-default"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-95"
                }`}
              >
                {isClaimed ? <><Check className="w-4 h-4" /> Claimed</> : <><Gift className="w-4 h-4" /> Claim Coupon</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CouponCenter;
