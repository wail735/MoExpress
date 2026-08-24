// ============================================================================
// COMPONENT : Select.jsx (Shadcn Design System)
// ROLE : Modern Styled Select Dropdown Control
// ============================================================================

import React from "react";

export const Select = ({ label, options = [], value, onChange, className = "", required = false, ...props }) => {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
