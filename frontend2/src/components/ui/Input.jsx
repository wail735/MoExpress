// ============================================================================
// COMPONENT : Input.jsx (Shadcn Design System)
// ROLE : Modern Input with Icon Support and Error States
// ============================================================================

import React from "react";

export const Input = ({
  label,
  error,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 ${
            Icon ? "pl-10" : "pl-3"
          } rounded-xl border ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 dark:border-gray-700 focus:border-orange-500"
          } text-slate-900 dark:text-white focus:outline-none transition ${className}`}
          {...props}
        />
        {Icon && <Icon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />}
      </div>
      {error && <p className="text-[11px] text-red-500 font-semibold">{error}</p>}
    </div>
  );
};

export default Input;
