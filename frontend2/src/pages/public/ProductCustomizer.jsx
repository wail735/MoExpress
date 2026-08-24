// ============================================================================
// PAGE : ProductCustomizer.jsx
// ROLE : Etsy-Style Custom Print & Engraving Personalization Studio (/customizer)
// ============================================================================

import React, { useState } from "react";
import { Type, Image, Sparkles, ShoppingBag } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export const ProductCustomizer = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToast } = useNotification();
  const [customText, setCustomText] = useState("MoExpress 2026");
  const [textColor, setTextColor] = useState("#FF4D20");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-pink-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Sparkles className="w-4 h-4" /> Personalization Studio
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Custom Print & Engraving Personalizer</h1>
        <p className="text-xs text-gray-500">Personalize items with custom text engraving, custom colors, and printed logos</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Live Preview Box */}
          <div className="aspect-square bg-gray-900 rounded-3xl p-8 flex items-center justify-center border shadow-xl relative overflow-hidden">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black transition-all" style={{ color: textColor }}>{customText || "Your Text Here"}</h2>
              <span className="text-xs text-gray-400 font-mono">Custom Laser Engraving Preview</span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Custom Engraving Text</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength="25"
                placeholder="Enter custom text..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-base"
              />
            </div>

            <div>
              <label className="text-gray-500 font-semibold block mb-2">Engraving Text Color</label>
              <div className="flex gap-3">
                {["#FF4D20", "#FF8A00", "#10B981", "#2563EB", "#FFFFFF", "#000000"].map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setTextColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-7 h-7 rounded-full border-2 transition ${textColor === hex ? "border-brand-orange scale-110 shadow-md" : "border-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-400 block mb-1">Customized Product Price:</span>
              <span className="text-2xl font-black text-orange-500">{formatPrice(34.99)}</span>
            </div>

            <button
              onClick={() => {
                addToCart({ _id: "cust_1", name: `Personalized Item (${customText})`, price: 34.99 }, 1);
                addToast("Personalized item added to Cart!", "success");
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-xs"
            >
              <ShoppingBag className="w-4 h-4" /> Add Customized Item to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
