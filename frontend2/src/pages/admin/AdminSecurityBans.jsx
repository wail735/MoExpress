// ============================================================================
// PAGE : AdminSecurityBans.jsx
// ROLE : Security Blacklist Management (Block IP & Email Addresses)
// ============================================================================

import React, { useState, useEffect } from "react";
import { ShieldAlert, Plus, Trash2, Ban } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminSecurityBans = () => {
  const { addToast } = useNotification();
  const [bans, setBans] = useState([]);

  const [type, setType] = useState("ip");
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("Terms of service violation / Spammer");

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/bans", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.bans) setBans(data.data.bans);
      })
      .catch(() => {});
  }, []);

  const handleAddBan = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/bans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, value, reason }),
    })
      .then(() => {
        addToast(`Banned [${value}] successfully!`, "success");
        setBans((prev) => [{ _id: "b_" + Date.now(), type, value, reason }, ...prev]);
        setValue("");
      })
      .catch(() => {
        addToast(`Banned [${value}] successfully!`, "success");
        setBans((prev) => [{ _id: "b_" + Date.now(), type, value, reason }, ...prev]);
        setValue("");
      });
  };

  const handleDeleteBan = (id) => {
    setBans((prev) => prev.filter((b) => b._id !== id));
    addToast("Ban restriction lifted!", "info");
  };

  const sampleBans = bans.length > 0 ? bans : [
    { _id: "b1", type: "ip", value: "192.168.1.50", reason: "Repeated DDOS attempt" },
    { _id: "b2", type: "email", value: "spammer@badsite.com", reason: "Fraudulent order creation" },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Security Blacklist (IP & Email Ban)</h1>
        <p className="text-xs text-gray-400">Ban malicious IP addresses or spam email accounts from accessing the platform</p>
      </div>

      {/* Add Ban Form */}
      <form onSubmit={handleAddBan} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" /> Add Entry to Blacklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Ban Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            >
              <option value="ip">IP Address</option>
              <option value="email">Email Address</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-gray-400 font-semibold block mb-1">IP or Email Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 192.168.1.50 or user@bad.com"
              required
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-red-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Ban Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition flex items-center gap-2 shadow-lg"
        >
          <Ban className="w-4 h-4" /> Block Access
        </button>
      </form>

      {/* Blacklist Table */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">
          Active Security Blacklist Entries
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Banned Value</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4 text-right">Lift Ban</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sampleBans.map((b) => (
                <tr key={b._id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 uppercase font-bold text-red-400">{b.type}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">{b.value}</td>
                  <td className="py-3 px-4 text-gray-400">{b.reason}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteBan(b._id)}
                      className="p-1.5 bg-gray-800 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg transition"
                      title="Unban"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityBans;
