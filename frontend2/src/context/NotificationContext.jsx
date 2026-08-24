// ============================================================================
// CONTEXT : NotificationContext.jsx
// ROLE : Toast notifications and WebSocket notification sync
// ============================================================================

import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Notification Renderer */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 transform transition-all duration-300 ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : toast.type === "error"
                ? "bg-red-600 text-white"
                : toast.type === "warning"
                ? "bg-yellow-500 text-slate-900"
                : "bg-slate-900 text-white text-white border border-brand-orange"
            }`}
          >
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-auto opacity-70 hover:opacity-100 text-xs">
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
