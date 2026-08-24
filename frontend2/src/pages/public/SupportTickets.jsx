// ============================================================================
// PAGE : SupportTickets.jsx
// ROLE : Customer Support Ticket Portal (/tickets)
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LifeBuoy, Plus, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

export const SupportTickets = () => {
  const { addToast } = useNotification();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const tickets = [
    { id: "TK-101", subject: "Refund Status on Order #98765", status: "open", date: "21 Aug 2026" },
    { id: "TK-102", subject: "Pro Shop Badge Verification Query", status: "resolved", date: "18 Aug 2026" },
  ];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast("Please log in to open a support ticket!", "warning");
      navigate("/login");
      return;
    }
    addToast(`Support ticket created successfully!`, "success");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <LifeBuoy className="w-4 h-4" /> Support Portal
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Support Ticket Management</h1>
        <p className="text-xs text-gray-500">Track open help inquiries or submit a new support request</p>
      </div>

      <form onSubmit={handleCreateTicket} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> Open New Support Ticket
        </h3>

        <div>
          <label className="text-gray-500 font-semibold block mb-1">Ticket Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of your inquiry..."
            required
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-gray-500 font-semibold block mb-1">Message Details</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain your issue in detail..."
            required
            rows="4"
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          Submit Ticket
        </button>
      </form>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
          My Active Support Tickets
        </h3>
        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-orange-500">{t.id}</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.subject}</h4>
                <span className="text-gray-400 text-[10px]">{t.date}</span>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                t.status === "resolved" ? "bg-green-600 text-white" : "bg-yellow-500 text-slate-900"
              }`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
