// ============================================================================
// PAGE : FlashDeals.jsx
// ROLE : Flash Sale Countdown Hub with Stock Gauges & Ticking Timers (/flash-deals)
// ============================================================================

import React, { useState, useEffect } from "react";
import { Zap, Clock, ShoppingBag, Flame, Award, ShieldCheck } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export const FlashDeals = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashItems = [
    {
      _id: "fd_1",
      name: "Sony WH-1000XM5 Noise Canceling Headphones",
      price: 199.99,
      originalPrice: 399.99,
      discount: "50% OFF",
      sold: 84,
      totalStock: 100,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
      _id: "fd_2",
      name: "Apple Watch Series 9 GPS + Cellular",
      price: 279.99,
      originalPrice: 499.99,
      discount: "44% OFF",
      sold: 92,
      totalStock: 100,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    },
    {
      _id: "fd_3",
      name: "Nike Air Max 270 Special Edition",
      price: 89.99,
      originalPrice: 169.99,
      discount: "47% OFF",
      sold: 65,
      totalStock: 100,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Flash Sale Ticker */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left z-10">
          <span className="bg-slate-900 text-yellow-300 text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1 w-fit mx-auto md:mx-0">
            <Flame className="w-4 h-4 fill-current text-red-500" /> Limited Time Event
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">MoExpress Mega Flash Deals</h1>
          <p className="text-xs sm:text-sm text-yellow-100 font-medium">Up to 70% OFF on Electronics, Fashion & Pro Boutique Goods</p>
        </div>

        {/* Live Timer Gauge */}
        <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-yellow-400/30 flex items-center gap-4 text-center z-10 shadow-2xl">
          <Clock className="w-8 h-8 text-orange-500 animate-bounce" />
          <div className="flex gap-2 text-white font-mono font-black text-xl sm:text-2xl">
            <div className="bg-gray-800 px-3 py-2 rounded-xl"><span>{String(timeLeft.hours).padStart(2, "0")}</span><span className="block text-[9px] font-sans text-gray-400 uppercase font-normal">Hrs</span></div>
            <span className="self-center text-orange-500">:</span>
            <div className="bg-gray-800 px-3 py-2 rounded-xl"><span>{String(timeLeft.minutes).padStart(2, "0")}</span><span className="block text-[9px] font-sans text-gray-400 uppercase font-normal">Min</span></div>
            <span className="self-center text-orange-500">:</span>
            <div className="bg-gray-800 px-3 py-2 rounded-xl text-orange-500"><span>{String(timeLeft.seconds).padStart(2, "0")}</span><span className="block text-[9px] font-sans text-gray-400 uppercase font-normal">Sec</span></div>
          </div>
        </div>
      </div>

      {/* Flash Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flashItems.map((item) => {
          const percentageSold = Math.round((item.sold / item.totalStock) * 100);
          return (
            <div key={item._id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg">
                  {item.discount}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{item.name}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="font-black text-xl text-orange-500">{formatPrice(item.price)}</span>
                  <span className="text-xs text-gray-400 line-through font-semibold">{formatPrice(item.originalPrice)}</span>
                </div>

                {/* Stock Gauge Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Sold: {item.sold} items</span>
                    <span className="text-orange-500">{percentageSold}% Claimed</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-orange to-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentageSold}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart({ _id: item._id, name: item.name, price: item.price, images: [{ url: item.image }] }, 1);
                    addToast("Claimed Flash Deal added to Cart!", "success");
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-2xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-xs"
                >
                  <ShoppingBag className="w-4 h-4" /> Claim Flash Deal Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashDeals;
