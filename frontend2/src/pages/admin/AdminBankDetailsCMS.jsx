// ============================================================================
// PAGE : AdminBankDetailsCMS.jsx
// ROLE : SuperAdmin Control for Official Algerian RIB, Algérie Poste CCP RIP & Visa IBAN
// ============================================================================

import React, { useState } from "react";
import { Building, Save, ShieldCheck, CreditCard } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminBankDetailsCMS = () => {
  const { addToast } = useNotification();

  const [bankName, setBankName] = useState("Banque Nationale d'Algérie (BNA) / BDL");
  const [ownerName, setOwnerName] = useState("MoExpress Marketplace SARL");
  const [algerianRib, setAlgerianRib] = useState("00100 234567890123456 78");
  const [agency, setAgency] = useState("Alger Centre");

  const [ccpAccount, setCcpAccount] = useState("1234567 Clé 89");
  const [algerianRip, setAlgerianRip] = useState("00799999000123456789 22");

  const [visaBank, setVisaBank] = useState("Paysera / Wise International Bank");
  const [iban, setIban] = useState("LT12 3456 7890 1234 5678");
  const [swift, setSwift] = useState("PAYSLT21XXX");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Official platform bank RIB & CCP RIP coordinates updated successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Official Bank Accounts & Payment Coordinates</h1>
        <p className="text-xs text-gray-400">Configure official Algerian Bank RIB, Algérie Poste CCP/RIP, and Visa IBAN details displayed to customers</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
        {/* Algerian Bank RIB */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
          <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-500" /> Algerian Bank RIB (BNA / BDL)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 font-semibold block mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400 font-semibold block mb-1">Account Owner Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400 font-semibold block mb-1">RIB (20 Digits)</label>
              <input
                type="text"
                value={algerianRib}
                onChange={(e) => setAlgerianRib(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 font-mono text-amber-500"
              />
            </div>
            <div>
              <label className="text-gray-400 font-semibold block mb-1">Bank Agency</label>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Algérie Poste CCP / RIP */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
          <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-yellow" /> Algérie Poste CCP & RIP
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 font-semibold block mb-1">CCP Account Number</label>
              <input
                type="text"
                value={ccpAccount}
                onChange={(e) => setCcpAccount(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 font-mono"
              />
            </div>
            <div>
              <label className="text-gray-400 font-semibold block mb-1">RIP (20 Digits)</label>
              <input
                type="text"
                value={algerianRip}
                onChange={(e) => setAlgerianRip(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 font-mono text-amber-500"
              />
            </div>
          </div>
        </div>

        {/* International Visa IBAN */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
          <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-400" /> International Visa / Paysera / Wise Bank Account
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 font-semibold block mb-1">International Bank</label>
              <input
                type="text"
                value={visaBank}
                onChange={(e) => setVisaBank(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400 font-semibold block mb-1">IBAN</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 font-mono"
              />
            </div>
            <div>
              <label className="text-gray-400 font-semibold block mb-1">SWIFT / BIC Code</label>
              <input
                type="text"
                value={swift}
                onChange={(e) => setSwift(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Bank Coordinates
        </button>
      </form>
    </div>
  );
};

export default AdminBankDetailsCMS;
