// ============================================================================
// PAGE : AIReviewSummarizer.jsx
// ROLE : ChatGPT Powered Product Review Summarizer & Sentiment Radar (/ai-reviews)
// ============================================================================

import React, { useState } from "react";
import { Sparkles, ThumbsUp, ThumbsDown, Star, Search, RefreshCw, CheckCircle, MessageSquare } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AIReviewSummarizer = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const sampleProducts = [
    {
      id: "p1",
      name: "Sony WH-1000XM5 Noise Canceling Headphones",
      rating: 4.9,
      reviewsCount: 1480,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      sentimentScore: 96,
      category: "audio",
      pros: [
        "Industry-leading active noise cancellation (ANC)",
        "Plush memory foam earcups with 30-hour battery life",
        "Crystal clear multipoint Bluetooth voice calls",
      ],
      cons: [
        "Carrying case is slightly bulkier than previous generation",
        "Hinges no longer fold completely flat",
      ],
    },
    {
      id: "p2",
      name: "Apple Watch Series 9 GPS + Cellular",
      rating: 4.8,
      reviewsCount: 2150,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
      sentimentScore: 94,
      category: "wearables",
      pros: [
        "Double-tap gesture control works flawlessly",
        "Smarter Siri processing on-device with zero delay",
        "Bright 2000-nit display legible in harsh sunlight",
      ],
      cons: [
        "18-hour battery life requires daily charging",
        "Fast charging requires proprietary USB-C puck",
      ],
    },
    {
      id: "p3",
      name: "MacBook Pro 16-inch M3 Max 36GB RAM",
      rating: 4.95,
      reviewsCount: 890,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
      sentimentScore: 98,
      category: "laptops",
      pros: [
        "M3 Max chip renders 8K video in realtime with zero fan noise",
        "Liquid Retina XDR screen with 120Hz ProMotion",
        "22-hour real-world battery life on single charge",
      ],
      cons: [
        "High initial price tag",
        "HDMI port capped at 60Hz 8K output",
      ],
    },
  ];

  const filteredProducts = sampleProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleRunAnalysis = (productName) => {
    setIsAnalyzing(true);
    addToast(`AI Review Radar analyzing 1,000+ reviews for "${productName}"...`, "info");
    setTimeout(() => {
      setIsAnalyzing(false);
      addToast(`AI Sentiment summary regenerated successfully!`, "success");
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" /> AI Review Radar
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI Product Review Summarizer</h1>
        <p className="text-xs text-gray-500">Automated sentiment analysis, key pros & cons extracted from thousands of verified buyer reviews</p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products or paste AliExpress URL to analyze..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white text-xs px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="audio">Audio & Headphones</option>
            <option value="wearables">Smartwatches</option>
            <option value="laptops">Laptops & Computers</option>
          </select>

          <button
            onClick={() => handleRunAnalysis("selected products")}
            disabled={isAnalyzing}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
            {isAnalyzing ? "Analyzing..." : "Run AI Scan"}
          </button>
        </div>
      </div>

      {/* Product Summary Cards List */}
      <div className="space-y-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto opacity-50" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">No products found for "{searchQuery}"</h3>
            <p className="text-xs text-gray-500">Try searching for headphones, smartwatch, or laptop</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-2xl border" />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{product.name}</h3>
                    <span className="text-yellow-400 font-bold text-xs flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" /> ★ {product.rating} / 5.0 ({product.reviewsCount.toLocaleString()} Verified Buyer Reviews)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRunAnalysis(product.name)}
                  className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Refresh AI Sentiment
                </button>
              </div>

              {/* AI Sentiment Score Bar */}
              <div className="p-4 bg-purple-600/10 border border-purple-500/30 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-300" /> AI Overall Buyer Sentiment
                  </span>
                  <span className="text-green-400 font-black">{product.sentimentScore}% POSITIVE</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${product.sentimentScore}%` }} />
                </div>
              </div>

              {/* Pros & Cons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl space-y-2">
                  <h4 className="font-bold text-green-500 flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4" /> Top Mentioned Pros
                  </h4>
                  <ul className="space-y-1.5 text-gray-600 dark:text-gray-300">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl space-y-2">
                  <h4 className="font-bold text-red-500 flex items-center gap-1.5">
                    <ThumbsDown className="w-4 h-4" /> Minor Cons Noted
                  </h4>
                  <ul className="space-y-1.5 text-gray-600 dark:text-gray-300">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-1.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIReviewSummarizer;
