// ============================================================================
// PAGE : BoutiqueProfile.jsx
// ROLE : Pro Boutique Profile with Live Theme Customization (Colors, Fonts & Animations)
// ============================================================================

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, ShieldCheck, Store, MapPin, Star, ShoppingBag, Palette, Type, Sparkles, MessageSquare, Check } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const BoutiqueProfile = () => {
  const { shopId } = useParams();
  const { formatPrice } = useCurrency();
  const { isProShop } = useAuth();
  const { addToast } = useNotification();

  const [shopProducts, setShopProducts] = useState([]);

  // Pro Boutique Theme Customization State
  const [themeColor, setThemeColor] = useState("#FF5722"); // Vibrant AliExpress Orange
  const [bgStyle, setBgStyle] = useState("from-slate-900 via-slate-950 to-slate-900");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [showCustomizer, setShowCustomizer] = useState(false);

  useEffect(() => {
    fetch("/api/v1/products?limit=8")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.length > 0) {
          setShopProducts(data.data);
        } else {
          // Provide clean mock products without external photos for editing
          setShopProducts([
            { _id: "b_prod_1", name: "Pro Wireless ANC Headphones", price: 199.99, rating: 4.9, category: "Electronics" },
            { _id: "b_prod_2", name: "Smart Fitness Watch Series 9", price: 249.99, rating: 4.8, category: "Electronics" },
            { _id: "b_prod_3", name: "Ergonomic Mechanical Keyboard", price: 89.99, rating: 4.7, category: "Electronics" },
            { _id: "b_prod_4", name: "Ultra-Fast USB-C 100W Hub", price: 39.99, rating: 4.9, category: "Electronics" },
          ]);
        }
      })
      .catch(() => {
        setShopProducts([
          { _id: "b_prod_1", name: "Pro Wireless ANC Headphones", price: 199.99, rating: 4.9, category: "Electronics" },
          { _id: "b_prod_2", name: "Smart Fitness Watch Series 9", price: 249.99, rating: 4.8, category: "Electronics" },
          { _id: "b_prod_3", name: "Ergonomic Mechanical Keyboard", price: 89.99, rating: 4.7, category: "Electronics" },
          { _id: "b_prod_4", name: "Ultra-Fast USB-C 100W Hub", price: 39.99, rating: 4.9, category: "Electronics" },
        ]);
      });
  }, []);

  const themeColors = [
    { name: "AliExpress Red", hex: "#FF4747" },
    { name: "Brand Orange", hex: "#FF5722" },
    { name: "Golden Amber", hex: "#F59E0B" },
    { name: "Emerald Green", hex: "#10B981" },
    { name: "Royal Blue", hex: "#2563EB" },
    { name: "Deep Purple", hex: "#8B5CF6" },
  ];

  const bgStyles = [
    { name: "Slate Midnight Gradient", value: "from-slate-900 via-slate-950 to-slate-900" },
    { name: "Emerald Luxury Gradient", value: "from-emerald-950 via-slate-900 to-emerald-950" },
    { name: "Royal Sapphire Gradient", value: "from-blue-950 via-slate-900 to-blue-950" },
    { name: "Amethyst Purple Gradient", value: "from-purple-950 via-slate-900 to-purple-950" },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-900 dark:text-slate-100 style-font-${fontFamily.toLowerCase()}`}>
      {/* Customizer Toggle Trigger for Boutique Pro Owners */}
      {isProShop && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowCustomizer((prev) => !prev)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Palette className="w-4 h-4" /> Customize Store Theme & Colors
          </button>
        </div>
      )}

      {/* Pro Boutique Customizer Controls Drawer */}
      {showCustomizer && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-orange-500 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" /> Pro Boutique Theme Studio
            </h3>
            <button onClick={() => setShowCustomizer(false)} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white">✕ Close</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            {/* Color Selector */}
            <div className="space-y-2">
              <label className="font-bold text-slate-600 dark:text-slate-400 block">Primary Accent Color</label>
              <div className="flex flex-wrap gap-2">
                {themeColors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setThemeColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full transition transform hover:scale-110 flex items-center justify-center text-white ${
                      themeColor === c.hex ? "ring-2 ring-white ring-offset-2 scale-110 shadow-md" : ""
                    }`}
                  >
                    {themeColor === c.hex && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Style Selector */}
            <div className="space-y-2">
              <label className="font-bold text-slate-600 dark:text-slate-400 block">Header Background Gradient</label>
              <select
                value={bgStyle}
                onChange={(e) => setBgStyle(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {bgStyles.map((b) => (
                  <option key={b.name} value={b.value}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Font Family Selector */}
            <div className="space-y-2">
              <label className="font-bold text-slate-600 dark:text-slate-400 block">Boutique Typography Font</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Poppins">Poppins (Modern Clean)</option>
                <option value="Inter">Inter (Sleek Tech)</option>
                <option value="Montserrat">Montserrat (Bold Premium)</option>
                <option value="Playfair">Playfair Display (Luxury Serif)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Customized Boutique Header Banner */}
      <div
        className={`relative bg-gradient-to-r ${bgStyle} rounded-2xl overflow-hidden border shadow-md p-6 sm:p-8 text-white transition-all duration-300`}
        style={{ borderColor: `${themeColor}60` }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Logo with Dynamic Custom Accent Ring */}
          <div
            className="w-20 h-20 rounded-2xl p-1 shadow-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${themeColor}, #FFC107)` }}
          >
            <div className="w-full h-full bg-slate-950 text-white rounded-xl flex items-center justify-center">
              <Store className="w-10 h-10" style={{ color: themeColor }} />
            </div>
          </div>

          {/* Info & Badges */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-white">{shopId === "pro-seller" ? "MoStore Official Flagship Boutique" : "Official Partner Boutique"}</h1>
              <span
                style={{ backgroundColor: themeColor }}
                className="text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" /> Verified Pro Shop
              </span>
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Supplier
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Official certified boutique on MoExpress Marketplace. Quality products with 100% buyer escrow protection and 7-day express shipping.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Algiers, Algeria</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> 4.9 / 5 Rating</span>
              <span className="flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5" style={{ color: themeColor }} /> 1,450+ Sales</span>
            </div>
          </div>

          <Link
            to="/help"
            style={{ backgroundColor: themeColor }}
            className="text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-95 transition flex items-center gap-2 shadow-xs"
          >
            <MessageSquare className="w-4 h-4" /> Message Store
          </Link>
        </div>
      </div>

      {/* Boutique Products Catalog */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" style={{ color: themeColor }} /> Products Offered by this Boutique
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {shopProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-500/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative">
                {product.images?.[0]?.url || product.image ? (
                  <img
                    src={product.images?.[0]?.url || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-900 p-4 text-center">
                    <ShoppingBag className="w-8 h-8 text-orange-500 mb-1 opacity-80" />
                    <span className="text-[10px] font-semibold text-slate-500">No Image Uploaded</span>
                    <Link to="/seller/inventory" className="text-[9px] text-orange-500 hover:underline mt-1 font-bold">
                      Upload Photo
                    </Link>
                  </div>
                )}
              </div>
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white hover:text-orange-500 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </div>
                <div className="flex items-center justify-between text-sm font-black" style={{ color: themeColor }}>
                  <span>{formatPrice(product.price)}</span>
                  <Link to={`/product/${product._id}`} className="text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-orange-500">
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BoutiqueProfile;
