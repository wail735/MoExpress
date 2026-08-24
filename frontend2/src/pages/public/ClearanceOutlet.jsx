// ============================================================================
// PAGE : ClearanceOutlet.jsx
// ROLE : Overstock Clearance Sale Outlet with 80% Discounts (/clearance)
// ============================================================================

import React from "react";
import { Flame, ShoppingBag } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

export const ClearanceOutlet = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const items = [
    { _id: "cl_1", name: "Premium Leather Headphones Stand", price: 14.99, original: 49.99, discount: "70% OFF", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
    { _id: "cl_2", name: "Ultra-Fast Braided USB-C Cable 2m", price: 4.99, original: 19.99, discount: "75% OFF", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Flame className="w-4 h-4" /> Liquidation Outlet
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Overstock Clearance Sale</h1>
        <p className="text-xs text-gray-500">Up to 80% OFF on last-season inventory, overstock goods, and end-of-line items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((i) => (
          <div key={i._id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">{i.discount}</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{i.name}</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-lg text-orange-500">{formatPrice(i.price)}</span>
              <span className="text-xs text-gray-400 line-through">{formatPrice(i.original)}</span>
            </div>
            <button
              onClick={() => addToCart(i, 1)}
              className="w-full bg-orange-500 hover:bg-brand-accent text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1 text-xs"
            >
              <ShoppingBag className="w-4 h-4" /> Buy Clearance Deal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClearanceOutlet;
