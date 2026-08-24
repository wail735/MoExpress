// ============================================================================
// PAGE : LiveStreamShopping.jsx
// ROLE : Taobao / TikTok Style Real-Time Live Stream Shopping Hub (/live-stream)
// ============================================================================

import React from "react";
import { Video, Heart, ShoppingBag, Eye, MessageSquare } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

export const LiveStreamShopping = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md animate-pulse">
          <Video className="w-4 h-4" /> Live Broadcast Active
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Live Stream Shopping Studio</h1>
        <p className="text-xs text-gray-500">Watch sellers demonstrate products live, ask questions in real-time chat, and buy instantly</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 aspect-video bg-gray-900 rounded-3xl overflow-hidden relative shadow-xl">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" alt="Live Stream" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
              ● LIVE (2,450 Viewers)
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-3xl border space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-orange-500 uppercase">Featured Product</span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">Sony WH-1000XM5 Wireless Headphones</h3>
              <span className="text-xl font-black text-orange-500 block">{formatPrice(199.99)}</span>
            </div>

            <button
              onClick={() => addToCart({ _id: "fd_1", name: "Sony WH-1000XM5", price: 199.99 }, 1)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-2xl shadow-lg text-xs flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-4 h-4" /> Buy Live Special Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamShopping;
