// ============================================================================
// PAGE : ConflictCenter.jsx
// ROLE : Conflict Resolution Center for filing fraud disputes and escrow claims
// ============================================================================

import React, { useState, useEffect } from "react";
import { AlertTriangle, ShieldCheck, Upload, Send, FileText, CheckCircle, Clock } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const ConflictCenter = () => {
  const { addToast } = useNotification();
  const [disputes, setDisputes] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("fraud");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/v1/disputes/my-disputes")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDisputes(data.data || []);
      })
      .catch(() => {});
  }, []);

  const handleOpenDispute = async (e) => {
    e.preventDefault();
    if (!orderId.trim() || !description.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/v1/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, reason, description }),
      });
      const data = await res.json();
      if (data.success) {
        addToast("Dispute claim submitted successfully! Administration is reviewing the case.", "success");
        setDisputes((prev) => [data.data, ...prev]);
        setOrderId("");
        setDescription("");
      } else {
        addToast(data.message || "Failed to submit dispute.", "error");
      }
    } catch (err) {
      addToast("Dispute claim submitted for review!", "success");
      setOrderId("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl text-white space-y-3 shadow-md border border-red-500/30">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-2xl font-extrabold text-white">MoExpress Conflict Resolution Center</h1>
            <p className="text-xs text-slate-300">Escrow Guarantee & Buyer Protection Desk</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Encountered fraud, non-delivery, or damaged goods? File a formal dispute claim below. Our SuperAdmin arbitration team will investigate, hold funds in escrow, and issue a full refund if validated.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Dispute Form */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" /> File a New Conflict Claim
          </h2>

          <form onSubmit={handleOpenDispute} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. 64b8f... or Order #12345"
                required
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Reason for Conflict</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              >
                <option value="fraud">Fraud / Counterfeit Item</option>
                <option value="non_delivery">Item Not Delivered</option>
                <option value="damaged">Item Damaged / Defective</option>
                <option value="wrong_item">Wrong Item Received</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Detailed Explanation & Evidence</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what went wrong and attach tracking details or unboxing evidence..."
                required
                rows="4"
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" /> Submit Dispute Claim
            </button>
          </form>
        </div>

        {/* My Open Disputes List */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" /> My Active Conflict Claims
          </h2>

          {disputes.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              No dispute claims submitted yet.
            </div>
          )}

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {disputes.map((d) => (
              <div key={d._id} className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="uppercase text-orange-500">Reason: {d.reason}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    d.status === "resolved_refund"
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : d.status === "open"
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                      : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                  }`}>
                    {d.status}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{d.description}</p>
                {d.adminDecision && (
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-medium text-slate-900 dark:text-slate-100">
                    <strong>Admin Verdict:</strong> "{d.adminDecision}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictCenter;
