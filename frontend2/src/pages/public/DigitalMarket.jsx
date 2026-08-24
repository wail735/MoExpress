// ============================================================================
// PAGE : DigitalMarket.jsx
// ROLE : Digital Products & Software Marketplace Hub (/digital-market)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Zap, Key, Code, BookOpen, Layers, Star, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export const DigitalMarket = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToast } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const digitalItems = [
    {
      _id: "dig_1",
      name: "SaaS Starter Kit Node.js & React Dashboard",
      category: "software",
      type: "Source Code ZIP",
      price: 39.99,
      originalPrice: 79.99,
      sales: 420,
      rating: 4.9,
      developer: "DevStudio Pro",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    },
    {
      _id: "dig_2",
      name: "Lightroom Mobile & Desktop Preset Bundle (50 Presets)",
      category: "presets",
      type: "XMP & DNG File",
      price: 14.99,
      originalPrice: 29.99,
      sales: 1280,
      rating: 4.95,
      developer: "CinemaTones",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80",
    },
    {
      _id: "dig_3",
      name: "Complete E-Commerce Marketing Mastery Guide",
      category: "ebooks",
      type: "PDF E-Book (240 Pages)",
      price: 19.99,
      originalPrice: 39.99,
      sales: 850,
      rating: 4.8,
      developer: "MoExpress Academy",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
    },
    {
      _id: "dig_4",
      name: "3D Futuristic Cyberpunk Assets & Textures Pack",
      category: "3d",
      type: "OBJ / FBX Asset Pack",
      price: 29.99,
      originalPrice: 59.99,
      sales: 310,
      rating: 4.88,
      developer: "PolyRender",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
    },
  ];

  const categories = [
    { id: "all", name: "All Digital Goods" },
    { id: "software", name: "Software & Source Code" },
    { id: "presets", name: "Presets & LUTs" },
    { id: "ebooks", name: "E-Books & Guides" },
    { id: "3d", name: "3D Assets & Models" },
  ];

  const filteredItems = selectedCategory === "all"
    ? digitalItems
    : digitalItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Sleek Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Instant Digital Delivery Guarantee
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Digital Products Marketplace</h1>
          <p className="text-xs text-slate-300">Software licenses, UI kits, e-books, presets, and 3D assets with automated download delivery</p>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 text-center flex items-center gap-3 text-xs">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div className="text-left">
            <span className="font-bold text-white block">Instant Key Reveal</span>
            <span className="text-[10px] text-slate-400">Download link sent immediately post-payment</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition border ${
              selectedCategory === cat.id
                ? "bg-orange-500 text-white border-brand-orange font-bold shadow-sm"
                : "bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:border-orange-500"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Digital Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group">
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <span className="absolute top-2 left-2 bg-emerald-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                <Download className="w-3 h-3" /> Instant File
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">{item.type}</span>
                <Link to={`/digital-product/${item._id}`} className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 hover:text-orange-500 transition">
                  {item.name}
                </Link>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-0.5 text-amber-400 font-bold"><Star className="w-3.5 h-3.5 fill-current" /> {item.rating}</span>
                <span>{item.sales} Sales</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-base text-orange-500">{formatPrice(item.price)}</span>
                  <span className="text-[10px] text-slate-400 line-through">{formatPrice(item.originalPrice)}</span>
                </div>

                <button
                  onClick={() => {
                    addToCart({ _id: item._id, name: item.name, price: item.price, images: [{ url: item.image }] }, 1);
                    addToast(`Digital product [${item.name}] added to cart! Instant download upon checkout.`, "success");
                  }}
                  className="bg-orange-500 hover:bg-brand-accent text-white p-2 rounded-xl transition shadow-sm"
                  title="Add Digital Item to Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalMarket;
