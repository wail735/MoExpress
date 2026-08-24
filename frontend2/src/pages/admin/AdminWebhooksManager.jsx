// ============================================================================
// PAGE : AdminWebhooksManager.jsx
// ROLE : Webhook Endpoints & Third-Party Integrations Manager (/admin/webhooks)
// ============================================================================

import React, { useState } from "react";
import { Globe, Plus, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminWebhooksManager = () => {
  const { addToast } = useNotification();
  const [webhooks] = useState([
    { id: "wh_1", url: "https://api.yalidine.com/v1/webhook", event: "order.shipped", status: "active" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">API Webhooks & Logistics Integrations</h1>
        <p className="text-xs text-gray-400">Configure outbound HTTP webhooks for logistics tracking, CRM, and analytics</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">Active Webhook Endpoints</h3>
        <div className="space-y-3">
          {webhooks.map((w) => (
            <div key={w.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-mono font-bold text-sm text-orange-500">{w.url}</h4>
                <p className="text-gray-400">Subscribed Event: <span className="font-mono text-white">{w.event}</span></p>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">{w.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWebhooksManager;
