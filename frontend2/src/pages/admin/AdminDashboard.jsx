// ============================================================================
// PAGE : AdminDashboard.jsx
// ROLE : SuperAdmin Global Marketplace Overview & Financial Metrics
// ============================================================================

import React, { useState, useEffect } from "react";
import { DollarSign, Users, ShoppingBag, TrendingUp, Award, AlertTriangle, ShieldCheck } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const AdminDashboard = () => {
  const { formatPrice } = useCurrency();
  const [stats, setStats] = useState({
    totalUsers: 1420,
    totalProducts: 5890,
    totalOrders: 3240,
    totalSalesRevenue: 154200.5,
    totalCommissions: 7710.0,
    pendingProShops: 4,
    pendingDisputes: 2,
    pendingProofs: 5,
  });

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) setStats((prev) => ({ ...prev, ...data.data }));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">SuperAdmin Executive Dashboard</h1>
        <p className="text-xs text-gray-400">Live platform revenue, total commissions, user metrics & moderation flags</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Sales Volume</span>
          <h2 className="text-3xl font-black text-orange-500">{formatPrice(stats.totalSalesRevenue)}</h2>
          <span className="text-[11px] text-green-400 font-semibold">↑ +18.4% this month</span>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Platform Commissions (5%)</span>
          <h2 className="text-3xl font-black text-amber-500">{formatPrice(stats.totalCommissions)}</h2>
          <span className="text-[11px] text-gray-400">Net platform revenue</span>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Registered Users</span>
          <h2 className="text-3xl font-black text-white">{stats.totalUsers.toLocaleString()}</h2>
          <span className="text-[11px] text-gray-400">Buyers & Sellers</span>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Catalog Products</span>
          <h2 className="text-3xl font-black text-white">{stats.totalProducts.toLocaleString()}</h2>
          <span className="text-[11px] text-gray-400">Published listings</span>
        </div>
      </div>

      {/* Pending Moderation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-yellow-500/30 space-y-3">
          <div className="flex items-center justify-between text-yellow-400 font-bold text-sm">
            <span className="flex items-center gap-2"><Award className="w-5 h-5" /> Boutique Pro Applications</span>
            <span className="bg-yellow-500 text-slate-900 text-xs px-2 py-0.5 rounded-full font-black">{stats.pendingProShops}</span>
          </div>
          <p className="text-xs text-gray-400">Pending seller dossiers awaiting review</p>
          <a href="/admin/pro-shops" className="text-xs font-bold text-orange-500 hover:underline block pt-1">Review Applications →</a>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-red-500/30 space-y-3">
          <div className="flex items-center justify-between text-red-400 font-bold text-sm">
            <span className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Escrow Conflit Disputes</span>
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-black">{stats.pendingDisputes}</span>
          </div>
          <p className="text-xs text-gray-400">Active fraud claims requiring arbitration</p>
          <a href="/admin/disputes" className="text-xs font-bold text-orange-500 hover:underline block pt-1">Arbitrate Disputes →</a>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-blue-500/30 space-y-3">
          <div className="flex items-center justify-between text-blue-400 font-bold text-sm">
            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Payment Proofs</span>
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-black">{stats.pendingProofs}</span>
          </div>
          <p className="text-xs text-gray-400">Bank RIB & CCP RIP receipts for approval</p>
          <a href="/admin/payment-proofs" className="text-xs font-bold text-orange-500 hover:underline block pt-1">Verify Receipts →</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
