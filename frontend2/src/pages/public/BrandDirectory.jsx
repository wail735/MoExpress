// ============================================================================
// PAGE : BrandDirectory.jsx
// ROLE : Directory of Top Verified Flagship Brand Boutiques (/brands)
// ============================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, Store, Star, ArrowRight, Search, Heart, Check } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const BrandDirectory = () => {
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [followedBrands, setFollowedBrands] = useState([]);

  const initialBrands = [
    { id: "b_sony", name: "Sony Official Flagship Store", category: "Audio", rating: 4.9, sales: "12,400+", bg: "from-blue-900 to-slate-900", logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { id: "b_apple", name: "Apple Authorized Retailer", category: "Mobiles", rating: 4.95, sales: "45,000+", bg: "from-gray-900 to-slate-900", logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
    { id: "b_nike", name: "Nike Sports Global Boutique", category: "Footwear", rating: 4.85, sales: "28,900+", bg: "from-red-900 to-slate-900", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
  ];

  const filteredBrands = initialBrands.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || b.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleToggleFollow = (brandId, brandName) => {
    if (followedBrands.includes(brandId)) {
      setFollowedBrands((prev) => prev.filter((id) => id !== brandId));
      addToast(`Unfollowed ${brandName}`, "info");
    } else {
      setFollowedBrands((prev) => [...prev, brandId]);
      addToast(`Now following ${brandName}! You will receive exclusive voucher alerts.`, "success");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Award className="w-4 h-4" /> Official Brand Boutiques
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Shop Verified Brand Flagships</h1>
        <p className="text-xs text-gray-500">100% Authentic products directly from certified brand manufacturers</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flagship brand stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-xs text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "audio", "mobiles", "footwear"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBrands.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-xs text-gray-500">No brand boutiques found matching "{searchQuery}"</div>
        ) : (
          filteredBrands.map((b) => {
            const isFollowing = followedBrands.includes(b.id);
            return (
              <div key={b.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div className={`h-28 bg-gradient-to-r ${b.bg} p-6 flex items-center justify-between`}>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Certified Brand
                  </span>
                  <button
                    onClick={() => handleToggleFollow(b.id, b.name)}
                    className={`p-2 rounded-full transition ${
                      isFollowing ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/40"
                    }`}
                  >
                    {isFollowing ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-6 space-y-4 -mt-10">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-orange shadow-lg bg-white">
                    <img src={b.logo} alt={b.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{b.name}</h3>
                    <p className="text-xs text-gray-500">{b.category}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-current" /> {b.rating}</span>
                    <span>{b.sales} Sales</span>
                  </div>

                  <Link
                    to={`/boutique/${b.id}`}
                    className="w-full bg-orange-500 hover:bg-brand-accent text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1 text-xs shadow-md"
                  >
                    Visit Flagship Boutique <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BrandDirectory;
