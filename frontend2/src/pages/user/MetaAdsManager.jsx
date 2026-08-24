// ============================================================================
// PAGE : MetaAdsManager.jsx
// ROLE : Meta Business Suite-Style Ads Platform for Self-Service Campaigns
// ============================================================================

import React, { useState } from "react";
import { Megaphone, Upload, DollarSign, Calendar, Layout, Eye, MousePointer, Play, CheckCircle } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const MetaAdsManager = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();

  const [title, setTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [placement, setPlacement] = useState("homepage_banner");
  const [dailyBudget, setDailyBudget] = useState(10);
  const [durationDays, setDurationDays] = useState(7);
  const [paymentMethod, setPaymentMethod] = useState("coins");
  const [mediaFile, setMediaFile] = useState(null);

  // Pricing Rates per Placement
  const rates = {
    homepage_banner: 15,
    sidebar: 10,
    product_page: 8,
    category_page: 7,
  };

  const totalCost = (rates[placement] || 10) * durationDays;

  const [myCampaigns, setMyCampaigns] = useState([
    {
      _id: "ad_101",
      title: "MoStore Official Summer Sale 50% Off",
      placement: "homepage_banner",
      status: "active",
      impressions: 14250,
      clicks: 890,
      totalCost: 105,
      createdAt: "2026-08-18",
    },
  ]);

  const handleLaunchCampaign = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetUrl.trim()) return;

    const newAd = {
      _id: "ad_" + Date.now(),
      title,
      placement,
      status: "pending_review",
      impressions: 0,
      clicks: 0,
      totalCost,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setMyCampaigns((prev) => [newAd, ...prev]);
    addToast("Meta Ad Campaign submitted successfully! Admin will review and activate.", "success");
    setTitle("");
    setTargetUrl("");
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-navy via-brand-dark to-brand-navy p-8 rounded-3xl text-white space-y-2 border border-brand-golden/30 shadow-xl">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          <Megaphone className="w-8 h-8 text-amber-500" /> Meta Business Suite Ads Manager
        </h2>
        <p className="text-xs sm:text-sm text-gray-300">
          Launch targeted photo and video ad campaigns across MoExpress pages. Promote your boutique, products, and custom tracking links!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Creation Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Create New Sponsored Ad Campaign
          </h3>

          <form onSubmit={handleLaunchCampaign} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Campaign Headline / Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Exclusive 30% Off New Electronics Collection"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Target Page URL / Tracking Link</label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://moexpress.com/products/123?ref=my_boutique&utm_source=meta_ads"
                required
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Target Page Placement</label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white"
                >
                  <option value="homepage_banner">Homepage Main Banner (€15/day)</option>
                  <option value="sidebar">Catalog Sidebar Widget (€10/day)</option>
                  <option value="product_page">Product Details Page (€8/day)</option>
                  <option value="category_page">Category Header Banner (€7/day)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Upload Media (Photo / Video)</label>
              <input
                type="file"
                onChange={(e) => setMediaFile(e.target.files[0])}
                accept="image/*,video/*"
                className="w-full bg-gray-100 dark:bg-gray-800 text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Campaign Summary */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>Placement Rate:</span>
                <span className="font-bold">{formatPrice(rates[placement])} / day</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Duration:</span>
                <span className="font-bold">{durationDays} Days</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-orange-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total Campaign Price:</span>
                <span>{formatPrice(totalCost)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-2xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4" /> Launch Ad Campaign
            </button>
          </form>
        </div>

        {/* Active Campaigns & Performance List */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-orange-500" /> My Active Ad Campaigns
          </h3>

          <div className="space-y-3">
            {myCampaigns.map((ad) => (
              <div key={ad._id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 dark:text-white truncate max-w-[200px]">{ad.title}</span>
                  <span className="px-2 py-0.5 rounded uppercase font-black bg-green-500 text-white text-[10px]">
                    {ad.status}
                  </span>
                </div>
                <p className="text-gray-500">Placement: <strong className="uppercase">{ad.placement}</strong></p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px]">
                  <div>
                    <span className="text-gray-400 block">Impressions</span>
                    <strong className="text-orange-500 text-sm">{ad.impressions.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Clicks</span>
                    <strong className="text-amber-500 text-sm">{ad.clicks.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaAdsManager;
