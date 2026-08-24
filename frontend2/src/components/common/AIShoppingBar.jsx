// ============================================================================
// COMPONENT : AIShoppingBar.jsx
// ROLE : Floating Bottom AI Advisor Bar for Smart Product Recommendations
// ============================================================================

import React, { useState } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export const AIShoppingBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden md:flex items-center gap-3 bg-gradient-to-r from-brand-navy via-slate-900 to-brand-dark text-white p-3.5 px-5 rounded-full border border-brand-orange/40 shadow-2xl animate-pulse-subtle">
      <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
      <span className="text-xs font-bold">Ollama AI Tip: <strong>Sony Headphones are 50% OFF in Flash Sale!</strong></span>
      <Link to="/flash-deals" className="bg-orange-500 hover:bg-brand-accent text-white text-[11px] font-bold px-3 py-1 rounded-full transition flex items-center gap-1 shadow-md">
        View Deal <ArrowRight className="w-3 h-3" />
      </Link>
      <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-white ml-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AIShoppingBar;
