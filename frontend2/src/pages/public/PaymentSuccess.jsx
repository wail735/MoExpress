import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, RefreshCw, XCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const { updateUserProfile } = useAuth();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState(null);
  const verifiedRef = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsVerifying(false);
        return;
      }
      if (verifiedRef.current) return;
      verifiedRef.current = true;
      
      try {
        await apiClient.get(`/payments/stripe/verify?session_id=${sessionId}`);
        clearCart();
        if (updateUserProfile) {
          await updateUserProfile();
        }
        setIsVerifying(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to verify payment.");
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, clearCart, updateUserProfile]);

  if (isVerifying) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full text-center space-y-6">
          <RefreshCw className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Verifying Payment...</h1>
          <p className="text-sm text-slate-500">Please wait while we confirm your transaction securely.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-red-500/30 shadow-2xl max-w-md w-full text-center space-y-6">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Verification Failed</h1>
          <p className="text-sm text-red-500">{error}</p>
          <div className="pt-6">
            <Link to="/help" className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition block">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
