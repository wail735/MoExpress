// ============================================================================
// PAGE : AdminWarehouses.jsx
// ROLE : Multi-Warehouse Logistics & Hub Manager (/admin/warehouses)
// ============================================================================

import React, { useState } from "react";
import { Building, MapPin, Plus } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminWarehouses = () => {
  const { addToast } = useNotification();
  const [warehouses] = useState([
    { id: "wh_1", name: "Algiers Central Logistics Hub", city: "Algiers", country: "Algeria", status: "active" },
    { id: "wh_2", name: "Oran Western Express Warehouse", city: "Oran", country: "Algeria", status: "active" },
    { id: "wh_3", name: "Paris Global Export Hub", city: "Paris", country: "France", status: "active" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Fulfillment Warehouses & Hubs</h1>
        <p className="text-xs text-gray-400">Manage regional logistics hubs, fulfillment stock centers, and international warehouses</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {warehouses.map((w) => (
            <div key={w.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{w.name}</h4>
                <p className="text-gray-400"><MapPin className="w-3.5 h-3.5 inline text-orange-500" /> {w.city}, {w.country}</p>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">{w.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWarehouses;
