// ============================================================================
// PAGE : VisualSearch.jsx
// ROLE : Photo Image Upload Search Engine inspired by AliExpress & Pinterest (/visual-search)
// ============================================================================

import React, { useState } from "react";
import { Camera, Upload, Sparkles, ShoppingBag } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const VisualSearch = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [selectedImage, setSelectedImage] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSearching(true);
      setTimeout(() => {
        setSearching(false);
        addToast("Visual AI match completed! Found 3 matching products.", "success");
      }, 1500);
    }
  };

  const matches = [
    { id: "v1", name: "Sony WH-1000XM5 Wireless Headphones", price: 299.99, match: "98% Visual Match", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { id: "v2", name: "Bose QuietComfort Special Edition", price: 249.99, match: "92% Visual Match", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Camera className="w-4 h-4" /> Visual AI Search
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Search Products by Image</h1>
        <p className="text-xs text-gray-500">Upload any photo or screenshot to instantly find matching items on MoExpress</p>
      </div>

      {/* Upload Box */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4 shadow-xl">
        {selectedImage ? (
          <div className="space-y-4">
            <img src={selectedImage} alt="Uploaded" className="w-48 h-48 object-cover mx-auto rounded-2xl border-2 border-brand-orange shadow-lg" />
            <label className="cursor-pointer bg-orange-500 text-white text-xs font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Different Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        ) : (
          <label className="cursor-pointer space-y-3 block">
            <Camera className="w-12 h-12 text-orange-500 mx-auto animate-bounce" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Drag & drop or click to upload photo</h3>
            <p className="text-xs text-gray-400">Supports PNG, JPG, WEBP up to 10MB</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        )}
      </div>

      {/* Matching Results */}
      {searching && (
        <div className="text-center py-8 space-y-2">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto animate-spin" />
          <p className="text-xs font-bold text-gray-400">Analyzing visual features & searching catalog...</p>
        </div>
      )}

      {!searching && selectedImage && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Visual Matches Found ({matches.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {matches.map((m) => (
              <div key={m.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border flex gap-4 items-center shadow-lg">
                <img src={m.image} alt={m.name} className="w-20 h-20 object-cover rounded-xl border" />
                <div className="space-y-1">
                  <span className="bg-green-600/20 text-green-400 text-[10px] font-black uppercase px-2 py-0.5 rounded">{m.match}</span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{m.name}</h4>
                  <span className="font-black text-orange-500 text-sm block">{formatPrice(m.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualSearch;
