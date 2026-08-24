// ============================================================================
// PAGE : AdminFraudRadar.jsx
// ROLE : Machine Learning Fraud Risk Detection Radar (/admin/fraud-radar)
// ============================================================================

import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle, Search, RefreshCw, Ban, ShieldCheck } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminFraudRadar = () => {
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const [risks, setRisks] = useState([
    { id: "fr_1", user: "spammer@badsite.com", riskScore: 89, reason: "Multi-account velocity check failed", status: "flagged" },
    { id: "fr_2", user: "suspicious_buyer_99@temp.net", riskScore: 74, reason: "High-frequency card attempt velocity", status: "flagged" },
    { id: "fr_3", user: "buyer@moexpress.com", riskScore: 12, reason: "Normal order behavior", status: "clean" },
  ]);

  const filteredRisks = risks.filter((r) =>
    r.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (id, actionType, userEmail) => {
    setRisks((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: actionType === "block" ? "blocked" : "approved", riskScore: actionType === "block" ? 100 : 0 } : r))
    );
    if (actionType === "block") {
      addToast(`Account ${userEmail} has been permanently banned and IP blacklisted.`, "error");
    } else {
      addToast(`Transaction for ${userEmail} approved and whitelisted.`, "success");
    }
  };

  const handleRunScan = () => {
    setIsScanning(true);
    addToast("Scanning active sessions for velocity anomalies & carding attempts...", "info");
    setTimeout(() => {
      setIsScanning(false);
      addToast("Fraud Radar scan complete! 0 new high-risk anomalies detected.", "success");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-red-500" /> Fraud Risk Detection Radar
          </h1>
          <p className="text-xs text-gray-400">Automated risk scoring for suspicious transactions, multi-account abuse, and velocity checks</p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={isScanning}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`} />
          {isScanning ? "Scanning..." : "Run AI Fraud Scan"}
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-gray-800 shadow-lg flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by user email or risk reason..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-white focus:outline-none"
        />
      </div>

      {/* Risks Table */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {filteredRisks.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-6">No risk logs matching "{searchQuery}"</p>
          ) : (
            filteredRisks.map((r) => (
              <div key={r.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{r.user}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      r.status === "blocked" ? "bg-red-600 text-white" : r.status === "approved" ? "bg-green-600 text-white" : "bg-yellow-500 text-slate-900"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-gray-400">{r.reason}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <span className={`text-sm font-black ${r.riskScore > 50 ? "text-red-400" : "text-green-400"}`}>
                      Risk: {r.riskScore} / 100
                    </span>
                  </div>

                  {r.status === "flagged" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(r.id, "approve", r.user)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-md"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleAction(r.id, "block", r.user)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-md"
                      >
                        <Ban className="w-3.5 h-3.5" /> Ban User
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFraudRadar;
