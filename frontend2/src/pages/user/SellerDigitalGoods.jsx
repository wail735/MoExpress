// ============================================================================
// PAGE : SellerDigitalGoods.jsx
// ROLE : Digital License Keys, E-Books & Software Download Manager (/seller/digital-goods)
// ============================================================================

import React, { useState } from "react";
import { Download, Plus, FileText } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerDigitalGoods = () => {
  const { addToast } = useNotification();
  const [digitalGoods] = useState([
    { id: "dg_1", title: "Photoshop Pro Preset Pack", type: "ZIP Download", sales: 142 },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Download className="w-8 h-8 text-orange-500" /> Digital Downloads & License Keys
        </h1>
        <p className="text-xs text-gray-500">Sell software license keys, PDF e-books, and digital download products</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-xs">
        {digitalGoods.map((g) => (
          <div key={g.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{g.title}</h4>
              <span className="text-gray-400">Type: {g.type} | Sales: {g.sales} downloads</span>
            </div>
            <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDigitalGoods;
