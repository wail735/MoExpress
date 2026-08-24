// ============================================================================
// COMPONENT : Badge.jsx (Shadcn Design System)
// ROLE : Reusable Status Badge Component
// ============================================================================

import React from "react";

export const Badge = ({ children, variant = "default", className = "", icon: Icon }) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-slate-300 dark:border-slate-700",
    pro: "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md",
    supplier: "bg-blue-600 text-white shadow-md",
    success: "bg-green-600/20 text-green-400 border border-green-600/30",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    danger: "bg-red-600/20 text-red-400 border border-red-600/30",
    info: "bg-sky-600/20 text-sky-400 border border-sky-600/30",
  };

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${variants[variant] || variants.default} ${className}`}>
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
