// ============================================================================
// PAGE : AdminLocalesEditor.jsx
// ROLE : Live Translation Key & 9 Locales Editor (/admin/locales)
// ============================================================================

import React, { useState } from "react";
import { Globe, Save } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminLocalesEditor = () => {
  const { addToast } = useNotification();
  const [activeLang, setActiveLang] = useState("fr");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Rechercher des produits...");

  const handleSave = (e) => {
    e.preventDefault();
    addToast(`Translation keys for locale [${activeLang.toUpperCase()}] updated!`, "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Translation & Locales Key Editor</h1>
        <p className="text-xs text-gray-400">Edit translation strings for all 9 supported languages (EN, FR, AR, ES, PT, IT, DE, RU, TR)</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-orange-500" /> Edit Locale Translation Strings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-semibold block mb-1">Target Language</label>
            <select
              value={activeLang}
              onChange={(e) => setActiveLang(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            >
              <option value="en">English (EN)</option>
              <option value="fr">Français (FR)</option>
              <option value="ar">العربية (AR - RTL)</option>
              <option value="es">Español (ES)</option>
              <option value="pt">Português (PT)</option>
              <option value="it">Italiano (IT)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="ru">Русский (RU)</option>
              <option value="tr">Türkçe (TR)</option>
            </select>
          </div>

          <div>
            <label className="text-gray-400 font-semibold block mb-1">Search Placeholder String</label>
            <input
              type="text"
              value={searchPlaceholder}
              onChange={(e) => setSearchPlaceholder(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <button type="submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-xs">
          <Save className="w-4 h-4" /> Save Translation Keys
        </button>
      </form>
    </div>
  );
};

export default AdminLocalesEditor;
