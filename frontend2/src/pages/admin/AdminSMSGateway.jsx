// ============================================================================
// PAGE : AdminSMSGateway.jsx
// ROLE : Twilio / Infobip SMS OTP Gateway Configurator (/admin/sms-gateway)
// ============================================================================

import React, { useState } from "react";
import { Phone, Save, Send } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminSMSGateway = () => {
  const { addToast } = useNotification();
  const [provider, setProvider] = useState("Twilio");
  const [accountSid, setAccountSid] = useState("AC_TWILIO_SAMPLE_SID_2026");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("SMS Gateway configuration saved!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">SMS Gateway & OTP Verification</h1>
        <p className="text-xs text-gray-400">Configure Twilio or Infobip SMS API keys for phone number verification</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">SMS Provider</label>
            <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full bg-gray-800 text-white p-3 rounded-xl border focus:outline-none">
              <option value="Twilio">Twilio SMS API</option>
              <option value="Infobip">Infobip Global SMS</option>
            </select>
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Account SID / API Key</label>
            <input type="text" value={accountSid} onChange={(e) => setAccountSid(e.target.value)} className="w-full bg-gray-800 text-white p-3 rounded-xl border focus:outline-none font-mono" />
          </div>
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 text-xs">
          <Save className="w-4 h-4" /> Save SMS Credentials
        </button>
      </form>
    </div>
  );
};

export default AdminSMSGateway;
