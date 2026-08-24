// ============================================================================
// PAGE : InfluencerHub.jsx
// ROLE : Social Video Feed & Unboxing Shop inspired by Instagram / TikTok (/influencers)
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";
import { Video, Heart, ShoppingBag, Star, Share2 } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

export const InfluencerHub = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const posts = [
    {
      id: "p1",
      creator: "Sarah Tech Reviews",
      handle: "@sarah_tech",
      videoThumb: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      caption: "Unboxing the Sony WH-1000XM5 from MoStore Official! The noise canceling is unreal 🔥 #MoExpress",
      product: { _id: "fd_1", name: "Sony WH-1000XM5", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
      likes: "14.2K",
    },
    {
      id: "p2",
      creator: "Karim Fitness",
      handle: "@karim_fit",
      videoThumb: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      caption: "Testing the Nike Air Max 270 on a 10km run. Best sneakers on MoExpress Marketplace! 🏃‍♂️",
      product: { _id: "fd_3", name: "Nike Air Max 270", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
      likes: "8.9K",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Video className="w-4 h-4" /> Social Shopping Feed
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Influencer Unboxings & Clips</h1>
        <p className="text-xs text-gray-500">Watch real creator video reviews and buy featured products with 1-click</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl space-y-4 p-5 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {post.creator[0]}
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">{post.creator}</h3>
                <span className="text-[10px] text-orange-500 font-semibold">{post.handle}</span>
              </div>
            </div>

            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group">
              <img src={post.videoThumb} alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Video className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{post.caption}</p>

            {/* Tagged Product Box */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border flex items-center justify-between gap-3">
              <img src={post.product.image} alt={post.product.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{post.product.name}</h4>
                <span className="font-black text-orange-500 text-xs">{formatPrice(post.product.price)}</span>
              </div>
              <button
                onClick={() => addToCart(post.product, 1)}
                className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerHub;
