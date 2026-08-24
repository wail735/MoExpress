// ============================================================================
// PAGE : Home.jsx
// ROLE : Public Homepage with Hero Banners, Flash Deals, Top Categories, Products & Ads
// ============================================================================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Zap,
  Star,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  Flame,
  ChevronRight,
  Clock,
  Store,
  Heart,
  Truck,
} from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNotification } from "../../context/NotificationContext";

export const Home = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useNotification();

  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);

  // Countdown timer for Flash Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 45, seconds: 30 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch Homepage Products & Ads
    Promise.all([
      fetch("/api/v1/products?limit=8").then((r) => r.json()),
      fetch("/api/v1/ads/homepage").then((r) => r.json()),
    ])
      .then(([productRes, adRes]) => {
        if (productRes.success) setProducts(productRes.data || []);
        if (adRes.success && adRes.data?.ads) setAds(adRes.data.ads);
      })
      .catch(() => {});
  }, []);

  // Mock Products if backend is initializing
  const displayProducts =
    products.length > 0
      ? products
      : [
          {
            _id: "prod_1",
            name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
            price: 299.99,
            comparePrice: 399.99,
            rating: 4.8,
            numReviews: 128,
            category: "Electronics",
            images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" }],
            isProShop: true,
          },
          {
            _id: "prod_2",
            name: "Apple Watch Series 9 GPS + Cellular Smartwatch",
            price: 399.99,
            comparePrice: 499.99,
            rating: 4.9,
            numReviews: 94,
            category: "Electronics",
            images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }],
            isProShop: true,
          },
          {
            _id: "prod_3",
            name: "Nike Air Max 270 Pro Sport Running Sneakers",
            price: 129.99,
            comparePrice: 169.99,
            rating: 4.7,
            numReviews: 76,
            category: "Fashion",
            images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" }],
            isProShop: true,
          },
          {
            _id: "prod_4",
            name: "Modern Minimalist Desk Lamp Touch Controlled LED",
            price: 34.99,
            comparePrice: 49.99,
            rating: 4.6,
            numReviews: 45,
            category: "Home",
            images: [{ url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80" }],
          },
        ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner Showcase with Explicit High Contrast Text */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-12 px-6 sm:px-10 rounded-3xl shadow-xl border border-slate-800 max-w-7xl mx-auto my-4">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> MoExpress Global Marketplace
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Shop Smarter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">Live Better!</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Discover millions of products at wholesale factory prices. Verified Pro Boutiques, certified global suppliers, and guaranteed escrow protection.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/catalog"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition duration-200 flex items-center gap-2 text-xs sm:text-sm"
              >
                Shop Big Deals <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/seller/dashboard"
                className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 font-semibold px-5 py-3 rounded-xl border border-slate-700 transition text-xs sm:text-sm flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" /> Become Pro Seller
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-red-500 animate-bounce" /> Verified Pro Deal
                </span>
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">Up to -35%</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
                alt="MoExpress Hero Product"
                className="w-full h-48 object-cover rounded-xl shadow-sm border border-slate-700"
              />
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="font-bold text-white text-sm">Sony Premium Noise Canceling</h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-400" /> Fast Express Shipping
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400">{formatPrice(299.99)}</span>
                  <span className="text-xs text-slate-400 line-through block">{formatPrice(399.99)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsored Ads Placement */}
      {ads.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-amber-500/10 dark:bg-amber-500/5 p-3.5 rounded-2xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-900 dark:text-white">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded">SPONSORED</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{ads[0].title}</h4>
            </div>
            <a
              href={ads[0].targetUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition shadow-xs"
            >
              Visit Storefront
            </a>
          </div>
        </section>
      )}

      {/* Flash Deals Banner & Countdown */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                Flash Deals Marketplace ⚡
              </h2>
              <p className="text-xs text-white/90">Exclusive limited stock discounts - Order before timer expires!</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 mr-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Ends in:
            </span>
            <div className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg text-white font-mono font-black text-base border border-white/10 shadow-xs">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="font-bold text-sm text-white">:</span>
            <div className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg text-white font-mono font-black text-base border border-white/10 shadow-xs">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="font-bold text-sm text-white">:</span>
            <div className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg text-amber-300 font-mono font-black text-base border border-white/10 shadow-xs">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Grid - Clean Shadcn Card Styling */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" /> Explore Top Categories
          </h2>
          <Link to="/catalog" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            Browse All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "Electronics", count: "12,400+ Products", icon: Store, bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
            { name: "Fashion", count: "8,900+ Products", icon: ShoppingBag, bg: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
            { name: "Home", count: "15,200+ Products", icon: Award, bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
            { name: "Beauty", count: "6,100+ Products", icon: Sparkles, bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
            { name: "Sports", count: "4,300+ Products", icon: Flame, bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
            { name: "Automotive", count: "3,700+ Products", icon: ShieldCheck, bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
          ].map((cat, idx) => {
            const CatIcon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 hover:shadow-xs transition-all duration-200 flex flex-col items-center text-center gap-2 group"
              >
                <div className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <CatIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-orange-500 transition">{cat.name}</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{cat.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" /> Trending Marketplace Products
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Directly from certified manufacturers and boutiques</p>
          </div>
          <Link to="/catalog" className="text-xs font-bold text-orange-500 hover:text-orange-600">
            View Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-500/40 hover:shadow-xs transition-all duration-200 flex flex-col group"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Link to={`/product/${product._id}`} className="block w-full h-full">
                  {product.images?.[0]?.url || product.image ? (
                    <img
                      src={product.images?.[0]?.url || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-400 p-4 text-center">
                      <ShoppingBag className="w-8 h-8 text-orange-500 mb-1 opacity-80" />
                      <span className="text-[10px] font-semibold text-slate-500">No Image Uploaded</span>
                    </div>
                  )}
                </Link>

                {/* Verified Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
                  <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <Award className="w-3 h-3" /> Pro Shop
                  </span>
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Certified
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition shadow-xs z-10 ${
                    isInWishlist(product._id)
                      ? "bg-red-500 text-white"
                      : "bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-red-500 border border-slate-200 dark:border-slate-700"
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    {product.category || "Electronics"}
                  </span>
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white hover:text-orange-500 transition line-clamp-2 mt-0.5">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-bold text-slate-900 dark:text-slate-100">{product.rating || 4.8}</span>
                    <span className="text-slate-400 text-[10px]">({product.numReviews || 120})</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-base font-extrabold text-orange-500">{formatPrice(product.price)}</span>
                    {product.comparePrice > product.price && (
                      <span className="text-[10px] text-slate-400 line-through block">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      addToast("Added to Cart!", "success");
                    }}
                    className="bg-slate-900 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-white p-2 rounded-lg transition shadow-xs"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
