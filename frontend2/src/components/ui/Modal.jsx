// ============================================================================
// COMPONENT : Modal.jsx (Shadcn Design System)
// ROLE : Backdrop Blur Accessible Dialog Window
// ============================================================================

import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-xl" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className={`bg-white dark:bg-slate-900 w-full ${maxWidth} p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-xs sm:text-sm text-slate-900 dark:text-white transform transition-all duration-300 scale-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
