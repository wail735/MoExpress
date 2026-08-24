// ============================================================================
// PAGE : SellerStaffManager.jsx
// ROLE : Multi-User Sub-Account Permissions Manager (/seller/staff)
// ============================================================================

import React, { useState } from "react";
import { Users, Plus, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerStaffManager = () => {
  const { addToast } = useNotification();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("support");

  const [staff, setStaff] = useState([
    { id: "st_1", name: "Amine Agent", email: "amine@moexpress.com", role: "Customer Support Agent" },
  ]);

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStaff((prev) => [...prev, { id: "st_" + Date.now(), name: email.split("@")[0], email, role }]);
    addToast(`Staff invitation sent to ${email}!`, "success");
    setEmail("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-8 h-8 text-orange-500" /> Store Staff & Sub-Accounts
        </h1>
        <p className="text-xs text-gray-500">Invite team members to manage inventory, fulfill orders, or answer customer chats</p>
      </div>

      <form onSubmit={handleAddStaff} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> Invite Staff Member
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold block mb-1">Staff Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@store.com"
              required
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Access Role Permission</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none"
            >
              <option value="Customer Support Agent">Customer Support Agent</option>
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="Fulfillment Specialist">Fulfillment Specialist</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Send Staff Invite
        </button>
      </form>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Active Store Staff</h3>
        {staff.map((s) => (
          <div key={s.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{s.name} ({s.email})</p>
              <span className="text-orange-500 font-semibold">{s.role}</span>
            </div>
            <button onClick={() => setStaff((prev) => prev.filter((item) => item.id !== s.id))} className="text-red-400 hover:text-red-300">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerStaffManager;
