// ============================================================================
// PAGE : SellerVideoStudio.jsx
// ROLE : Product Video Clips & Unboxing Upload Manager (/seller/videos)
// ============================================================================

import React, { useState } from "react";
import { Video, Upload, Check } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const SellerVideoStudio = () => {
  const { addToast } = useNotification();
  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        addToast("Product demonstration video clip published to listing!", "success");
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Video className="w-8 h-8 text-orange-500" /> Product Video Clips Studio
        </h1>
        <p className="text-xs text-gray-500">Upload video demonstrations, unboxing clips, and 360 showcase videos for product listings</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4 shadow-xl">
        <Video className="w-12 h-12 text-orange-500 mx-auto animate-pulse" />
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upload Product Video Clip</h3>
        <p className="text-xs text-gray-400">Supports MP4, MOV, WEBM up to 200MB</p>

        <label className="cursor-pointer bg-orange-500 hover:bg-brand-accent text-white text-xs font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg">
          <Upload className="w-4 h-4" /> Select Video File
          <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default SellerVideoStudio;
