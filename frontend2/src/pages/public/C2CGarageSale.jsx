// ============================================================================
// PAGE : C2CGarageSale.jsx
// ROLE : Peer-to-Peer Local User Garage Sale Marketplace (/c2c-garage)
// ============================================================================

import React, { useState } from "react";
import { Store, Plus, ShoppingBag, Search, Tag, X, Check, MapPin } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const C2CGarageSale = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [items, setItems] = useState([
    { id: "c1", title: "Vintage Mechanical Keyboard (Barely Used)", price: 35.0, city: "Algiers", seller: "Karim", condition: "Like New" },
    { id: "c2", title: "Sony PS4 Pro 1TB with 2 Controllers", price: 180.0, city: "Oran", seller: "Sami", condition: "Good" },
    { id: "c3", title: "DSLR Camera Tripod & Ring Light Kit", price: 45.0, city: "Constantine", seller: "Amine", condition: "New in Box" },
  ]);

  const [newItem, setNewItem] = useState({ title: "", price: "", city: "", condition: "Like New" });

  const filteredItems = items.filter((i) =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.price || !newItem.city) {
      addToast("Please fill in all listing details", "error");
      return;
    }
    const item = {
      id: "c_" + Date.now(),
      title: newItem.title,
      price: parseFloat(newItem.price),
      city: newItem.city,
      seller: "You (Verified Buyer)",
      condition: newItem.condition,
    };
    setItems((prev) => [item, ...prev]);
    setShowAddModal(false);
    setNewItem({ title: "", price: "", city: "", condition: "Like New" });
    addToast("Your garage sale listing has been published!", "success");
  };

  const handleBuy = (item) => {
    addToast(`Contact request sent to seller ${item.seller} for "${item.title}"!`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto shadow-md">
          <Store className="w-4 h-4" /> User Garage Sale
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Peer-to-Peer Used Goods Marketplace</h1>
        <p className="text-xs text-gray-500">Sell your pre-loved electronics, books, and vintage items directly to nearby buyers</p>
      </div>

      {/* Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items or city (e.g. Algiers, Oran)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Post Item for Sale
        </button>
      </div>

      {/* Items List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
          Active Garage Sale Listings ({filteredItems.length})
        </h3>
        {filteredItems.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-6">No listings found. Post the first one!</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-500" /> {item.city}</span>
                  <span>Seller: {item.seller}</span>
                  <span className="bg-orange-500/10 text-orange-500 font-bold text-[10px] px-2 py-0.5 rounded">{item.condition}</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="font-black text-orange-500 text-base">{formatPrice(item.price)}</span>
                <button
                  onClick={() => handleBuy(item)}
                  className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">List Item in Garage Sale</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Item Title</label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Mouse"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Price (EUR)</label>
                  <input
                    type="number"
                    placeholder="25.00"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Algiers"
                    value={newItem.city}
                    onChange={(e) => setNewItem({ ...newItem, city: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-brand-accent text-white font-bold py-3 rounded-xl shadow-lg transition mt-2"
              >
                Publish Garage Sale Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default C2CGarageSale;
