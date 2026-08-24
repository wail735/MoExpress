// ============================================================================
// PAGE : Login.jsx
// ROLE : User Sign In Form with Firebase Google Authentication & JWT Fallback
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Mail, Lock, LogIn, ArrowRight, ShieldCheck, Shield, Store, Zap, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { signInWithGoogle } from "../../config/firebase";
import authApi from "../../api/authApi";

export const Login = () => {
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        login(result.user, result.token);
        addToast(`Google Authentication successful! Welcome, ${result.user.name}`, "success");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.code === "auth/popup-blocked") {
        addToast("Popup blocked by browser. Please allow popups for this site.", "error");
      } else if (err.code === "auth/cancelled-popup-request" || err.code === "auth/popup-closed-by-user") {
        addToast("Google sign-in was cancelled.", "warning");
      } else {
        addToast("Google Sign-In failed. Please try again.", "error");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleQuickLogin = async (targetEmail, targetPassword) => {
    setEmail(targetEmail);
    setPassword(targetPassword);
    setLoading(true);

    try {
      const response = await authApi.login({ email: targetEmail, password: targetPassword });
      const authData = response.data || response;
      const user = authData.user || authData.data?.user;
      const token = authData.token || authData.data?.token;

      if (user && token) {
        login(user, token);
        addToast(`1-Click Fast Login successful! Welcome, ${user.name}`, "success");
        if (user.role === "superAdmin") navigate("/admin");
        else if (user.role === "seller" || user.isProShop) navigate("/seller/dashboard");
        else navigate("/dashboard");
        return;
      }
    } catch (err) {
      // Fallback Demo User Object if backend is offline
      const mockRole = targetEmail.includes("superadmin")
        ? "superAdmin"
        : targetEmail.includes("admin")
        ? "admin"
        : targetEmail.includes("pro") || targetEmail.includes("enterprise")
        ? "seller"
        : "buyer";

      const mockUser = {
        _id: "demo_" + Date.now(),
        name: targetEmail.split("@")[0].toUpperCase() + " User",
        email: targetEmail,
        role: mockRole,
        isProShop: mockRole === "seller" || mockRole === "superAdmin",
        isSupplier: mockRole === "seller" || mockRole === "superAdmin",
        noAds: true,
        coins: 1000,
      };
      const mockToken = "demo_jwt_token_" + Date.now();

      login(mockUser, mockToken);
      addToast(`1-Click Fast Login successful! Welcome, ${mockUser.name}`, "success");
      if (mockUser.role === "superAdmin") navigate("/admin");
      else if (mockUser.role === "seller" || mockUser.isProShop) navigate("/seller/dashboard");
      else navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      const authData = response.data || response;
      const user = authData.user || authData.data?.user;
      const token = authData.token || authData.data?.token;

      if (user && token) {
        login(user, token);
        addToast(`Welcome back, ${user.name}!`, "success");
        if (user.role === "superAdmin") navigate("/admin");
        else if (user.role === "seller" || user.isProShop) navigate("/seller/dashboard");
        else navigate("/dashboard");
      } else {
        addToast(response.message || "Invalid response from server.", "error");
      }
    } catch (err) {
      addToast(err.message || "Failed to sign in. Please check your credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Sign In to <span className="text-orange-500">MoExpress</span>
          </h1>
          <p className="text-xs text-gray-500">Shop More, Live Better!</p>
        </div>

        {/* Google 1-Click Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className={`w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold text-xs sm:text-sm py-3 rounded-2xl border border-gray-300 dark:border-gray-600 transition flex items-center justify-center gap-3 shadow-sm ${googleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-xs text-gray-400 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span>or sign in with email</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Form */}
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-500">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-orange-500 hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </form>

        {/* Quick 1-Click Demo Seed Account Logins */}
        <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <label className="text-[11px] font-black uppercase tracking-wider text-orange-500 block text-center flex items-center justify-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> Instant 1-Click Demo Fast Logins
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickLogin("superadmin@moexpress.com", "admin123")}
              className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-400 p-2 rounded-xl font-bold transition text-left truncate flex items-center gap-1.5 border border-red-500/20"
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-red-500" /> SuperAdmin
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("admin@moexpress.com", "admin123")}
              className="bg-purple-500/10 hover:bg-purple-500 hover:text-white text-purple-600 dark:text-purple-400 p-2 rounded-xl font-bold transition text-left truncate flex items-center gap-1.5 border border-purple-500/20"
            >
              <Shield className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" /> Admin Staff
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("pro@moexpress.com", "user123")}
              className="bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 p-2 rounded-xl font-bold transition text-left truncate flex items-center gap-1.5 border border-emerald-500/20"
            >
              <Store className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" /> Pro Boutique
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("enterprise@moexpress.com", "user123")}
              className="bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 dark:text-blue-400 p-2 rounded-xl font-bold transition text-left truncate flex items-center gap-1.5 border border-blue-500/20"
            >
              <Zap className="w-3.5 h-3.5 flex-shrink-0 text-blue-500" /> Enterprise Hub
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("premium@moexpress.com", "user123")}
              className="bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-600 dark:text-amber-400 p-2 rounded-xl font-bold transition text-left truncate flex items-center gap-1.5 border border-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" /> Premium VIP
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("buyer@moexpress.com", "user123")}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 dark:text-slate-200 p-2 rounded-xl font-bold transition text-left truncate flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
            >
              <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" /> Normal Buyer
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


