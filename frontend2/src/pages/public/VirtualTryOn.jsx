// ============================================================================
// PAGE : VirtualTryOn.jsx
// ROLE : Camera & Photo Virtual Try-On Studio inspired by Ray-Ban & Sephora (/virtual-tryon)
// ============================================================================

import React, { useState } from "react";
import { Camera, Sparkles, ShoppingBag } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const VirtualTryOn = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [selectedOverlay, setSelectedOverlay] = useState("sunglasses");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-purple-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Sparkles className="w-4 h-4 text-yellow-300" /> Virtual Try-On AI
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Camera Virtual Try-On Studio</h1>
        <p className="text-xs text-gray-500">Preview sunglasses, watches, and makeup on your camera feed before buying</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center">
        <div className="aspect-square max-w-sm mx-auto bg-gray-900 rounded-3xl p-8 flex items-center justify-center border shadow-xl relative overflow-hidden">
          <Camera className="w-16 h-16 text-purple-400 animate-pulse mx-auto" />
          <span className="absolute bottom-4 left-4 bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
            Live Camera Preview: {selectedOverlay}
          </span>
        </div>

        <div className="flex justify-center gap-3">
          {["sunglasses", "smartwatch", "lipstick"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedOverlay(item)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                selectedOverlay === item ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              }`}
            >
              Try {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
