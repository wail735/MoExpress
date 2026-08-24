// ============================================================================
// PAGE : AdminSMTPSettings.jsx
// ROLE : Automated Email SMTP Server Configurator & Template Editor (/admin/smtp-settings)
// ============================================================================

import React, { useState } from "react";
import { Mail, Save, Send } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminSMTPSettings = () => {
  const { addToast } = useNotification();
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState(587);
  const [smtpUser, setSmtpUser] = useState("notifications@moexpress.com");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("SMTP Mail Server configuration saved successfully!", "success");
  };

  const handleSendTestEmail = () => {
    addToast("Test email sent to superadmin@moexpress.com!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">SMTP Email Server Configuration</h1>
        <p className="text-xs text-gray-400">Configure system email gateway, SMTP credentials, and Nodemailer transport settings</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-orange-500" /> SMTP Server Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">SMTP Host</label>
            <input
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">SMTP Port</label>
            <input
              type="number"
              value={smtpPort}
              onChange={(e) => setSmtpPort(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Sender Email</label>
            <input
              type="email"
              value={smtpUser}
              onChange={(e) => setSmtpUser(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs">
            <Save className="w-4 h-4" /> Save SMTP Config
          </button>
          <button type="button" onClick={handleSendTestEmail} className="bg-gray-800 text-gray-300 font-bold px-4 py-3 rounded-full hover:bg-gray-700 transition flex items-center gap-2 text-xs">
            <Send className="w-4 h-4" /> Send Test Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSMTPSettings;
