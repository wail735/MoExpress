// ============================================================================
// PAGE : DigitalProductDetail.jsx
// ROLE : Digital Product Detail Page & License Key Reveal Preview (/digital-product/:id)
// SCALE : 1.0 Sleek Proportions & Calmer Palette
// ============================================================================

import React, { useState } from "react";
import { useParams } from "react"
import { Download, Key, ShieldCheck, Star, ShoppingBag, CheckCircle, FileText, Lock } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export const DigitalProductDetail = () => {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToast } = useNotification();
  const [purchased, setPurchased] = useState(false);

  const product = {
    _id: id || "dig_1",
    name: "SaaS Starter Kit Node.js & React Dashboard",
    price: 39.99,
    originalPrice: 79.99,
    developer: "DevStudio Pro",
    rating: 4.9,
    sales: 420,
    licenseKey: "MOEX-DIGITAL-KEY-8877-2026-X99",
    downloadSize: "48.5 MB ZIP Archive",
    description: "Complete production-ready Node.js, Express, MongoDB, and React dashboard template with JWT authentication, role management, and payment gateway integration.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  };

  const handleInstantBuy = () => {
    setPurchased(true);
    addToast("Instant Digital Purchase Completed! License key revealed below.", "success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Digital Product
              </span>
              <span className="text-xs text-slate-400 font-medium">By {product.developer}</span>
            </div>

            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{product.name}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-orange-500">{formatPrice(product.price)}</span>
              <span className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
              <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded">50% OFF</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleInstantBuy}
                className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Instant Digital Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Instant License Key Reveal Block */}
        {purchased && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Instant Digital License Key</span>
              <span className="text-slate-400 font-mono text-[10px]">File Size: {product.downloadSize}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-sm font-bold text-amber-500 border border-slate-700 flex justify-between items-center">
              <span>{product.licenseKey}</span>
              <button onClick={() => addToast("License key copied to clipboard!", "info")} className="text-xs text-emerald-400 hover:underline">
                Copy Key
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalProductDetail;
