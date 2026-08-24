// ============================================================================
// PAGE : UserWishlistPage.jsx
// ROLE : Saved Wishlist Products Catalog Page (/user/wishlist)
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";

export const UserWishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const sampleWishlistItems = wishlist.length > 0 ? wishlist : [
    {
      _id: "prod_1",
      name: "Sony WH-1000XM5 Wireless Headphones",
      price: 299.99,
      images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" }],
    },
    {
      _id: "prod_2",
      name: "Apple Watch Series 9 GPS + Cellular",
      price: 399.99,
      images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-8 h-8 text-red-500 fill-current" /> My Saved Wishlist ({sampleWishlistItems.length})
        </h1>
        <p className="text-xs text-gray-500">Quickly access and purchase your favorite saved items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sampleWishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img src={item.images?.[0]?.url} alt={item.name} className="w-full h-full object-cover" />
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-600 text-white rounded-full transition"
                title="Remove from Wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <Link to={`/products/${item._id}`}>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-orange-500">
                  {item.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between font-black text-orange-500 text-sm">
                <span>{formatPrice(item.price)}</span>
              </div>

              <button
                onClick={() => addToCart(item, 1)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2.5 rounded-xl hover:opacity-95 transition flex items-center justify-center gap-1.5 text-xs shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishlistPage;
