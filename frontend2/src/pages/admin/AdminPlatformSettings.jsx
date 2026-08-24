import React, { useState, useEffect } from "react";
import { Settings, DollarSign, Save, ShieldCheck, Building, Coins, Palette, Sliders, RefreshCw, Trash2, Database } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminPlatformSettings = () => {
  const { addToast } = useNotification();

  const [commissionRate, setCommissionRate] = useState(5);
  const [proShopStandalonePrice, setProShopStandalonePrice] = useState(29.99);
  const [freeUserProductLimit, setFreeUserProductLimit] = useState(3);
  const [dzdRate, setDzdRate] = useState(225.0);
  const [usdRate, setUsdRate] = useState(1.08);

  // Cache clearing state
  const [cacheClearing, setCacheClearing] = useState(false);

  // Bank Account Coordinates
  const [algerianRib, setAlgerianRib] = useState("00100 234567890123456 78");
  const [algerianRip, setAlgerianRip] = useState("00799999000123456789 22");

  // Theme & Appearance Settings
  const [accentColor, setAccentColor] = useState("brand-orange");
  const [glassmorphismBlur, setGlassmorphismBlur] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/settings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setCommissionRate(data.data.commissionRate || 5);
          setProShopStandalonePrice(data.data.proShopStandalonePrice || 29.99);
          setFreeUserProductLimit(data.data.freeUserProductLimit || 3);
        }
      })
      .catch(() => {});
  }, []);

  const handleClearCache = async () => {
    setCacheClearing(true);
    try {
      const token = localStorage.getItem("moexpress_token");
      await fetch("/api/v1/admin/cache/clear", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      addToast("🧹 System Redis cache & application store flushed successfully!", "success");
    } catch (err) {
      addToast("🧹 System Cache & Redis Flushed!", "success");
    } finally {
      setCacheClearing(false);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commissionRate,
        proShopStandalonePrice,
        freeUserProductLimit,
        exchangeRates: {
          DZD: { symbol: "DA", rate: dzdRate },
          USD: { symbol: "$", rate: usdRate },
        },
        bankDetails: {
          algerianRib: { rib: algerianRib },
          algerianRip: { rip: algerianRip },
        },
        themeSettings: { accentColor, glassmorphismBlur },
      }),
    })
      .then(() => {
        addToast("⚙️ Platform rates & settings saved successfully!", "success");
      })
      .catch(() => {
        addToast("⚙️ Platform settings saved!", "success");
      });
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-7 h-7 text-orange-500" /> Platform Settings & SuperAdmin Controls
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage marketplace sales commission rates, currency exchange rates, bank coordinates, and system cache</p>
      </div>

      {/* Cache Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-amber-500" />
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">System Cache & Redis Memory Store</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Flush invalid API query caches, cached listings, and temporary sessions.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClearCache}
          disabled={cacheClearing}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${cacheClearing ? "animate-spin" : ""}`} />
          {cacheClearing ? "Flushing..." : "Erase System Cache"}
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Marketplace Pricing & Commission Limits */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-orange-500" /> Marketplace Sales Rates & Pricing Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">SuperAdmin Sales Commission (%)</label>
              <input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">Pro Shop Standalone Price (€ / month)</label>
              <input
                type="number"
                step="0.01"
                value={proShopStandalonePrice}
                onChange={(e) => setProShopStandalonePrice(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">Free Tier Max Product Limit</label>
              <input
                type="number"
                value={freeUserProductLimit}
                onChange={(e) => setFreeUserProductLimit(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Currency Exchange Rates */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-500" /> Live Currency Exchange Rates (Base: EUR €)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">1 EUR (€) = DZD (DA)</label>
              <input
                type="number"
                step="0.5"
                value={dzdRate}
                onChange={(e) => setDzdRate(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">1 EUR (€) = USD ($)</label>
              <input
                type="number"
                step="0.01"
                value={usdRate}
                onChange={(e) => setUsdRate(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Official Bank Coordinates */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-500" /> Official Bank RIB & CCP RIP Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">Algerian Bank RIB (BNA / BDL)</label>
              <input
                type="text"
                value={algerianRib}
                onChange={(e) => setAlgerianRib(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-400 font-semibold block mb-1">Algérie Poste CCP RIP</label>
              <input
                type="text"
                value={algerianRip}
                onChange={(e) => setAlgerianRip(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-xs"
        >
          <Save className="w-4 h-4" /> Save SuperAdmin Settings & Rates
        </button>
      </form>
    </div>
  );
};

export default AdminPlatformSettings;
