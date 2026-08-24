// ============================================================================
// PAGE : FranchiseDirectory.jsx
// ROLE : Retail Chain Store Outlets & Physical Location Finder (/franchises)
// ============================================================================

import React, { useState } from "react";
import { Building, MapPin, Phone, ExternalLink, Search, Plus, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const FranchiseDirectory = () => {
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicant, setApplicant] = useState({ name: "", city: "", phone: "", email: "" });

  const franchises = [
    { id: "f1", name: "MoExpress Flagship Store Algiers", address: "42 Rue Larbi Ben M'hidi, Alger Centre", city: "Algiers", phone: "+213 21 00 11 22", hours: "09:00 - 21:00" },
    { id: "f2", name: "MoExpress Western Hub Oran", address: "15 Boulevard de la Soummam", city: "Oran", phone: "+213 41 33 44 55", hours: "09:00 - 20:00" },
    { id: "f3", name: "MoExpress East Plaza Constantine", address: "Avenue Zighoud Youcef", city: "Constantine", phone: "+213 31 55 66 77", hours: "08:30 - 20:30" },
  ];

  const filteredFranchises = franchises.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (e) => {
    e.preventDefault();
    if (!applicant.name || !applicant.city || !applicant.phone) {
      addToast("Please fill in all franchise application details", "error");
      return;
    }
    setShowApplyModal(false);
    setApplicant({ name: "", city: "", phone: "", email: "" });
    addToast("Franchise application submitted! Our team will contact you within 48h.", "success");
  };

  const handleDirections = (fName) => {
    addToast(`GPS Directions generated for ${fName}!`, "info");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Building className="w-4 h-4" /> Physical Store Directory
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Franchise & Retail Outlets</h1>
        <p className="text-xs text-gray-500">Visit our physical brick-and-mortar stores for direct pickup, warranty claims, and customer care</p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stores by city or street address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowApplyModal(true)}
          className="w-full sm:w-auto bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Apply for Franchise
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFranchises.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-xs text-gray-500">No store outlets found matching "{searchQuery}"</div>
        ) : (
          filteredFranchises.map((f) => (
            <div key={f.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-orange-500" /> {f.name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-orange-500" /> {f.address}, {f.city}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                <span className="font-mono flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-orange-500" /> {f.phone}</span>
                <span>Open: {f.hours}</span>
              </div>
              <button
                onClick={() => handleDirections(f.name)}
                className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                Get GPS Directions <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Franchise Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Apply to Open a MoExpress Store</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Full Name / Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. SARL Commercial Express"
                  value={applicant.name}
                  onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Target City</label>
                  <input
                    type="text"
                    placeholder="Setif"
                    value={applicant.city}
                    onChange={(e) => setApplicant({ ...applicant, city: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+213 550 00 11 22"
                    value={applicant.phone}
                    onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-brand-accent text-white font-bold py-3 rounded-xl shadow-lg transition mt-2"
              >
                Submit Franchise Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FranchiseDirectory;
