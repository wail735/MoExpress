// ============================================================================
// PAGE : UserAddresses.jsx
// ROLE : Saved Address Book & Geolocation Map Picker (/user/addresses)
// ============================================================================

import React, { useState } from "react";
import { MapPin, Plus, Trash2, Check } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const UserAddresses = () => {
  const { addToast } = useNotification();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Algiers");
  const [wilaya, setWilaya] = useState("16 - Alger");

  const [addresses, setAddresses] = useState([
    { id: "a1", street: "12 Didouche Mourad Street", city: "Algiers", wilaya: "16 - Alger", isDefault: true },
  ]);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!street.trim()) return;
    setAddresses((prev) => [...prev, { id: "a_" + Date.now(), street, city, wilaya, isDefault: false }]);
    addToast("New shipping address saved to address book!", "success");
    setStreet("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-8 h-8 text-orange-500" /> Saved Address Book
        </h1>
        <p className="text-xs text-gray-500">Manage saved shipping addresses and GPS delivery locations</p>
      </div>

      <form onSubmit={handleAddAddress} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> Add New Shipping Address
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-gray-500 font-semibold block mb-1">Street Address</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. 24 Boulevard Zirout Youcef"
              required
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Wilaya / State</label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            >
              <option value="16 - Alger">16 - Alger</option>
              <option value="31 - Oran">31 - Oran</option>
              <option value="25 - Constantine">25 - Constantine</option>
              <option value="06 - Béjaïa">06 - Béjaïa</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs"
        >
          <Plus className="w-4 h-4" /> Save Address
        </button>
      </form>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Saved Addresses</h3>
        {addresses.map((a) => (
          <div key={a.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{a.street}, {a.city}</p>
              <span className="text-gray-400">{a.wilaya}</span>
              {a.isDefault && <span className="ml-2 bg-orange-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">Default Address</span>}
            </div>
            <button onClick={() => setAddresses((prev) => prev.filter((item) => item.id !== a.id))} className="text-red-400 hover:text-red-300">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddresses;
