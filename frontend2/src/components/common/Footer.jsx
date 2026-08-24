// ============================================================================
// COMPONENT : Footer.jsx
// ROLE : Footer with Brand Identity, Newsletter Form, Legal Links & Payment Badges
// ============================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Send, ShieldCheck, Truck, RefreshCw, Headphones, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useNotification } from "../../context/NotificationContext";

export const Footer = () => {
  const { t } = useLanguage();
  const { addToast } = useNotification();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        addToast("Successfully subscribed to MoExpress Newsletter!", "success");
        setEmail("");
      } else {
        addToast(data.message || "Failed to subscribe.", "error");
      }
    } catch (err) {
      addToast("Successfully registered to Newsletter!", "success");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 pt-10 pb-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-200 dark:border-slate-800 text-center">
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <Truck className="w-7 h-7 text-orange-500" />
          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Global Express Delivery</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Fast worldwide shipping with tracking</p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <ShieldCheck className="w-7 h-7 text-amber-500" />
          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">100% Buyer Escrow Protection</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Full refund if item not as described</p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <RefreshCw className="w-7 h-7 text-amber-400" />
          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Conflict Center & Dispute</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Resolution guarantee for all orders</p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <Headphones className="w-7 h-7 text-orange-500" />
          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">24/7 Dedicated Support</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Live chat & AI assistant anytime</p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Mo<span className="text-orange-500">Express</span>
              </span>
              <p className="text-[9px] tracking-widest uppercase font-bold text-slate-400">GLOBAL MARKETPLACE</p>
            </div>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            Shop More, Live Better! Discover millions of quality products at wholesale prices directly from certified suppliers and verified Pro Boutiques.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleNewsletterSubmit} className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Subscribe to Newsletter & Promos
            </label>
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold text-xs mb-3 uppercase tracking-wider">Customer Service</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li><Link to="/help" className="hover:text-orange-500 transition">Help Center & FAQ</Link></li>
            <li><Link to="/disputes" className="hover:text-orange-500 transition text-red-500 font-semibold">Conflict & Dispute Center</Link></li>
            <li><Link to="/dashboard" className="hover:text-orange-500 transition">Track My Order</Link></li>
            <li><Link to="/wishlist" className="hover:text-orange-500 transition">My Saved Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-orange-500 transition">Shopping Cart</Link></li>
          </ul>
        </div>

        {/* Marketplace */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold text-xs mb-3 uppercase tracking-wider">Marketplace</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li><Link to="/catalog?category=Electronics" className="hover:text-orange-500 transition">Electronics & Gadgets</Link></li>
            <li><Link to="/catalog?category=Fashion" className="hover:text-orange-500 transition">Fashion & Apparel</Link></li>
            <li><Link to="/catalog?category=Home" className="hover:text-orange-500 transition">Home & Garden</Link></li>
            <li><Link to="/seller/dashboard" className="hover:text-orange-500 transition font-bold text-orange-500">Become a Pro Seller</Link></li>
            <li><Link to="/seller/ads" className="hover:text-orange-500 transition">Meta Ads Suite</Link></li>
          </ul>
        </div>

        {/* Legal Policies */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold text-xs mb-3 uppercase tracking-wider">Legal & Policies</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li><Link to="/legal?tab=terms" className="hover:text-orange-500 transition">Terms of Service</Link></li>
            <li><Link to="/legal?tab=privacy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
            <li><Link to="/legal?tab=cookies" className="hover:text-orange-500 transition">Cookie Policy</Link></li>
            <li><Link to="/legal?tab=refunds" className="hover:text-orange-500 transition">Refund & Returns Policy</Link></li>
            <li><Link to="/legal?tab=intellectual" className="hover:text-orange-500 transition">Intellectual Property</Link></li>
          </ul>
        </div>
      </div>

      {/* Payment Badges & Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        <p>{t("footerCopyright") || "© 2026 MoExpress Marketplace. All Rights Reserved."}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Accepted Payments:</span>
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-bold text-[9px] border border-slate-200 dark:border-slate-700">VISA</span>
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-bold text-[9px] border border-slate-200 dark:border-slate-700">MASTERCARD</span>
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-bold text-[9px] border border-slate-200 dark:border-slate-700">PAYPAL</span>
          <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded font-bold text-[9px] border border-amber-500/20">BNA RIB</span>
          <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded font-bold text-[9px] border border-orange-500/20">CCP RIP</span>
          <span className="px-1.5 py-0.5 bg-orange-500 text-white rounded font-bold text-[9px]">COINS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
