// ============================================================================
// PAGE : ProductCatalog.jsx
// ROLE : Product Search & Catalog Listing with Sidebar Filters & Price Categorization
// ============================================================================

import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Filter, Search, Star, ShoppingBag, Award, ShieldCheck, RefreshCw, X, ChevronRight, Eye } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export const ProductCatalog = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const keyword = searchParams.get("keyword") || searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [onlyProShop, setOnlyProShop] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const catalogFallback = [
    { _id: "prod_1", name: "Sony WH-1000XM5 Wireless Headphones", price: 299.99, comparePrice: 399.99, rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", isProShop: true },
    { _id: "prod_2", name: "Apple Watch Series 9 GPS", price: 399.99, comparePrice: 499.99, rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", isProShop: true },
    { _id: "prod_3", name: "Nike Air Max 270 Sneakers", price: 129.99, comparePrice: 169.99, rating: 4.7, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", isProShop: true },
    { _id: "prod_4", name: "Logitech MX Master 3S Mouse", price: 99.99, comparePrice: 129.99, rating: 4.85, category: "Electronics", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80", isProShop: false },
    { _id: "prod_5", name: "Modern Nordic Ceramic Vase Set", price: 45.0, comparePrice: 65.0, rating: 4.6, category: "Home", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80", isProShop: false },
    { _id: "prod_6", name: "Organic Hydrating Facial Serum", price: 28.5, comparePrice: 42.0, rating: 4.9, category: "Beauty", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", isProShop: true },
  ];

  useEffect(() => {
    setLoading(true);
    let url = `/api/v1/products?limit=30`;
    if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
    if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
        } else {
          setProducts(catalogFallback);
        }
      })
      .catch(() => setProducts(catalogFallback))
      .finally(() => setLoading(false));
  }, [keyword, selectedCategory]);

  const displayProducts = (products.length > 0 ? products : catalogFallback).filter((p) => {
    const matchesKeyword = !keyword || p.name.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = !selectedCategory || p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesMinPrice = !minPrice || p.price >= parseFloat(minPrice);
    const matchesMaxPrice = p.price <= maxPrice;
    const matchesRating = !minRating || (p.rating || 4.5) >= minRating;
    const matchesPro = !onlyProShop || p.isProShop;
    return matchesKeyword && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating && matchesPro;
  });

  const sortedProducts = [...displayProducts].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Title & Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-orange-500" /> MoExpress Shop & Catalog
          </h1>
          <p className="text-xs text-gray-500">
            {keyword ? `Search results for "${keyword}"` : "Discover top items with wholesale pricing & 100% escrow protection"}
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-500">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm px-3 py-2 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated (★ 4.8+)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Drawer */}
        <aside className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" /> Sidebar Search & Filters
            </h3>
            {(keyword || selectedCategory || minPrice || onlyProShop) && (
              <button
                onClick={() => {
                  setSearchParams({});
                  setMinPrice("");
                  setMaxPrice(1000);
                  setMinRating(0);
                  setOnlyProShop(false);
                }}
                className="text-xs text-orange-500 hover:underline font-semibold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search Query Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => {
                  if (e.target.value) searchParams.set("keyword", e.target.value);
                  else searchParams.delete("keyword");
                  setSearchParams(searchParams);
                }}
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* Category Filter Checklist */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Categories</label>
            {["All", "Electronics", "Fashion", "Home", "Beauty", "Sports"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "All") searchParams.delete("category");
                  else searchParams.set("category", cat);
                  setSearchParams(searchParams);
                }}
                className={`w-full text-left text-xs py-2 px-3 rounded-xl font-semibold transition flex items-center justify-between ${
                  (cat === "All" && !selectedCategory) || selectedCategory === cat
                    ? "bg-orange-500 text-white font-bold shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{cat}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Price Range Inputs & Slider */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <label className="font-bold uppercase tracking-wider text-gray-500 block">Price Range Categorization</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min €"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Max €"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white"
              />
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-orange cursor-pointer"
            />
            <span className="text-[11px] text-gray-400 block">Max Price: {formatPrice(maxPrice)}</span>
          </div>

          {/* Pro Shop Toggle */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-gray-700 dark:text-gray-300">Verified Pro Shops Only</span>
            <input
              type="checkbox"
              checked={onlyProShop}
              onChange={(e) => setOnlyProShop(e.target.checked)}
              className="w-4 h-4 accent-brand-orange rounded cursor-pointer"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3 space-y-6">
          {sortedProducts.length === 0 && !loading && (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl text-center border border-slate-200 dark:border-slate-800 space-y-4">
              <Search className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Matching Products</h3>
              <p className="text-xs text-gray-500">Try adjusting your sidebar price range, category, or search keywords.</p>
              <button
                onClick={() => {
                  setSearchParams({});
                  setMinPrice("");
                  setMaxPrice(1000);
                  setOnlyProShop(false);
                }}
                className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-brand-accent transition shadow-md"
              >
                Reset Catalog Filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950 cursor-pointer"
                  >
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
                      </div>
                    )}
                    {product.isProShop && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Award className="w-3 h-3" /> Pro Shop
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                      {product.category || "Electronics"}
                    </span>
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white hover:text-orange-500 transition line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      ★ <span className="font-bold text-gray-800 dark:text-gray-200">{product.rating || 4.8}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 mt-2">
                  <span className="text-lg font-black text-orange-500">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      addToast(`Added "${product.name}" to cart!`, "success");
                    }}
                    className="bg-slate-900 text-white dark:bg-gray-800 hover:bg-orange-500 text-white p-2.5 rounded-2xl transition shadow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;
