// ============================================================================
// PAGE : AdminLayout.jsx
// ROLE : Dedicated SuperAdmin Panel Layout with Comprehensive Categorized Sidebar
// ============================================================================

import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Globe,
  FileText,
  Mail,
  Megaphone,
  Zap,
  Coins,
  Building,
  FileCheck,
  Award,
  AlertTriangle,
  ShieldAlert,
  ShoppingBag,
  Ticket,
  FolderPlus,
  Activity,
  Bell,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  Database,
  Power,
  Percent,
  Phone,
  Sparkles,
  Calendar,
  Lock,
  Radio,
  Sliders,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navGroups = [
    {
      title: "Overview & Telemetry",
      items: [
        { path: "/admin", label: "Executive Dashboard", icon: LayoutDashboard },
        { path: "/admin/financial", label: "Financial Reports & GMV", icon: TrendingUp },
        { path: "/admin/health", label: "Server Health & Meters", icon: Activity },
        { path: "/admin/heatmaps", label: "Heatmaps & Sessions", icon: Activity },
        { path: "/admin/dispatch", label: "Logistics Dispatch Tower", icon: Radio },
        { path: "/admin/fraud-radar", label: "Fraud Risk Radar", icon: ShieldAlert },
        { path: "/admin/audit-logs", label: "Audit Trail Logs", icon: ShieldCheck },
        { path: "/admin/error-logs", label: "Unhandled Error Logs", icon: AlertTriangle },
        { path: "/admin/users", label: "User Roles & Admins", icon: Users },
      ],
    },
    {
      title: "Subscription Tiers & Gating",
      items: [
        { path: "/admin/tiers", label: "Tier Plans & Pricing Config", icon: Zap },
        { path: "/admin/tier-access", label: "Tier Page Access Matrix", icon: Lock },
        { path: "/admin/subscriptions-cms", label: "VIP Subscriptions Editor", icon: Zap },
      ],
    },
    {
      title: "CMS Content & Quality AI",
      items: [
        { path: "/admin/navbar", label: "Navbar & Slogans", icon: Globe },
        { path: "/admin/footer", label: "Footer & Copyright", icon: FileText },
        { path: "/admin/legal", label: "Legal Policies CMS", icon: FileText },
        { path: "/admin/locales", label: "Translation Keys", icon: Globe },
        { path: "/admin/categories", label: "Category Taxonomy", icon: FolderPlus },
        { path: "/admin/coupons", label: "Coupons & Vouchers", icon: Ticket },
        { path: "/admin/flash-deals", label: "Flash Sale Scheduler", icon: Zap },
        { path: "/admin/ai-moderation", label: "AI Keyword Filter", icon: Sparkles },
        { path: "/admin/inspection", label: "Product Quality Score", icon: Award },
        { path: "/admin/word-cloud", label: "Review Sentiment Cloud", icon: Sparkles },
      ],
    },
    {
      title: "Communications & Security",
      items: [
        { path: "/admin/contact", label: "Contact Form Replies", icon: Mail },
        { path: "/admin/newsletter", label: "Newsletter Marketing", icon: Megaphone },
        { path: "/admin/notifications", label: "Push Broadcaster", icon: Bell },
        { path: "/admin/push", label: "Push Campaign Planner", icon: Calendar },
        { path: "/admin/smtp", label: "SMTP Email Server", icon: Mail },
        { path: "/admin/sms", label: "SMS Gateway OTP", icon: Phone },
        { path: "/admin/chat-moderation", label: "Chat Room Inspector", icon: MessageSquare },
        { path: "/admin/gdpr", label: "GDPR Data Desk", icon: ShieldCheck },
        { path: "/admin/ssl", label: "SSL & Security Monitor", icon: Lock },
        { path: "/admin/ddos", label: "Rate Limit DDoS Shield", icon: ShieldAlert },
      ],
    },
    {
      title: "Financials, Payouts & Domains",
      items: [
        { path: "/admin/escrow", label: "14-Day Escrow Release", icon: ShieldCheck },
        { path: "/admin/payout-schedules", label: "Automated Payout Schedule", icon: Calendar },
        { path: "/admin/dispute-rules", label: "Dispute Auto-Rules", icon: Sliders },
        { path: "/admin/commission", label: "Commission Fee Matrix", icon: Percent },
        { path: "/admin/affiliate", label: "Multi-Tier Referral Rates", icon: Users },
        { path: "/admin/tax", label: "VAT & PDF Invoices", icon: FileText },
        { path: "/admin/custom-domains", label: "Pro CNAME Domains", icon: Globe },
        { path: "/admin/exchange-sync", label: "Exchange API Syncer", icon: TrendingUp },
        { path: "/admin/warehouses", label: "Fulfillment Warehouses", icon: Building },
        { path: "/admin/coin-packs", label: "Coin Packs & Rates", icon: Coins },
        { path: "/admin/bank-details", label: "Bank RIB & CCP Details", icon: Building },
        { path: "/admin/settings", label: "Platform Limits & Rates", icon: Settings },
      ],
    },
    {
      title: "Integrations & Maintenance",
      items: [
        { path: "/admin/geolocation", label: "IP Geolocation Rules", icon: Globe },
        { path: "/admin/multi-tenant", label: "Multi-Tenant Sharding", icon: Building },
        { path: "/admin/webhooks", label: "API Webhooks & Logistics", icon: Globe },
        { path: "/admin/backups", label: "Database Backups", icon: Database },
        { path: "/admin/maintenance", label: "Maintenance Mode", icon: Power },
        { path: "/admin/payments", label: "Payment Proof Receipts", icon: FileCheck },
        { path: "/admin/pro-shops", label: "Boutique Pro Dossiers", icon: Award },
        { path: "/admin/supplier-cert", label: "Supplier Accreditation", icon: ShieldCheck },
        { path: "/admin/ads", label: "Ads Moderation", icon: Megaphone },
        { path: "/admin/disputes", label: "Conflict Arbitration", icon: AlertTriangle },
        { path: "/admin/security", label: "Security Blacklist", icon: ShieldAlert },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between space-y-6 flex-shrink-0">
        <div className="space-y-5">
          {/* Logo & Theme Toggle */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-orange-500 rounded-lg flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">MoExpress</span>
                <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-red-500/20 ml-1">
                  SuperAdmin
                </span>
              </div>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-500 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {navGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-2.5">
                  {group.title}
                </span>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition text-xs font-medium ${
                        isActive
                          ? "bg-orange-500 text-white font-bold shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500"
                      }`}
                    >
                      <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom User Info & Exit */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs">
            <p className="font-bold text-slate-900 dark:text-white truncate">{user?.name || "SuperAdmin"}</p>
            <p className="text-slate-500 text-[10px] truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full text-left flex items-center gap-2 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 py-1 font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Exit SuperAdmin
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
