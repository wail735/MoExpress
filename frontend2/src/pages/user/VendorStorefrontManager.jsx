import React, { useState } from "react";
import { Store, Palette, Save, Sparkles, Image, Check, ShoppingBag, Eye, Upload } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

export const VendorStorefrontManager = () => {
  const { addToast } = useNotification();
  const { user, updateUserProfile } = useAuth();

  const [shopName, setShopName] = useState(user?.proShopDetails?.shopName || "MoStore Official Boutique");
  const [slogan, setSlogan] = useState(user?.proShopDetails?.slogan || "Premium Electronics & Global Trade Direct from Certified Suppliers");
  const [themeColor, setThemeColor] = useState(user?.proShopDetails?.themeColor || "#FF4D20");
  const [bannerUrl, setBannerUrl] = useState(user?.proShopDetails?.bannerUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80");
  const [fontFamily, setFontFamily] = useState("Poppins");

  const colorPresets = ["#FF4D20", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B", "#06B6D4", "#1E293B"];

  const handleSave = (e) => {
    e.preventDefault();

    updateUserProfile({
      proShopDetails: {
        ...(user?.proShopDetails || {}),
        shopName,
        slogan,
        themeColor,
        bannerUrl,
      },
    });

    addToast(`Storefront configuration saved! Theme color updated to ${themeColor}`, "success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-slate-900 dark:text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold flex items-center gap-2">
          <Store className="w-8 h-8 text-orange-500" /> Pro Boutique Storefront Manager
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Customize your flagship store appearance, primary brand accent color, banner image, and slogans in real time.
        </p>
      </div>

      {/* Live Storefront Preview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-extrabold text-sm flex items-center gap-2 text-slate-900 dark:text-white">
            <Eye className="w-4 h-4 text-orange-500" /> Live Flagship Storefront Preview
          </h3>
          <span className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full" style={{ backgroundColor: themeColor }}>
            Active Theme Color: {themeColor}
          </span>
        </div>

        {/* Dynamic Store Banner Preview */}
        <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center p-6 text-white text-center">
          <img src={bannerUrl} alt="Storefront Banner Preview" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          <div className="relative z-10 space-y-1" style={{ fontFamily }}>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
              Verified Pro Boutique
            </span>
            <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md">{shopName}</h2>
            <p className="text-xs text-white/90 max-w-md mx-auto line-clamp-2">{slogan}</p>
          </div>
        </div>

        {/* Dynamic Preview Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button style={{ backgroundColor: themeColor }} className="text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition hover:opacity-90 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Visit Boutique Products
          </button>
          <button style={{ borderColor: themeColor, color: themeColor }} className="bg-transparent border font-bold text-xs px-5 py-2.5 rounded-xl transition hover:bg-slate-50 dark:hover:bg-slate-800">
            Contact Seller
          </button>
        </div>
      </div>

      {/* Editing Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2 text-slate-900 dark:text-white">
          <Palette className="w-5 h-5 text-orange-500" /> Flagship Storefront Branding Controls
        </h3>

        <div>
          <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Boutique Display Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-bold"
          />
        </div>

        <div>
          <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Boutique Slogan / Headline</label>
          <input
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Header Banner Image URL</label>
          <input
            type="url"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-2">Primary Brand Theme Color</label>
            <div className="flex flex-wrap items-center gap-3">
              {colorPresets.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setThemeColor(hex)}
                  style={{ backgroundColor: hex }}
                  className={`w-9 h-9 rounded-full transition transform hover:scale-110 flex items-center justify-center text-white shadow-xs ${
                    themeColor === hex ? "ring-4 ring-orange-500/50 scale-110 shadow-md" : ""
                  }`}
                >
                  {themeColor === hex && <Check className="w-4 h-4 stroke-[3]" />}
                </button>
              ))}
              {/* Custom Color Picker */}
              <div className="relative flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                  title="Choose Custom Color"
                />
                <span className="font-mono text-xs font-bold pr-2">{themeColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Typography Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="Poppins">Poppins (Modern Clean)</option>
              <option value="Inter">Inter (Sleek Tech)</option>
              <option value="Montserrat">Montserrat (Bold Premium)</option>
              <option value="Playfair">Playfair Display (Luxury Serif)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: themeColor }}
          className="text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl hover:opacity-95 transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Storefront Branding ({themeColor})
        </button>
      </form>
    </div>
  );
};

export default VendorStorefrontManager;
