// ============================================================================
// PAGE : AliExpressTopRankings.jsx
// ROLE : AliExpress Real-Time Bestseller Leaderboards & Category Rankings (/top-rankings)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { Trophy, Star, TrendingUp, ShoppingBag, Check } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export const AliExpressTopRankings = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedItems, setAddedItems] = useState([]);

  const rankings = [
    { rank: 1, id: "r1", name: "Sony WH-1000XM5 Wireless Headphones", category: "audio", sales: "14,800+ Sold", rating: 4.9, price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    { rank: 2, id: "r2", name: "Apple Watch Series 9 GPS", category: "wearables", sales: "9,400+ Sold", rating: 4.95, price: 279.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" },
    { rank: 3, id: "r3", name: "Nike Air Max 270 React Running Shoes", category: "footwear", sales: "7,800+ Sold", rating: 4.8, price: 110.0, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
  ];

  const filteredRankings = rankings.filter(
    (r) => selectedCategory === "all" || r.category === selectedCategory
  );

  const handleAddToCart = (item) => {
    addToCart({ _id: item.id, title: item.name, price: item.price, image: item.image }, 1);
    setAddedItems((prev) => [...prev, item.id]);
    addToast(`Added #${item.rank} Bestseller "${item.name}" to cart!`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-1.5">
        <span className="bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-md">
          <Trophy className="w-3.5 h-3.5" /> Bestseller Leaderboard
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Top Ranked Marketplace Products</h1>
        <p className="text-xs text-slate-500">Real-time top sales volume, buyer reviews, and category rankings</p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2">
        {["all", "audio", "wearables", "footwear"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition ${
              selectedCategory === cat
                ? "bg-orange-500 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Leaderboard Grid */}
      <div className="space-y-3">
        {filteredRankings.map((r) => {
          const isAdded = addedItems.includes(r.id);
          return (
            <div key={r.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white ${
                r.rank === 1 ? "bg-amber-500" : r.rank === 2 ? "bg-slate-400" : "bg-amber-700"
              }`}>
                #{r.rank}
              </div>
              <img src={r.image} alt={r.name} className="w-16 h-16 object-cover rounded-xl border" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{r.name}</h4>
                <span className="text-[10px] text-slate-400 block">{r.sales} • ★ {r.rating}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-black text-orange-500 text-sm">{formatPrice(r.price)}</span>
                <button
                  onClick={() => handleAddToCart(r)}
                  className={`p-2 rounded-xl transition ${
                    isAdded ? "bg-green-600 text-white" : "bg-orange-500 text-white hover:bg-brand-accent shadow-md"
                  }`}
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AliExpressTopRankings;
