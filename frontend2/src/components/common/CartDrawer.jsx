// ============================================================================
// COMPONENT : CartDrawer.jsx (Shopify-Style Slide-Over Cart Drawer)
// ROLE : 1-Click Slide-Over Cart Preview Drawer
// ============================================================================

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, X, Trash2, ArrowRight, LogIn, Lock } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const currentTotal = typeof subtotal === "number" ? subtotal : (typeof getCartTotal === "function" ? getCartTotal() : 0);

  const handleCheckoutClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      addToast("Please log in to complete purchase and place your order!", "warning");
      onClose();
      navigate("/login");
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300">
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" /> Your Shopping Cart ({(cartItems || []).length})
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isAuthenticated && (
            <div className="mb-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs text-slate-900 dark:text-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Log in to complete purchase & save cart</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <LogIn className="w-3 h-3" /> Log In
              </button>
            </div>
          )}

          <div className="space-y-4">
            {(!cartItems || cartItems.length === 0) ? (
              <p className="text-xs text-gray-500 text-center py-8">Your cart is empty.</p>
            ) : (
              cartItems.map((item, idx) => {
                const p = item.product || item;
                const pId = p._id || p.id || idx;
                return (
                  <div key={pId} className="flex items-center justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <img src={p.images?.[0]?.url || p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"} alt={p.name} className="w-14 h-14 object-cover rounded-xl border" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{p.name || "Marketplace Product"}</h4>
                      <span className="text-xs font-black text-orange-500">{formatPrice(p.price || 0)}</span>
                    </div>
                    <button onClick={() => removeFromCart(pId)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
          <div className="flex items-center justify-between font-black text-base text-slate-900 dark:text-white">
            <span>Subtotal:</span>
            <span className="text-orange-500">{formatPrice(currentTotal)}</span>
          </div>

          <Link
            to="/cart"
            onClick={handleCheckoutClick}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-xs"
          >
            {isAuthenticated ? "Proceed to Checkout" : "Log In to Complete Purchase"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
