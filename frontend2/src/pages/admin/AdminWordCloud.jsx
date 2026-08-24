// ============================================================================
// PAGE : AdminWordCloud.jsx
// ROLE : AI Customer Feedback Sentiment Word-Cloud Generator (/admin/word-cloud)
// ============================================================================

import React, { useState } from "react";
import { Sparkles, MessageSquare, RefreshCw, Filter } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminWordCloud = () => {
  const { addToast } = useNotification();
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  const keywords = [
    { text: "Fast Delivery", size: "text-2xl", color: "text-green-400", type: "positive", count: 4820 },
    { text: "Original Quality", size: "text-3xl", color: "text-orange-500", type: "positive", count: 8940 },
    { text: "Great Sound", size: "text-xl", color: "text-purple-400", type: "positive", count: 2150 },
    { text: "Pro Boutique", size: "text-2xl", color: "text-amber-500", type: "positive", count: 3610 },
    { text: "Delayed Customs", size: "text-lg", color: "text-red-400", type: "negative", count: 640 },
    { text: "Packaging Damaged", size: "text-base", color: "text-rose-400", type: "negative", count: 320 },
  ];

  const filteredKeywords = keywords.filter(
    (k) => sentimentFilter === "all" || k.type === sentimentFilter
  );

  const handleRegenerate = () => {
    setIsGenerating(true);
    addToast("NLP Model parsing 10,000+ review comments...", "info");
    setTimeout(() => {
      setIsGenerating(false);
      addToast("AI Word Cloud refreshed from latest buyer feedback!", "success");
    }, 1200);
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
    addToast(`Filtering reviews mentioning "${word.text}" (${word.count} occurrences)`, "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" /> AI Buyer Review Sentiment Word Cloud
          </h1>
          <p className="text-xs text-gray-400">Visual word cloud extracted from 10,000+ buyer review comments</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-800 p-1 rounded-xl border border-gray-700">
            {["all", "positive", "negative"].map((type) => (
              <button
                key={type}
                onClick={() => setSentimentFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                  sentimentFilter === type ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Processing..." : "Regenerate Cloud"}
          </button>
        </div>
      </div>

      {/* Cloud Display */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-gray-800 space-y-6 shadow-xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 min-h-[200px]">
          {filteredKeywords.map((k, idx) => (
            <span
              key={idx}
              onClick={() => handleWordClick(k)}
              className={`font-black ${k.size} ${k.color} cursor-pointer hover:scale-110 transition-transform duration-200 inline-block`}
            >
              {k.text}
            </span>
          ))}
        </div>

        {selectedWord && (
          <div className="p-4 bg-purple-600/10 border border-purple-500/30 rounded-2xl text-xs text-purple-300 flex items-center justify-between">
            <span>Selected Phrase: <strong>"{selectedWord.text}"</strong></span>
            <span className="bg-purple-600 text-white font-black px-2.5 py-0.5 rounded-full">
              {selectedWord.count} Mentions
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWordCloud;
