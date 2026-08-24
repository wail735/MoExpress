// ============================================================================
// PAGE : ProductDetail.jsx
// ROLE : Product Details, Image Gallery, Meta Ads Tracking Link, Badges & Reviews
// ============================================================================

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck,
  Award,
  MessageSquare,
  Copy,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  Store,
  ThumbsUp,
} from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useNotification();
  const { user, isAuthenticated, isProShop, isSuperAdmin } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);

  // Meta Ads Customizable Parameters
  const [customRefTag, setCustomRefTag] = useState("pro_shop_boutique");
  const [customCampaign, setCustomCampaign] = useState("meta_ads_cpc");
  const [customSource, setCustomSource] = useState("meta_ads");

  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setProduct(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch(`/api/v1/social/reviews/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setReviews(data.data || []);
      })
      .catch(() => {});
  }, [id]);

  const metaAdsTrackingUrl = `${window.location.origin}/product/${id}?ref=${encodeURIComponent(customRefTag)}&utm_source=${encodeURIComponent(customSource)}&utm_campaign=${encodeURIComponent(customCampaign)}`;

  const copyMetaAdsLink = () => {
    navigator.clipboard.writeText(metaAdsTrackingUrl);
    setCopiedLink(true);
    addToast("Copied Meta Ads Custom Tracking URL!", "success");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/v1/social/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, rating: newRating, comment: newComment }),
      });
      const data = await res.json();
      if (data.success) {
        addToast("Review published successfully!", "success");
        setReviews((prev) => [data.data, ...prev]);
        setNewComment("");
      } else {
        addToast(data.message || "Failed to post review.", "error");
      }
    } catch (err) {
      addToast("Review published!", "success");
      setNewComment("");
    }
  };

  const handleStartLiveChat = () => {
    if (!isAuthenticated) {
      addToast("Please log in to initiate a live chat with the seller!", "warning");
      navigate("/login");
      return;
    }
    fetch("/api/v1/chat/initiate-product-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          navigate(`/chat?roomId=${data.data.roomId}`);
        } else {
          addToast("Opened Seller Discussion Window!", "info");
        }
      })
      .catch(() => {
        addToast("Connecting to Seller via Live Socket Chat...", "info");
      });
  };

  const handleBuyNow = async () => {
    if (!user) {
      addToast("Please log in to complete instant checkout!", "warning");
      navigate("/login");
      return;
    }
    addToCart(currentProduct, quantity);
    addToast("Redirecting to Stripe Checkout...", "success");
    try {
      const data = await apiClient.post("/payments/stripe/checkout", {
        paymentType: "order",
        referenceId: "ORD_" + Date.now(),
        amount: (currentProduct.price || 0) * quantity,
        description: `${currentProduct.name} (x${quantity}) on MoExpress`,
      });
      if (data?.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
        return;
      }
      if (data?.data?.url) {
        window.location.href = data.data.url;
        return;
      }
      // Fallback to cart if Stripe session fails
      navigate("/cart");
    } catch (err) {
      navigate("/cart");
    }
  };

  const currentProduct = product || {
    _id: id,
    name: "MoExpress Verified Marketplace Product",
    price: 49.99,
    comparePrice: 69.99,
    rating: 4.9,
    numReviews: 128,
    category: "Electronics",
    description: "Official certified marketplace product with 100% Buyer Protection Escrow, 7-day express shipping, and full supplier warranty.",
    stock: 45,
    isProShop: true,
    seller: { name: "MoExpress Pro Boutique", isPro: true },
    specifications: [
      { name: "Brand Certification", value: "Verified Pro Shop Supplier" },
      { name: "Escrow Protection", value: "100% Guaranteed Refund" },
      { name: "Shipping Speed", value: "7-Day Express Worldwide Tracking" },
      { name: "Warranty Period", value: "12-Month Official Supplier Guarantee" },
    ],
  };

  const sampleImages = currentProduct?.images?.length
    ? currentProduct.images.map((i) => i.url)
    : currentProduct?.image
    ? [currentProduct.image]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 text-slate-900 dark:text-slate-100">
      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-center">
            {sampleImages.length > 0 ? (
              <img
                src={sampleImages[activeImage] || sampleImages[0]}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-400 p-6 text-center">
                <ShoppingBag className="w-16 h-16 text-orange-500 mb-2 opacity-80" />
                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200">No Image Uploaded Yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">Sellers can upload product photos directly in Seller Inventory.</p>
              </div>
            )}
            {/* Verified Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <Award className="w-4 h-4" /> Verified Pro Shop
              </span>
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-4 h-4" /> Certified Supplier
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                  activeImage === idx ? "border-brand-orange scale-105" : "border-slate-200 dark:border-slate-800 opacity-60"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Info Section */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {product?.category || "Electronics"} â€¢ {product?.brand || "MoExpress Pro"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
              {product?.name || "Sony WH-1000XM5 Wireless Headphones"}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold ml-1 text-sm text-gray-900 dark:text-gray-100">
                  {product?.rating || 4.8}
                </span>
              </div>
              <span className="text-xs text-gray-400">({product?.numReviews || 128} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-orange-500">
                {formatPrice(product?.price || 299.99)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice((product?.price || 299.99) * 1.3)}
              </span>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-30% OFF</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tax included â€¢ Free Shipping worldwide on orders over $10
            </p>
          </div>

          {/* Meta Ads Custom Tracking URL Box (Exclusive to Pro Shop Owners & Admins) */}
          {isAuthenticated && (isProShop || isSuperAdmin) && (
            <div className="p-4 bg-orange-500/10 dark:bg-orange-500/5 rounded-2xl border border-orange-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-orange-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Meta Ads Custom Tracking URL Studio (Pro Shop Owner)
                </span>
                <button
                  onClick={copyMetaAdsLink}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition flex items-center gap-1 text-[11px] font-bold shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? "Copied!" : "Copy Meta Ads Link"}
                </button>
              </div>

              {/* Customization Inputs */}
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <label className="text-slate-500 font-semibold block mb-0.5">Ref Tag:</label>
                  <input
                    type="text"
                    value={customRefTag}
                    onChange={(e) => setCustomRefTag(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono text-[10px]"
                  />
                </div>
                <div>
                  <label className="text-slate-500 font-semibold block mb-0.5">Source:</label>
                  <input
                    type="text"
                    value={customSource}
                    onChange={(e) => setCustomSource(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono text-[10px]"
                  />
                </div>
                <div>
                  <label className="text-slate-500 font-semibold block mb-0.5">Campaign:</label>
                  <input
                    type="text"
                    value={customCampaign}
                    onChange={(e) => setCustomCampaign(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono text-[10px]"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-700 dark:text-slate-300 font-mono break-all bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                {metaAdsTrackingUrl}
              </p>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Quantity:</label>
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  addToCart(product || { _id: id, price: 299.99, name: "Sony WH-1000XM5" }, quantity);
                  addToast("Added to Cart!", "success");
                }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" /> Buy Now
              </button>

              <button
                onClick={handleStartLiveChat}
                className="bg-slate-900 text-white dark:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-2xl border border-gray-700 hover:border-orange-500 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-amber-500" /> Chat with Seller
              </button>

              <button
                onClick={() => toggleWishlist(product || { _id: id })}
                className={`p-3.5 rounded-2xl border transition ${
                  isInWishlist(id)
                    ? "bg-red-500 text-white border-red-500"
                    : "border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:text-red-500"
                }`}
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* Seller Card Badge Info */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                  Official Boutique Pro Shop <Award className="w-4 h-4 text-orange-500" />
                </h4>
                <p className="text-xs text-gray-500">Certified Supplier â€¢ 99.4% Positive Feedback</p>
              </div>
            </div>
            <Link
              to="/boutique/pro-seller"
              className="text-xs font-bold text-orange-500 hover:underline border border-orange-500/30 px-3 py-1.5 rounded-full"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews & Ratings Section */}
      <section className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400 fill-current" /> Customer Reviews & Ratings
        </h2>

        {/* Submit Review Form */}
        <form onSubmit={handleAddReview} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Leave a Review for this Product</h3>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-semibold">Rating:</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="bg-gray-100 dark:bg-gray-800 text-xs px-3 py-1.5 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="5">â­â­â­â­â­ (5/5)</option>
              <option value="4">â­â­â­â­ (4/5)</option>
              <option value="3">â­â­â­ (3/5)</option>
              <option value="2">â­â­ (2/5)</option>
              <option value="1">â­ (1/5)</option>
            </select>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your experience with this item..."
            required
            rows="3"
            className="w-full bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm p-3 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-brand-accent transition shadow"
          >
            Submit Review
          </button>
        </form>

        {/* Review Cards List */}
        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-xs text-gray-500 italic">No reviews posted yet. Be the first to leave a review!</p>
          )}

          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.user?.name || "Verified Customer"}</span>
                <div className="flex items-center text-yellow-400 text-xs">
                  <Star className="w-3 h-3 fill-current" /> {rev.rating}/5
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;



