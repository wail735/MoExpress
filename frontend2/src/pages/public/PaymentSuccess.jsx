import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart upon successful return from Stripe
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-green-500/30 shadow-2xl max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Successful!</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Thank you for your purchase. Your payment has been securely processed by Stripe.
        </p>
        
        {sessionId && (
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-xs font-mono text-slate-500 break-all">
            Session ID: {sessionId}
          </div>
        )}

        <div className="pt-6">
          <Link
            to="/orders"
            className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            View My Orders
          </Link>
        </div>
        <div className="pt-2">
          <Link
            to="/"
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
