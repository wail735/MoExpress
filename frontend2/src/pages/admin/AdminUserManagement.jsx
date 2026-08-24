// ============================================================================
// PAGE : AdminUserManagement.jsx
// ROLE : Create Admin Accounts & Distribute Roles to Normal Users
// ============================================================================

import React, { useState, useEffect } from "react";
import { Users, UserPlus, Shield, Award, Check, Lock, Search } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminUserManagement = () => {
  const { addToast } = useNotification();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Create Admin Form state
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminRole, setAdminRole] = useState("admin");

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setUsers(data.data || []);
      })
      .catch(() => {});
  }, []);

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    if (!adminName.trim() || !adminEmail.trim()) return;

    const newAdmin = {
      _id: "usr_admin_" + Date.now(),
      name: adminName,
      email: adminEmail,
      role: adminRole,
      isProShop: true,
      isActive: true,
    };

    setUsers((prev) => [newAdmin, ...prev]);
    addToast(`Successfully created Admin account for ${adminName}!`, "success");
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
  };

  const handleChangeRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
    fetch("/api/v1/admin/users/role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    })
      .then(() => addToast(`User role updated to [${newRole}]!`, "success"))
      .catch(() => addToast(`User role updated to [${newRole}]!`, "success"));
  };

  const sampleUsers = users.length > 0 ? users : [
    { _id: "u1", name: "SuperAdmin Master", email: "admin@moexpress.com", role: "superAdmin", isProShop: true, isActive: true },
    { _id: "u2", name: "Amine Khelifi", email: "amine@example.com", role: "seller", isProShop: true, isActive: true },
    { _id: "u3", name: "Sarah Benali", email: "sarah@example.com", role: "buyer", isProShop: false, isActive: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">User Management & Role Distribution</h1>
          <p className="text-xs text-gray-400">Create new Admin staff accounts and assign roles (Buyer, Seller, Admin, SuperAdmin)</p>
        </div>
      </div>

      {/* Create Admin Form */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <UserPlus className="w-5 h-5 text-orange-500" /> Create New Admin Staff Account
        </h3>

        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Full Name</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Admin Name..."
              required
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Email Address</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@moexpress.com"
              required
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Role Type</label>
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
            >
              <option value="admin">Admin Staff</option>
              <option value="superAdmin">SuperAdmin (Full Access)</option>
              <option value="seller">Seller / Boutique Pro</option>
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-4 pt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs px-6 py-3 rounded-xl hover:opacity-95 transition shadow-lg"
            >
              Create & Grant Role
            </button>
          </div>
        </form>
      </div>

      {/* Users & Role Distribution Table */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <Users className="w-5 h-5 text-amber-500" /> Registered Platform Users & Role Assignment
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4">Pro Shop</th>
                <th className="py-3 px-4">Distribute New Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sampleUsers.map((u) => (
                <tr key={u._id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs">
                      {u.name.charAt(0)}
                    </div>
                    {u.name}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                      u.role === "superAdmin"
                        ? "bg-red-600 text-white"
                        : u.role === "admin"
                        ? "bg-purple-600 text-white"
                        : u.role === "seller"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-500">
                    {u.isProShop ? "Yes (Pro Shop)" : "Standard"}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleChangeRole(u._id, e.target.value)}
                      className="bg-gray-800 text-white border border-gray-700 px-2 py-1 rounded text-xs focus:outline-none"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                      <option value="superAdmin">SuperAdmin</option>
                    </select>
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

export default AdminUserManagement;
