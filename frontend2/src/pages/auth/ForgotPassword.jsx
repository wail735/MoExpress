// ============================================================================
// PAGE : ForgotPassword.jsx
// ROLE : Password Recovery Request Page
// ============================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Send, ArrowLeft } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

import authApi from "../../api/authApi";

export const ForgotPassword = () => {
  const { addToast } = useNotification();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.forgotPassword(email);
      setSubmitted(true);
      addToast(res.message || "Password reset instructions sent to your email!", "success");
    } catch (err) {
      addToast(err.message || "Failed to request password reset.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Reset Password</h1>
          <p className="text-xs text-gray-500">Enter your registered email address</p>
        </div>

        {submitted ? (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-center space-y-2">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="text-xs font-bold text-orange-500 hover:underline block pt-2">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="text-center">
          <Link to="/login" className="text-xs text-gray-500 hover:text-orange-500 flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
