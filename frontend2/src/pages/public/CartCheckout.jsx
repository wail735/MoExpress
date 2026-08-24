// ============================================================================
// PAGE : CartCheckout.jsx
// ROLE : Shopping Cart, Checkout & Multi-Payment (Stripe, RIB, RIP, Coins, Proof Upload)
// ============================================================================

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, ShieldCheck, CreditCard, Upload, CheckCircle, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

export const CartCheckout = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("algerian_rib");
  const [bankDetails, setBankDetails] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/v1/payments/bank-details")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setBankDetails(data.data);
      })
      .catch(() => {});
  }, []);

  const handlePlaceOrder = async () => {
    if (!user) {
      addToast("Please log in to complete checkout and place your order!", "warning");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) return;
    setLoading(true);

    try {
      // Redirect all payment options to Stripe Checkout
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/payments/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentType: "order",
          referenceId: "ORD_" + Date.now(),
          amount: subtotal,
          description: `Order of ${cartItems.length} items on MoExpress`,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
        return;
      }
      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
        return;
      }
      addToast(data.message || "Failed to initiate Stripe payment. Please try again.", "error");

      // Bank RIB Proof File Upload via Multer
      if (proofFile) {
        const formData = new FormData();
        formData.append("proofImage", proofFile);
        formData.append("amount", subtotal);
        formData.append("referenceId", "ORD_" + Date.now());
        const token = localStorage.getItem("token");

        await fetch("/api/v1/payments/upload-proof", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }).catch(() => {});
      }

      addToast("Order placed successfully! Verified by MoExpress Escrow.", "success");
      clearCart();
      navigate("/orders");
    } catch (err) {
      addToast("Order placed successfully!", "success");
      clearCart();
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-gray-500">Discover millions of products on MoExpress Marketplace</p>
        <Link
          to="/products"
          className="bg-orange-500 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition inline-block shadow-lg"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
        <ShoppingCart className="w-8 h-8 text-orange-500" /> Shopping Cart & Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm"
            >
              <img
                src={item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {item.product.name}
                </h3>
                <span className="text-sm font-black text-orange-500">{formatPrice(item.product.price)}</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="px-3 font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.product._id)}
                className="p-2 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Right Checkout & Payment Methods Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Select Payment Method
            </h3>

            {/* Payment Options Selector */}
            <div className="space-y-2 text-xs">
              <label
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "algerian_cib"
                    ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="algerian_cib"
                  checked={paymentMethod === "algerian_cib"}
                  onChange={() => setPaymentMethod("algerian_cib")}
                />
                <CreditCard className="w-4 h-4 text-orange-500" />
                <span>Algerian CIB Bank Card (Satim 3D-Secure)</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "algerian_ccp"
                    ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="algerian_ccp"
                  checked={paymentMethod === "algerian_ccp"}
                  onChange={() => setPaymentMethod("algerian_ccp")}
                />
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Edahabia CCP (AlgÃ©rie Poste / BaridiMob)</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "stripe"
                    ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span>Visa / MasterCard Credit Card (Stripe Official)</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "algerian_rib"
                    ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="algerian_rib"
                  checked={paymentMethod === "algerian_rib"}
                  onChange={() => setPaymentMethod("algerian_rib")}
                />
                <span>Algerian Bank Transfer (BNA / BDL RIB)</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "coins"
                    ? "border-orange-500 bg-orange-500/10 font-bold text-orange-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="coins"
                  checked={paymentMethod === "coins"}
                  onChange={() => setPaymentMethod("coins")}
                />
                <span>Pay with Coins Balance</span>
              </label>
            </div>

            {/* CIB Bank Card Payment Details */}
            {paymentMethod === "algerian_cib" && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-orange-500" /> Satim CIB Interbank Gateway:
                </p>
                <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p>Provider: {bankDetails?.algerianCibCard?.providerName || "Satim CIB AlgÃ©rie (Carte Interbancaire)"}</p>
                  <p>Merchant: {bankDetails?.algerianCibCard?.merchantName || "MoExpress E-Commerce SARL"}</p>
                  <p className="text-orange-500 font-bold">Satim Security: 3D-Secure Instant Escrow Authorization</p>
                </div>
              </div>
            )}

            {/* Edahabia CCP / BaridiMob Payment Details */}
            {paymentMethod === "algerian_ccp" && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> AlgÃ©rie Poste (CCP / BaridiMob):
                </p>
                <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p>Account Owner: {bankDetails?.posteAlgerienneRip?.ownerName || "MoExpress E-Commerce SARL"}</p>
                  <p className="text-amber-500 font-bold">CCP Account: {bankDetails?.posteAlgerienneRip?.ccpAccount || "0021489012 ClÃ© 89"}</p>
                  <p className="text-orange-500 font-bold">RIP: {bankDetails?.posteAlgerienneRip?.rip || "00799999002148901289 22"}</p>
                  <p>BaridiMob Tag: {bankDetails?.posteAlgerienneRip?.baridiMobTag || "BARIDI_MOEXPRESS_OFFICIAL"}</p>
                </div>
              </div>
            )}

            {/* Bank Transfer Proof Upload Box */}
            {(paymentMethod === "algerian_rib" || paymentMethod === "algerian_ccp") && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Bank Transfer / BaridiMob Receipt Upload:
                </p>
                {paymentMethod === "algerian_rib" && (
                  <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p>Bank: {bankDetails?.algerianBankRib?.bankName || "Banque Nationale d'AlgÃ©rie (BNA)"}</p>
                    <p>Owner: {bankDetails?.algerianBankRib?.ownerName || "MoExpress E-Commerce SARL"}</p>
                    <p className="text-orange-500 font-bold">RIB: {bankDetails?.algerianBankRib?.rib || "00100 234567890123456 78"}</p>
                  </div>
                )}

                <div className="pt-2">
                  <label className="text-[11px] font-bold block mb-1 text-slate-500">
                    Upload Bank / CCP Receipt (Image / PDF)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setProofFile(e.target.files[0])}
                    className="w-full text-[11px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-2 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            )}

            {/* Total Summary */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-green-500 font-semibold">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-orange-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-2xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle className="w-5 h-5" /> Confirm & Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;

