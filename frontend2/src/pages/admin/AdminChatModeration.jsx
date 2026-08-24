// ============================================================================
// PAGE : AdminChatModeration.jsx
// ROLE : Live Buyer/Seller Chat Interception & Scam Moderation (/admin/chats-moderation)
// ============================================================================

import React, { useState } from "react";
import { MessageSquare, ShieldAlert, AlertTriangle, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminChatModeration = () => {
  const { addToast } = useNotification();
  const [chats] = useState([
    { id: "chat_101", buyer: "sarah@example.com", seller: "pro@moexpress.com", lastMsg: "Can you send money directly to my personal WhatsApp instead?", flagged: true },
    { id: "chat_102", buyer: "karim@example.com", seller: "enterprise@moexpress.com", lastMsg: "When will the wholesale shipment be dispatched?", flagged: false },
  ]);

  const handleFlag = (id) => {
    addToast(`Chat #${id} flagged & seller account warned for off-platform payment attempt!`, "error");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Live Chat Moderation & Scam Interception</h1>
        <p className="text-xs text-gray-400">Inspect live buyer/seller chat rooms and prevent off-platform payment fraud</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {chats.map((c) => (
            <div key={c.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              c.flagged ? "bg-red-600/10 border-red-500/40" : "bg-gray-800/60 border-gray-700"
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Buyer: {c.buyer}</span>
                  <span className="text-gray-400">↔</span>
                  <span className="font-bold text-orange-500">Seller: {c.seller}</span>
                  {c.flagged && <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">Scam Warning</span>}
                </div>
                <p className="text-gray-300 mt-1 italic">"{c.lastMsg}"</p>
              </div>

              <button
                onClick={() => handleFlag(c.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-[11px]"
              >
                Warn Seller & Issue Strike
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminChatModeration;
