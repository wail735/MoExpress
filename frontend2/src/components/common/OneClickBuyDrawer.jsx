// ============================================================================
// COMPONENT : OneClickBuyDrawer.jsx
// ROLE : 1-Click Instant Fast Checkout Drawer
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, X, ShieldCheck, Lock } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

export const OneClickBuyDrawer = ({ product, isOpen, onClose }) => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const handleConfirmOrder = () => {
    if (!isAuthenticated) {
      addToast("Please log in to complete 1-Click order!", "warning");
      onClose();
      navigate("/login");
      return;
    }
    addToast(`1-Click Express Order Placed for ${product.name}!`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-end animate-fadeIn text-slate-900 dark:text-slate-100">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" /> 1-Click Express Checkout
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isAuthenticated && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <Lock className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Authentication required to process 1-Click instant order</span>
            </div>
          )}

          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-4 items-center">
            <img src={product.image || product.images?.[0]?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"} alt={product.name} className="w-16 h-16 object-cover rounded-xl border" />
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{product.name}</h4>
              <span className="font-black text-orange-500 text-sm">{formatPrice(product.price)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-4 rounded-2xl shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2 text-sm"
        >
          <Zap className="w-5 h-5" /> {isAuthenticated ? "Confirm 1-Click Order" : "Log In to Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default OneClickBuyDrawer;
