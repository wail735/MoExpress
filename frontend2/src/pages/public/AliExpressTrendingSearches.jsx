// ============================================================================
// PAGE : AliExpressTrendingSearches.jsx
// ROLE : Live Trending Search Keywords & Viral Products Showcase (/trending-now)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Sparkles, Search, ArrowRight, Flame } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const AliExpressTrendingSearches = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [activeTrend, setActiveTrend] = useState("Wireless Headphones");
  const [searchQuery, setSearchQuery] = useState("");

  const trends = [
    { name: "Wireless Headphones", searches: "+480%", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    { name: "Smart Watch Series 9", searches: "+320%", price: 279.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" },
    { name: "Air Max Running Shoes", searches: "+210%", price: 110.0, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
    { name: "3D Printer Filament", searches: "+190%", price: 24.5, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80" },
  ];

  const handleTrendClick = (trendName) => {
    setActiveTrend(trendName);
    navigate(`/products?search=${encodeURIComponent(trendName)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-1.5">
        <span className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-md">
          <TrendingUp className="w-3.5 h-3.5" /> Viral Trends
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Trending Searches Right Now</h1>
        <p className="text-xs text-slate-500">Live search keywords gaining viral popularity across the marketplace</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search any trending keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
          Search
        </button>
      </form>

      {/* Trend Keyword Chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {trends.map((t, idx) => (
          <button
            key={idx}
            onClick={() => handleTrendClick(t.name)}
            className={`border text-xs font-bold px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition ${
              activeTrend === t.name
                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-500"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" /> {t.name}
            <span className="text-[10px] opacity-80">({t.searches})</span>
          </button>
        ))}
      </div>

      {/* Trending Product Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trends.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleTrendClick(item.name)}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 hover:border-purple-500 transition cursor-pointer"
          >
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.name}</h4>
              <span className="text-[10px] text-purple-400 font-bold block">Trending {item.searches}</span>
              <span className="text-xs font-black text-orange-500">{formatPrice(item.price)}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AliExpressTrendingSearches;
