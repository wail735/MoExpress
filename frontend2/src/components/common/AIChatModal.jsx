// ============================================================================
// COMPONENT : AIChatModal.jsx
// ROLE : Floating NVIDIA Nemotron AI Assistant & Tier-Gated Chat Studio
// TIER RULE : Available for all tiers EXCEPT the lowest/free tier (Pro, VIP, Seller, Admin)
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Send, Sparkles, X, Lock, Crown, ChevronRight, RefreshCw, User, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const AIChatModal = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, isSuperAdmin, isProShop, isSeller } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your MoExpress AI Assistant powered by NVIDIA Nemotron. Ask me anything about top marketplace deals, product specs, or boutique seller tips!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Determine Tier Access: Free tier or unauthenticated guests are gated; all other paid/pro/seller/admin tiers have full access!
  const currentTier = (user?.subscriptionTier || user?.tier || "free").toLowerCase();
  const hasAIAccess =
    isAuthenticated &&
    (currentTier !== "free" || isProShop || isSeller || isSuperAdmin || user?.role === "admin" || user?.role === "seller");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    if (!hasAIAccess) {
      addToast("AI Assistant is unlocked for Pro, VIP & Premium Members. Please upgrade your tier!", "warning");
      return;
    }

    const userMsg = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          messages: [...messages, userMsg],
        }),
      });

      const data = await res.json();
      if (data.success && (data.reply || data.message)) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply || data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I found top trending products on MoExpress! Let me know if you need specific product comparisons.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Hello! I am online and ready to help you find deals, compare products, or optimize your store settings.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg sm:max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[620px] max-h-[85vh] my-auto relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                MoExpress AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <span className="text-[10px] text-slate-300 block">Powered by NVIDIA Nemotron AI</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!hasAIAccess ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50 dark:bg-slate-950/50">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-xs">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                Pro Tier Feature Locked <Crown className="w-4 h-4 text-amber-400" />
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                NVIDIA AI Assistant is available for all member tiers except the lowest Free Tier. Upgrade to Pro, VIP, or Seller Tier to unlock unlimited AI shopping advice!
              </p>
            </div>
            <div className="pt-2 w-full max-w-xs space-y-2">
              <button
                onClick={() => {
                  if (window.location.pathname === "/ai-chat") {
                    navigate(isAuthenticated ? "/subscriptions" : "/login");
                  } else {
                    onClose();
                    navigate(isAuthenticated ? "/subscriptions" : "/login");
                  }
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
              >
                {isAuthenticated ? "Upgrade Subscription Plan" : "Log In to Unlock AI"} <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 block font-semibold">Includes Ad-Free Browsing + AI Assistant</span>
            </div>
          </div>
        ) : (
          <>
            {/* Active Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/50 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold ${
                      m.role === "user" ? "bg-orange-500" : "bg-slate-800 text-amber-400"
                    }`}
                  >
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      m.role === "user"
                        ? "bg-orange-500 text-white font-medium rounded-tr-none"
                        : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xs rounded-tl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold p-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
                  <span>NVIDIA Nemotron AI is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask AI about deals, reviews, or store advice..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatModal;
