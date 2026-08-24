// ============================================================================
// PAGE : ChoiceSuperDeals.jsx
// ROLE : AliExpress "Choice" 3 Items for €5.99 Bundle Builder (/choice-deals)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { Sparkles, ShoppingBag, Check, Truck, Zap } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const ChoiceSuperDeals = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [selectedItems, setSelectedItems] = useState([]);

  const choiceProducts = [
    { id: "ch_1", name: "Braided Fast Charge USB-C Cable", category: "Tech Accessories", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { id: "ch_2", name: "Silicone Ergonomic Earbud Tips", category: "Audio Accessories", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
    { id: "ch_3", name: "Ultra-Thin Matte Phone Case", category: "Mobiles", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  ];

  const handleSelectItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      if (selectedItems.length >= 3) {
        addToast("Choice Bundle complete! 3 items selected for 5.99 €.", "info");
        return;
      }
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleClaimBundle = () => {
    addToast("AliExpress Choice 3 for 5.99 € Bundle added to Cart with Free Shipping!", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Sleek Choice Header Banner */}
      <div className="bg-gradient-to-r from-red-700 via-rose-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-red-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-300" /> Choice Express Day
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">Pick Any 3 Items for {formatPrice(5.99)}</h1>
          <p className="text-xs text-rose-100">Mix and match any 3 choice items with Free Guaranteed Express Delivery</p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-rose-500/30 text-center min-w-[200px]">
          <span className="text-[11px] text-slate-400 font-medium block">Bundle Progress ({selectedItems.length} / 3)</span>
          <div className="flex justify-center gap-1.5 my-2">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs ${
                selectedItems[idx] ? "bg-orange-500 text-white border-brand-orange" : "bg-slate-800 border-slate-700 text-slate-500"
              }`}>
                {selectedItems[idx] ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
            ))}
          </div>

          <button
            onClick={handleClaimBundle}
            disabled={selectedItems.length < 3}
            className={`w-full py-2 rounded-lg font-bold text-xs transition ${
              selectedItems.length === 3 ? "bg-orange-500 text-white hover:bg-brand-accent shadow-md" : "bg-slate-800 text-slate-500 cursor-default"
            }`}
          >
            Claim 3 for {formatPrice(5.99)}
          </button>
        </div>
      </div>

      {/* Item Selection Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {choiceProducts.map((item) => {
          const isSelected = selectedItems.some((i) => i.id === item.id);
          return (
            <div key={item.id} className={`bg-white dark:bg-slate-900 rounded-2xl border p-4 shadow-sm transition ${
              isSelected ? "border-brand-orange ring-1 ring-brand-orange" : "border-slate-200 dark:border-slate-800"
            } flex items-center justify-between gap-3`}>
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.name}</h4>
                <span className="text-[10px] text-slate-400 block">{item.category}</span>
                <span className="text-xs font-black text-orange-500">Choice Bundle</span>
              </div>
              <button
                onClick={() => handleSelectItem(item)}
                className={`p-2 rounded-xl transition ${
                  isSelected ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceSuperDeals;
