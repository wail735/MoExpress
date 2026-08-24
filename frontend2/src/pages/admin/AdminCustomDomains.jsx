// ============================================================================
// PAGE : AdminCustomDomains.jsx
// ROLE : Pro Boutique CNAME Custom Domain Manager (/admin/custom-domains)
// ============================================================================

import React, { useState } from "react";
import { Globe, Check, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminCustomDomains = () => {
  const { addToast } = useNotification();
  const [domains, setDomains] = useState([
    { id: "cd_1", domain: "shop.sony.com", shop: "Sony Official Store", status: "active", ssl: "valid" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Pro Boutique Custom Domain CNAME Mappings</h1>
        <p className="text-xs text-gray-400">Manage external domain CNAME records and SSL certificates for Pro Boutiques</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {domains.map((d) => (
            <div key={d.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-mono font-bold text-sm text-orange-500">{d.domain}</h4>
                <p className="text-gray-400">Boutique: {d.shop} | SSL Status: <span className="text-green-400 font-bold">{d.ssl}</span></p>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">{d.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomDomains;
