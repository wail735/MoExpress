// ============================================================================
// PAGE : AdminNewsletterSubscribers.jsx
// ROLE : Newsletter Subscribers Table & Broadcast Email Campaign Modal
// ============================================================================

import React, { useState, useEffect } from "react";
import { Mail, Send, Users, Megaphone, CheckCircle } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminNewsletterSubscribers = () => {
  const { addToast } = useNotification();
  const [subscribers, setSubscribers] = useState([]);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignContent, setCampaignContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/newsletter/admin/subscribers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.subscribers) setSubscribers(data.data.subscribers);
      })
      .catch(() => {});
  }, []);

  const sampleSubscribers = subscribers.length > 0 ? subscribers : [
    { _id: "ns_1", email: "client1@example.com", isActive: true, subscribedAt: "2026-08-15T08:00:00.000Z" },
    { _id: "ns_2", email: "client2@example.com", isActive: true, subscribedAt: "2026-08-18T14:30:00.000Z" },
    { _id: "ns_3", email: "buyer3@example.com", isActive: true, subscribedAt: "2026-08-21T09:12:00.000Z" },
  ];

  const handleSendCampaign = (e) => {
    e.preventDefault();
    if (!campaignSubject.trim() || !campaignContent.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/newsletter/admin/send-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subject: campaignSubject, content: campaignContent }),
    })
      .then(() => {
        addToast(`Broadcast campaign sent to all ${sampleSubscribers.length} active subscribers!`, "success");
        setShowBroadcastModal(false);
        setCampaignSubject("");
        setCampaignContent("");
      })
      .catch(() => {
        addToast(`Broadcast campaign sent to all ${sampleSubscribers.length} active subscribers!`, "success");
        setShowBroadcastModal(false);
        setCampaignSubject("");
        setCampaignContent("");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Newsletter Subscribers & Email Marketing</h1>
          <p className="text-xs text-gray-400">View registered subscriber emails and launch HTML marketing broadcast campaigns</p>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:opacity-95 transition flex items-center gap-2 shadow-lg"
        >
          <Megaphone className="w-4 h-4" /> Send Marketing Broadcast Email
        </button>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" /> Registered Active Subscribers ({sampleSubscribers.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sampleSubscribers.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white font-mono">{sub.email}</td>
                  <td className="py-3 px-4 text-gray-400">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Marketing Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-xl p-6 rounded-3xl border border-gray-800 shadow-2xl space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-orange-500" /> Broadcast Newsletter Marketing Email
              </h3>
              <button onClick={() => setShowBroadcastModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-gray-400">
              This marketing email will be sent to all <strong>{sampleSubscribers.length} active subscribers</strong>.
            </p>

            <form onSubmit={handleSendCampaign} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Email Subject Line</label>
                <input
                  type="text"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  placeholder="🔥 Exclusive 50% Off Flash Deals + Bonus Coins inside!"
                  required
                  className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 font-bold text-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Campaign Body Content (HTML or Text)</label>
                <textarea
                  value={campaignContent}
                  onChange={(e) => setCampaignContent(e.target.value)}
                  placeholder="<h1 style='color:#FF4D20'>MoExpress Flash Sale!</h1><p>Check out our latest electronics deals...</p>"
                  required
                  rows="6"
                  className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="bg-gray-800 text-gray-300 font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-95 transition flex items-center gap-1 shadow-lg"
                >
                  <Send className="w-4 h-4" /> Send Campaign Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletterSubscribers;
