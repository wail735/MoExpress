// ============================================================================
// PAGE : AdminNotificationBroadcaster.jsx
// ROLE : Targeted Push Notifications & Announcement Sender (/admin/notifications-sender)
// ============================================================================

import React, { useState } from "react";
import { Bell, Send, Users } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminNotificationBroadcaster = () => {
  const { addToast } = useNotification();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    addToast(`Targeted Push Notification broadcasted to [${targetAudience}] audience!`, "success");
    setTitle("");
    setMessage("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Targeted Push Notification Broadcaster</h1>
        <p className="text-xs text-gray-400">Broadcast push notifications and alert banners to specific user segments</p>
      </div>

      <form onSubmit={handleSendBroadcast} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-500" /> Compose Push Notification Alert
        </h3>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Target Segment</label>
          <select
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
          >
            <option value="all">All Marketplace Users</option>
            <option value="buyers">Buyers Only</option>
            <option value="sellers">Sellers & Pro Shops Only</option>
            <option value="pro_subscribers">VIP Subscribers Only</option>
          </select>
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Notification Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="🔥 Mega Flash Sale Event Started!"
            required
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none font-bold text-amber-500"
          />
        </div>

        <div>
          <label className="text-gray-400 font-semibold block mb-1">Notification Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Check out our latest flash deals up to 70% off..."
            required
            rows="3"
            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs"
        >
          <Send className="w-4 h-4" /> Broadcast Push Notification
        </button>
      </form>
    </div>
  );
};

export default AdminNotificationBroadcaster;
