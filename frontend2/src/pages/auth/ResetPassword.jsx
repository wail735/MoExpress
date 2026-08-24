// ============================================================================
// PAGE : ResetPassword.jsx
// ROLE : Set New Password Form
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingBag, Lock, CheckCircle } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import authApi from "../../api/authApi";

export const ResetPassword = () => {
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }
    if (!token) {
      addToast("Reset token is missing or invalid URL.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resetPassword(token, password);
      addToast(res.message || "Password updated successfully! Please sign in.", "success");
      navigate("/login");
    } catch (err) {
      addToast(err.message || "Failed to reset password. The link may have expired.", "error");
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
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Set New Password</h1>
          <p className="text-xs text-gray-500">Choose a strong password for your MoExpress account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">New Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" /> {loading ? "Updating..." : "Save New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
