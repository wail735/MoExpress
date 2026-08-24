// ============================================================================
// COMPONENT : InstantSearchModal.jsx
// ROLE : Global Ctrl+K Spotlight Search Modal with Live Auto-Suggestions
// ============================================================================

import React, { useState, useEffect } from "react";
import { Search, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";

export const InstantSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-orange-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, or Pro Boutiques (Press Esc to exit)..."
              autoFocus
              className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none"
            />
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px]">Instant Suggestions</span>
          <div className="space-y-2">
            <Link to="/products/fd_1" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl hover:border hover:border-orange-500 transition">
              <span className="font-bold text-slate-900 dark:text-white">Sony WH-1000XM5 Wireless Headphones</span>
              <span className="font-black text-orange-500">{formatPrice(199.99)}</span>
            </Link>
            <Link to="/products/fd_2" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl hover:border hover:border-orange-500 transition">
              <span className="font-bold text-slate-900 dark:text-white">Apple Watch Series 9 GPS</span>
              <span className="font-black text-orange-500">{formatPrice(279.99)}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantSearchModal;
