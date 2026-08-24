// ============================================================================
// COMPONENT : RecentlyViewed.jsx
// ROLE : Sticky Bottom Bar Displaying Recently Viewed Products
// ============================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, X } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const RecentlyViewed = () => {
  const { formatPrice } = useCurrency();
  const [visible, setVisible] = useState(true);

  const recentItems = [
    { id: "fd_1", name: "Sony WH-1000XM5", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { id: "fd_2", name: "Apple Watch Series 9", price: 279.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
  ];

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl animate-fadeIn">
      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
        <Eye className="w-4 h-4 text-orange-500" />
        <span>Recent:</span>
      </div>

      <div className="flex items-center gap-2">
        {recentItems.map((item) => (
          <Link key={item.id} to={`/products/${item.id}`} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl hover:border hover:border-orange-500 transition">
            <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
            <div className="text-[10px]">
              <p className="font-bold text-slate-900 dark:text-white truncate max-w-[100px]">{item.name}</p>
              <span className="text-orange-500 font-black">{formatPrice(item.price)}</span>
            </div>
          </Link>
        ))}
      </div>

      <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default RecentlyViewed;
