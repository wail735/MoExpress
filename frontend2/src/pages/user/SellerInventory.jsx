// ============================================================================
// PAGE : SellerInventory.jsx
// ROLE : Seller Stock Level, SKU Inventory & Create Listing from Stock (/seller/inventory)
// ============================================================================

import React, { useState } from "react";
import { Package, AlertTriangle, RefreshCw, Plus, Check, ShoppingBag, Edit, Trash2, X, ArrowUpRight, Upload, Image as ImageIcon } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useCurrency } from "../../context/CurrencyContext";

export const SellerInventory = () => {
  const { addToast } = useNotification();
  const { formatPrice } = useCurrency();

  const [stockItems, setStockItems] = useState([
    { id: "s1", sku: "SKU-SONY-001", name: "Sony WH-1000XM5 Headphones", category: "Electronics", price: 299.99, stock: 12, minAlert: 15, status: "low", isListed: true, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: "s2", sku: "SKU-APP-009", name: "Apple Watch Series 9 GPS", category: "Electronics", price: 399.99, stock: 45, minAlert: 10, status: "good", isListed: true, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: "s3", sku: "SKU-NIKE-270", name: "Nike Air Max 270 Sneakers", category: "Fashion", price: 129.99, stock: 8, minAlert: 10, status: "low", isListed: false, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
    { id: "s4", sku: "SKU-LOGI-MX3", name: "Logitech MX Master 3S Mouse", category: "Electronics", price: 99.99, stock: 60, minAlert: 12, status: "good", isListed: false, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formState, setFormState] = useState({
    sku: "",
    name: "",
    category: "Electronics",
    price: "",
    stock: "",
    minAlert: "10",
    image: "",
  });

  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormState((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestock = (id) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: item.stock + 50, status: "good" } : item))
    );
    addToast("Restocked +50 units to inventory!", "success");
  };

  const handleCreateListingFromStock = (item) => {
    setStockItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, isListed: true } : i))
    );
    addToast(`🚀 Published live product listing for "${item.name}" at ${formatPrice(item.price)}!`, "success");
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.price || !formState.stock) {
      addToast("Please fill in all required inventory fields", "error");
      return;
    }

    if (editingItem) {
      setStockItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                sku: formState.sku || i.sku,
                name: formState.name,
                category: formState.category,
                price: parseFloat(formState.price),
                stock: parseInt(formState.stock),
                minAlert: parseInt(formState.minAlert),
                status: parseInt(formState.stock) <= parseInt(formState.minAlert) ? "low" : "good",
              }
            : i
        )
      );
      addToast(`Updated inventory for "${formState.name}"!`, "success");
    } else {
      const newItem = {
        id: "s_" + Date.now(),
        sku: formState.sku || `SKU-PROD-${Math.floor(100 + Math.random() * 900)}`,
        name: formState.name,
        category: formState.category,
        price: parseFloat(formState.price),
        stock: parseInt(formState.stock),
        minAlert: parseInt(formState.minAlert) || 10,
        status: parseInt(formState.stock) <= 10 ? "low" : "good",
        isListed: false,
      };
      setStockItems((prev) => [newItem, ...prev]);
      addToast(`New stock item "${newItem.name}" added to inventory!`, "success");
    }

    setShowAddModal(false);
    setEditingItem(null);
    setFormState({ sku: "", name: "", category: "Electronics", price: "", stock: "", minAlert: "10" });
  };

  const handleDeleteItem = (id, name) => {
    setStockItems((prev) => prev.filter((i) => i.id !== id));
    addToast(`Deleted "${name}" from inventory!`, "info");
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormState({
      sku: item.sku,
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      stock: item.stock.toString(),
      minAlert: item.minAlert.toString(),
    });
    setShowAddModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-8 h-8 text-orange-500" /> Stock Inventory & Listing Creator
          </h1>
          <p className="text-xs text-gray-500">Manage warehouse stock, low-stock alerts, SKUs, and turn stock items directly into live listings</p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setFormState({ sku: "", name: "", category: "Electronics", price: "", stock: "", minAlert: "10" });
            setShowAddModal(true);
          }}
          className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Stock Item
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Product Name & Category</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">In Stock</th>
                <th className="py-3 px-4">Listing Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-slate-900 dark:text-white">
              {stockItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-gray-500">{item.sku}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold block">{item.name}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">{item.category}</span>
                  </td>
                  <td className="py-3 px-4 font-black text-orange-500">{formatPrice(item.price)}</td>
                  <td className="py-3 px-4 font-black">
                    <span className={item.status === "low" ? "text-red-500 flex items-center gap-1" : "text-green-500"}>
                      {item.stock} units {item.status === "low" && <AlertTriangle className="w-3.5 h-3.5" />}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {item.isListed ? (
                      <span className="bg-green-600/20 text-green-400 border border-green-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Check className="w-3 h-3" /> Live Listing
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCreateListingFromStock(item)}
                        className="bg-orange-500 hover:bg-brand-accent text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow transition flex items-center gap-1"
                      >
                        <ArrowUpRight className="w-3 h-3" /> Create Listing
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRestock(item.id)}
                        className="p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-orange-500 rounded-lg transition"
                        title="Restock +50 Units"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-orange-500 rounded-lg transition"
                        title="Edit Stock Item"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-1.5 bg-gray-100 dark:bg-gray-800 text-red-500 hover:text-red-600 rounded-lg transition"
                        title="Delete Stock"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Inventory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingItem ? "Edit Stock Item" : "Add New Warehouse Stock Item"}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Noise-Canceling Earbuds"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="SKU-9901"
                    value={formState.sku}
                    onChange={(e) => setFormState({ ...formState, sku: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Price (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="49.99"
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formState.stock}
                    onChange={(e) => setFormState({ ...formState, stock: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Min Threshold</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formState.minAlert}
                    onChange={(e) => setFormState({ ...formState, minAlert: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Product Image File Upload (No raw URL required!) */}
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Product Image Upload</label>
                <div className="flex items-center gap-3">
                  {imagePreview || formState.image ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      <img src={imagePreview || formState.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setFormState((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <label className="flex-1 cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 flex items-center justify-center gap-2 font-medium transition text-xs">
                    <Upload className="w-4 h-4 text-orange-500" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-brand-accent text-white font-bold py-3 rounded-xl shadow-lg transition mt-2"
              >
                {editingItem ? "Update Stock Details" : "Save Stock Item to Inventory"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerInventory;
