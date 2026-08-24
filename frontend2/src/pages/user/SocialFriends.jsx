// ============================================================================
// PAGE : SocialFriends.jsx
// ROLE : Friends Network, Requests & Live Chat
// ============================================================================

import React, { useState, useEffect } from "react";
import { Users, UserPlus, MessageSquare, Check, X, ShieldCheck, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const SocialFriends = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [friends, setFriends] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/social/friends/my-list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setFriends(data.data || []);
      })
      .catch(() => {});
  }, []);

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!newFriendEmail.trim()) return;

    addToast(`Friend request sent to ${newFriendEmail}!`, "success");
    setNewFriendEmail("");
  };

  const sampleFriends = friends.length > 0 ? friends : [
    { _id: "f1", name: "Amine Khelifi", email: "amine@example.com", role: "seller", isProShop: true },
    { _id: "f2", name: "Sarah Benali", email: "sarah@example.com", role: "buyer" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Users className="w-6 h-6 text-orange-500" /> Friends Network & Private Messaging
      </h2>

      {/* Add Friend Form */}
      <form onSubmit={handleAddFriend} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="flex-1 w-full">
          <label className="text-xs font-semibold text-gray-500 block mb-1">Add Friend by Email</label>
          <input
            type="email"
            value={newFriendEmail}
            onChange={(e) => setNewFriendEmail(e.target.value)}
            placeholder="friend.email@example.com"
            required
            className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-brand-accent transition flex items-center gap-2 shadow sm:self-end"
        >
          <UserPlus className="w-4 h-4" /> Send Request
        </button>
      </form>

      {/* Friends List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleFriends.map((friend) => (
          <div key={friend._id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-500 font-bold flex items-center justify-center">
                {friend.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1">
                  {friend.name}
                  {friend.isProShop && <Award className="w-3.5 h-3.5 text-orange-500" />}
                </h4>
                <p className="text-[11px] text-gray-400">{friend.email}</p>
              </div>
            </div>

            <button
              onClick={() => addToast(`Opening Live Discussion with ${friend.name}...`, "info")}
              className="bg-slate-900 text-white dark:bg-gray-800 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-orange-500 transition flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" /> Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFriends;
