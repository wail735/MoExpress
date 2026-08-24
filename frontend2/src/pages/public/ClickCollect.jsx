// ============================================================================
// PAGE : ClickCollect.jsx
// ROLE : Click & Collect Store Pickup & Locker Locator inspired by Target Drive Up (/click-collect)
// ============================================================================

import React, { useState } from "react";
import { MapPin, Building, Truck, Search, Check, Clock, Navigation } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const ClickCollect = () => {
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocker, setSelectedLocker] = useState(null);

  const initialLockers = [
    { id: "l1", name: "MoLocker Hub Algiers Station", location: "Grande Poste Metro Station, Algiers", city: "Algiers", status: "24/7 Available", slots: 14, distance: "1.2 km" },
    { id: "l2", name: "MoExpress Drive-Up Oran", location: "Es Senia Shopping Mall, Oran", city: "Oran", status: "Drive-Up Open", slots: 8, distance: "3.5 km" },
    { id: "l3", name: "Constantine Tech Hub Locker", location: "University District, Constantine", city: "Constantine", status: "24/7 Available", slots: 22, distance: "0.8 km" },
    { id: "l4", name: "Annaba Coastal Express Hub", location: "Port District, Annaba", city: "Annaba", status: "Express Pickup", slots: 5, distance: "2.1 km" },
  ];

  const filteredLockers = initialLockers.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocker = (locker) => {
    setSelectedLocker(locker.id);
    addToast(`Pickup location set to "${locker.name}"! Available for pickup in 2 hours.`, "success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Truck className="w-4 h-4" /> Click & Collect Lockers
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Store Pickup & Express Lockers</h1>
        <p className="text-xs text-gray-500">Pick up your online orders in under 2 hours at 24/7 automated lockers across Algeria</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by city (e.g. Algiers, Oran, Constantine) or station..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
        />
      </div>

      {/* Lockers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLockers.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-xs text-gray-500">No lockers found matching "{searchQuery}"</div>
        ) : (
          filteredLockers.map((l) => {
            const isSelected = selectedLocker === l.id;
            return (
              <div
                key={l.id}
                className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border transition shadow-xl space-y-4 ${
                  isSelected ? "border-brand-orange ring-2 ring-brand-orange/40" : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Building className="w-5 h-5 text-orange-500" /> {l.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4 text-orange-500" /> {l.location}
                    </p>
                  </div>
                  <span className="inline-block bg-green-600/20 text-green-400 border border-green-500/30 text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex-shrink-0">
                    {l.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange-500" /> {l.slots} Open Lockers</span>
                  <span className="flex items-center gap-1"><Navigation className="w-3.5 h-3.5 text-blue-400" /> {l.distance} away</span>
                </div>

                <button
                  onClick={() => handleSelectLocker(l)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "bg-orange-500 text-white hover:bg-brand-accent shadow-md"
                  }`}
                >
                  {isSelected ? <><Check className="w-4 h-4" /> Selected Pickup Hub</> : "Select Pickup Location"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ClickCollect;
