// ============================================================================
// COMPONENT : Button.jsx (Shadcn / Radix Design System)
// ROLE : Reusable button with variants, sizes, icons & loading states
// ============================================================================

import React from "react";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md";

  const variants = {
    primary: "bg-orange-500 hover:bg-brand-accent text-white focus:ring-brand-orange",
    golden: "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-95 focus:ring-brand-golden",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-700 border border-gray-700",
    outline: "border-2 border-brand-orange text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-brand-orange",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-gray-500 shadow-none",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-600",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-xs sm:text-sm px-5 py-2.5 gap-2",
    lg: "text-sm sm:text-base px-7 py-3.5 gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
