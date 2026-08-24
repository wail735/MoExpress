// ============================================================================
// PAGE : SuperValueDeals.jsx
// ROLE : AliExpress Super Value Deals Catalog Under €1.99 (/super-value)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React from "react";
import { Flame, ShoppingBag, Truck } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

export const SuperValueDeals = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const superValueItems = [
    { _id: "sv_1", name: "Cable Organizer Cord Clips (6 Pack)", price: 0.99, original: 4.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { _id: "sv_2", name: "Microfiber Screen Cleaning Cloth", price: 1.49, original: 6.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-1.5">
        <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" /> Under {formatPrice(1.99)}
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Super Value Dollar Deals</h1>
        <p className="text-xs text-slate-500">Everyday essentials and accessories under €1.99 with free combined shipping</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {superValueItems.map((item) => (
          <div key={item._id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-xl border" />
            <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-lg text-orange-500">{formatPrice(item.price)}</span>
              <span className="text-[10px] text-slate-400 line-through">{formatPrice(item.original)}</span>
            </div>
            <button
              onClick={() => addToCart(item, 1)}
              className="w-full bg-orange-500 hover:bg-brand-accent text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add for {formatPrice(item.price)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperValueDeals;
