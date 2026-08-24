// ============================================================================
// PAGE : GlobalShippingHub.jsx
// ROLE : 7-Day Express Delivery Guarantee & On-Time Shipping Voucher Hub (/global-shipping)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { Truck, ShieldCheck, Clock, CheckCircle, Search, Gift, Package } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const GlobalShippingHub = () => {
  const { addToast } = useNotification();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("dz");
  const [claimedVoucher, setClaimedVoucher] = useState(false);

  const destinations = [
    { code: "dz", name: "Algeria (Express 3-5 Days)", cost: "Free on orders $10+" },
    { code: "fr", name: "France (Express 4-6 Days)", cost: "€2.99" },
    { code: "ae", name: "UAE / GCC (Express 5-7 Days)", cost: "$3.99" },
  ];

  const handleTrackEstimate = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      addToast("Please enter a tracking number or order ID", "error");
      return;
    }
    addToast(`Express Order ${trackingNumber} is on schedule! Estimated arrival in 2 days.`, "success");
  };

  const handleClaimVoucher = () => {
    setClaimedVoucher(true);
    addToast("Late Delivery $1.00 Coupon added to your account wallet!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-1.5">
        <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-md">
          <Truck className="w-3.5 h-3.5" /> 7-Day Delivery Guarantee
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Global Guaranteed Express Shipping</h1>
        <p className="text-xs text-slate-500">Fast 7-day door-to-door delivery promise with $1 coupon credit for any late shipment</p>
      </div>

      {/* Estimator & Tracking Search */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Package className="w-4 h-4 text-emerald-500" /> Track Order Delivery Status
        </h3>

        <form onSubmit={handleTrackEstimate} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter Order ID or Express Tracking Number (e.g. MO-884920)..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" /> Estimate Arrival
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Destination Country:</span>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 text-xs text-slate-200 px-3 py-1 rounded-lg border border-slate-700 focus:outline-none"
          >
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <Clock className="w-6 h-6 text-orange-500 mx-auto" />
            <h4 className="font-bold text-slate-900 dark:text-white">7-Day Arrival</h4>
            <p className="text-slate-400 text-[11px]">Direct express flight dispatch</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-900 dark:text-white">On-Time Coupon</h4>
            <p className="text-slate-400 text-[11px]">$1 voucher if delayed</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <CheckCircle className="w-6 h-6 text-blue-500 mx-auto" />
            <h4 className="font-bold text-slate-900 dark:text-white">Loss Guarantee</h4>
            <p className="text-slate-400 text-[11px]">Full refund if lost in transit</p>
          </div>
        </div>

        <button
          onClick={handleClaimVoucher}
          disabled={claimedVoucher}
          className={`w-full py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            claimedVoucher
              ? "bg-slate-800 text-slate-400 cursor-default"
              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
          }`}
        >
          <Gift className="w-4 h-4" /> {claimedVoucher ? "On-Time Late Voucher Claimed" : "Claim $1.00 Late Guarantee Voucher"}
        </button>
      </div>
    </div>
  );
};

export default GlobalShippingHub;
