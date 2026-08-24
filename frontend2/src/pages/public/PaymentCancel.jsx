import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export const PaymentCancel = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-red-500/30 shadow-2xl max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Cancelled</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your payment process was cancelled or interrupted. No charges were made to your account.
        </p>

        <div className="pt-6">
          <Link
            to="/cart"
            className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2"
          >
            Return to Cart
          </Link>
        </div>
        <div className="pt-2">
          <Link
            to="/"
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
