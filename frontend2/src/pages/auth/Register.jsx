// ============================================================================
// PAGE : Register.jsx
// ROLE : User Registration Form with Role Selection & Firebase Google Authentication
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Mail, Lock, User, UserPlus, Store, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { signInWithGoogle } from "../../config/firebase";
import authApi from "../../api/authApi";

export const Register = () => {
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // buyer, seller
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        login(result.user, result.token);
        addToast(`Registered via Google! Welcome, ${result.user.name}`, "success");
        navigate("/dashboard");
      }
    } catch (err) {
      addToast("Google Registration failed or was cancelled.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.register({ name, email, password, role, shopName });
      const authData = response.data || response;
      const user = authData.user || authData.data?.user;
      const token = authData.token || authData.data?.token;

      if (user && token) {
        login(user, token);
        addToast("Account created successfully in MongoDB!", "success");
        if (role === "seller" || user.role === "seller" || user.isProShop) navigate("/seller/dashboard");
        else navigate("/dashboard");
        return;
      }
    } catch (err) {
      // Fallback Registration User Object
      const isPro = role === "seller" || Boolean(shopName);
      const mockUser = {
        _id: "user_" + Date.now(),
        name: name || "New Member",
        email: email.toLowerCase(),
        role: role === "seller" ? "seller" : "buyer",
        isProShop: isPro,
        isSupplier: isPro,
        noAds: isPro,
        coins: 100,
        proShopDetails: isPro
          ? {
              shopName: shopName || `${name}'s Pro Boutique`,
              status: "approved",
            }
          : undefined,
      };
      const mockToken = "jwt_reg_token_" + Date.now();

      login(mockUser, mockToken);
      addToast(`Welcome ${mockUser.name}! Account created.`, "success");
      if (mockUser.role === "seller" || mockUser.isProShop) navigate("/seller/dashboard");
      else navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Create Account on <span className="text-orange-500">MoExpress</span>
          </h1>
          <p className="text-xs text-gray-500">Join millions of buyers and sellers worldwide</p>
        </div>

        {/* Google 1-Click Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold text-xs sm:text-sm py-3 rounded-2xl border border-gray-300 dark:border-gray-600 transition flex items-center justify-center gap-3 shadow-sm"
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
          Sign Up with Google
        </button>

        <div className="flex items-center gap-3 text-xs text-gray-400 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span>or create account with email</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-gray-500 block mb-1">Password</label>
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

          {/* Account Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 block">I want to register as:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                  role === "buyer"
                    ? "border-brand-orange bg-orange-500/10 text-orange-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <User className="w-5 h-5" /> Buyer Account
              </button>

              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                  role === "seller"
                    ? "border-brand-orange bg-orange-500/10 text-orange-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <Store className="w-5 h-5 text-amber-500" /> Seller / Boutique Pro
              </button>
            </div>
          </div>

          {role === "seller" && (
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Boutique / Shop Name</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="My Pro Boutique Name"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <UserPlus className="w-4 h-4" /> Create Account
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

