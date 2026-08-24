// ============================================================================
// PAGE : ARProductViewer.jsx
// ROLE : 360 Interactive Product Spinner & AR Studio inspired by IKEA (/ar-view)
// ============================================================================

import React, { useState } from "react";
import { Box, RotateCw, Sparkles, Smartphone } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const ARProductViewer = () => {
  const { addToast } = useNotification();
  const [angle, setAngle] = useState(0);

  const handleRotate = () => {
    setAngle((prev) => (prev + 90) % 360);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-blue-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Box className="w-4 h-4" /> 360° AR Studio
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Interactive 360° Product Inspection</h1>
        <p className="text-xs text-gray-500">Rotate product 360 degrees or project in Augmented Reality inside your room</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center">
        <div className="aspect-square max-w-sm mx-auto bg-gray-900 rounded-3xl p-8 flex items-center justify-center border shadow-xl relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
            alt="360 View"
            className="w-full h-full object-cover transition-transform duration-500 rounded-2xl"
            style={{ transform: `rotate(${angle}deg)` }}
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleRotate}
            className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" /> Rotate 90° ({angle}°)
          </button>
          <button
            onClick={() => addToast("AR Mobile Viewer QR Code generated! Point your camera to preview in 3D.", "info")}
            className="bg-gray-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-amber-500" /> Launch Mobile AR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARProductViewer;
