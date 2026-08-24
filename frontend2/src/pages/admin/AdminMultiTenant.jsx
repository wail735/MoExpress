// ============================================================================
// PAGE : AdminMultiTenant.jsx
// ROLE : Multi-Tenant Database Isolation & Enterprise Workspace Manager (/admin/multi-tenant)
// ============================================================================

import React, { useState } from "react";
import { Building, ShieldCheck } from "lucide-react";

export const AdminMultiTenant = () => {
  const [tenants] = useState([
    { id: "t_1", name: "Sony Enterprise Workspace", dbCluster: "cluster-eu-01", status: "isolated" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Multi-Tenant Store Database Isolation</h1>
        <p className="text-xs text-gray-400">Manage enterprise workspace data isolation rules and MongoDB shard allocation</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {tenants.map((t) => (
            <div key={t.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{t.name}</h4>
                <p className="text-gray-400">Database Shard Cluster: {t.dbCluster}</p>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMultiTenant;
