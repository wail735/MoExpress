// ============================================================================
// PAGE : ProductCompare.jsx
// ROLE : Side-by-Side Product Comparison Table (/compare)
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";
import { Scale, Trash2, Award, ShieldCheck, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCompare } from "../../context/CompareContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

export const ProductCompare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const sampleDefaultItems = compareItems.length > 0 ? compareItems : [
    {
      _id: "prod_1",
      name: "Sony WH-1000XM5 Wireless Headphones",
      price: 299.99,
      category: "Electronics",
      rating: 4.8,
      isProShop: true,
      isSupplier: true,
      images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" }],
    },
    {
      _id: "prod_2",
      name: "Apple Watch Series 9 GPS + Cellular",
      price: 399.99,
      category: "Electronics",
      rating: 4.9,
      isProShop: true,
      isSupplier: false,
      images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-8 h-8 text-orange-500" /> Side-by-Side Product Comparison
          </h1>
          <p className="text-xs text-gray-500">Compare specs, ratings, pricing, and verified vendor badges</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/products" className="text-xs text-gray-500 hover:text-orange-500 flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          {compareItems.length > 0 && (
            <button
              onClick={clearCompare}
              className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs px-3 py-1.5 rounded-xl font-bold transition"
            >
              Clear Comparison
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-gray-500 uppercase tracking-wider text-[11px]">
              <th className="py-4 px-6 w-48 bg-gray-50 dark:bg-gray-800/40">Feature / Spec</th>
              {sampleDefaultItems.map((item) => (
                <th key={item._id} className="py-4 px-6 min-w-[220px]">
                  <div className="space-y-2">
                    <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border">
                      <img src={item.images?.[0]?.url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white text-center line-clamp-2">{item.name}</h3>
                    <button
                      onClick={() => removeFromCompare(item._id)}
                      className="text-red-400 hover:text-red-300 text-[10px] block mx-auto flex items-center gap-1 font-bold"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <td className="py-4 px-6 font-bold bg-gray-50 dark:bg-gray-800/40 text-gray-500">Price in Active Currency</td>
              {sampleDefaultItems.map((item) => (
                <td key={item._id} className="py-4 px-6 text-center font-black text-orange-500 text-base">
                  {formatPrice(item.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-4 px-6 font-bold bg-gray-50 dark:bg-gray-800/40 text-gray-500">Category</td>
              {sampleDefaultItems.map((item) => (
                <td key={item._id} className="py-4 px-6 text-center font-semibold">{item.category}</td>
              ))}
            </tr>
            <tr>
              <td className="py-4 px-6 font-bold bg-gray-50 dark:bg-gray-800/40 text-gray-500">Customer Rating</td>
              {sampleDefaultItems.map((item) => (
                <td key={item._id} className="py-4 px-6 text-center font-bold text-yellow-400">★ {item.rating} / 5</td>
              ))}
            </tr>
            <tr>
              <td className="py-4 px-6 font-bold bg-gray-50 dark:bg-gray-800/40 text-gray-500">Verified Seller Badges</td>
              {sampleDefaultItems.map((item) => (
                <td key={item._id} className="py-4 px-6 text-center space-y-1">
                  {item.isProShop && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center justify-center gap-1">
                      <Award className="w-3 h-3" /> Pro Shop
                    </span>
                  )}
                  {item.isSupplier && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Certified Supplier
                    </span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-4 px-6 font-bold bg-gray-50 dark:bg-gray-800/40 text-gray-500">Actions</td>
              {sampleDefaultItems.map((item) => (
                <td key={item._id} className="py-4 px-6 text-center">
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1 mx-auto shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCompare;
