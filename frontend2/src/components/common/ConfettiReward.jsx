// ============================================================================
// COMPONENT : ConfettiReward.jsx
// ROLE : Rich Micro-Interaction Confetti Celebration Burst Animation
// ============================================================================

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export const ConfettiReward = ({ active }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center animate-bounce">
      <div className="text-center space-y-2">
        <Sparkles className="w-20 h-20 text-yellow-400 mx-auto animate-spin" />
        <span className="text-2xl font-black text-white bg-orange-500 px-6 py-2 rounded-full shadow-2xl block">
          🎉 CELEBRATION! REWARD UNLOCKED!
        </span>
      </div>
    </div>
  );
};

export default ConfettiReward;
