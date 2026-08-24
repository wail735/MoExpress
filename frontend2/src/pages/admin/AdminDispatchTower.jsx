// ============================================================================
// PAGE : AdminDispatchTower.jsx
// ROLE : Live Driver Map & Logistics Dispatch Control Tower (/admin/dispatch-tower)
// ============================================================================

import React, { useState } from "react";
import { Truck, MapPin, Radio } from "lucide-react";

export const AdminDispatchTower = () => {
  const [drivers] = useState([
    { id: "drv_1", name: "Courier Driver 101 (Yalidine)", location: "Algiers Center Sector 4", status: "delivering" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Logistics Dispatch Control Tower</h1>
        <p className="text-xs text-gray-400">Live map tracking for active delivery drivers, express couriers, and dispatch routes</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <div className="space-y-3">
          {drivers.map((d) => (
            <div key={d.id} className="p-4 bg-gray-800/60 rounded-2xl border border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{d.name}</h4>
                <p className="text-gray-400"><MapPin className="w-3.5 h-3.5 inline text-orange-500" /> Sector: {d.location}</p>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> Active Dispatch
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDispatchTower;
