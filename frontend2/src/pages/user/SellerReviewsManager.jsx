// ============================================================================
// PAGE : SellerReviewsManager.jsx
// ROLE : Customer Review & Store Feedback Response Manager (/seller/reviews)
// ============================================================================

import React, { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerReviewsManager = () => {
  const { addToast } = useNotification();
  const [replyText, setReplyText] = useState("");

  const reviews = [
    { id: "r1", customer: "Amine K.", rating: 5, comment: "Fast shipping to Algiers and original Sony quality!", product: "Sony WH-1000XM5", date: "20 Aug 2026" },
  ];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addToast("Public response published to store review!", "success");
    setReplyText("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="w-8 h-8 text-yellow-400 fill-current" /> Customer Review & Feedback Manager
        </h1>
        <p className="text-xs text-gray-500">View customer product ratings and publish public store responses</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{r.customer}</span>
                <span className="text-yellow-400 font-bold">★ {r.rating} / 5</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"{r.comment}"</p>
              <form onSubmit={handleSendReply} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a public seller response..."
                  required
                  className="flex-1 bg-white dark:bg-gray-900 text-slate-900 dark:text-white p-2.5 rounded-xl border focus:outline-none"
                />
                <button type="submit" className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Reply
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerReviewsManager;
