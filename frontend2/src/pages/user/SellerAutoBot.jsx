// ============================================================================
// PAGE : SellerAutoBot.jsx
// ROLE : 24/7 Automated Boutique FAQ Chat Bot Configurator (/seller/bot)
// ============================================================================

import React, { useState } from "react";
import { MessageSquare, Save, Bot } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerAutoBot = () => {
  const { addToast } = useNotification();
  const [welcomeMsg, setWelcomeMsg] = useState("Hello! Welcome to Sony Official Flagship Store. How can we help you today?");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("24/7 Automated Boutique Chatbot saved!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Bot className="w-8 h-8 text-orange-500" /> 24/7 Automated Boutique FAQ Bot
        </h1>
        <p className="text-xs text-gray-500">Configure auto-reply messages to answer customer queries 24/7 automatically</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div>
          <label className="text-gray-500 font-semibold block mb-1">Automated Greeting Message</label>
          <textarea
            value={welcomeMsg}
            onChange={(e) => setWelcomeMsg(e.target.value)}
            rows="3"
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border focus:outline-none"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save Chatbot Settings
        </button>
      </form>
    </div>
  );
};

export default SellerAutoBot;
