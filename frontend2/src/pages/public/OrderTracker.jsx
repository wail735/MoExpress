// ============================================================================
// PAGE : OrderTracker.jsx
// ROLE : Live Parcel Tracking & Logistics Radar Page (/track-order)
// ============================================================================

import React, { useState } from "react";
import { Truck, Search, CheckCircle, Clock, PackageCheck, MapPin } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const OrderTracker = () => {
  const { addToast } = useNotification();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [activeTracking, setActiveTracking] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setActiveTracking({
      number: trackingNumber,
      status: "In Transit",
      carrier: "DHL Express",
      estimatedDelivery: "24 Aug 2026",
      steps: [
        { label: "Order Placed & Verified", done: true, time: "21 Aug, 09:00" },
        { label: "Payment & Escrow Cleared", done: true, time: "21 Aug, 10:30" },
        { label: "Shipped from Supplier Warehouse", done: true, time: "21 Aug, 14:15" },
        { label: "Customs Clearance Verified", done: true, time: "21 Aug, 18:00" },
        { label: "Out for Local Express Delivery", done: false, time: "Pending" },
      ],
    });
    addToast(`Found active shipment status for #${trackingNumber}!`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-blue-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Truck className="w-4 h-4" /> Live Tracking Radar
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Track Your Order Parcel</h1>
        <p className="text-xs text-gray-500">Enter your order ID or tracking code for real-time logistics checkpoints</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 max-w-xl mx-auto">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter Tracking ID (e.g. DHL-98765 or ORD-101)..."
          required
          className="flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm focus:outline-none focus:border-orange-500 shadow-lg"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 text-xs"
        >
          <Search className="w-4 h-4" /> Track
        </button>
      </form>

      {activeTracking && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 gap-2">
            <div>
              <span className="text-xs text-gray-400">Tracking Code:</span>
              <h3 className="font-mono font-bold text-base text-orange-500">{activeTracking.number}</h3>
            </div>
            <div className="text-right">
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                {activeTracking.status}
              </span>
              <span className="block text-xs text-gray-400 mt-1">Est. Delivery: {activeTracking.estimatedDelivery}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Logistics Timeline</h4>
            <div className="space-y-4">
              {activeTracking.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 text-xs">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-400"
                  }`}>
                    {step.done ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${step.done ? "text-slate-900 dark:text-white" : "text-gray-400"}`}>{step.label}</p>
                    <span className="text-[10px] text-gray-500 font-mono">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
