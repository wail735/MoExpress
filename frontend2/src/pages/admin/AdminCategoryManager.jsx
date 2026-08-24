// ============================================================================
// PAGE : AdminCategoryManager.jsx
// ROLE : Category Taxonomy & Attribute Builder (/admin/categories)
// ============================================================================

import React, { useState } from "react";
import { FolderPlus, Plus, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const AdminCategoryManager = () => {
  const { addToast } = useNotification();
  const [newCat, setNewCat] = useState("");
  const [categories, setCategories] = useState(["Electronics", "Fashion", "Home & Kitchen", "Industrial Equipment", "Beauty & Care"]);

  const handleAddCat = (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setCategories((prev) => [...prev, newCat]);
    addToast(`Category [${newCat}] added!`, "success");
    setNewCat("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Category & Taxonomy Builder</h1>
        <p className="text-xs text-gray-400">Manage marketplace product categories, subcategories, and filter attributes</p>
      </div>

      <form onSubmit={handleAddCat} className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs sm:text-sm">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-orange-500" /> Add Category
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Category name (e.g. Automotive & Tools)..."
            required
            className="flex-1 bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-brand-accent text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </form>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl text-xs">
        <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">Active Marketplace Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-3 bg-gray-800/60 rounded-xl border border-gray-700 font-bold text-white flex items-center justify-between">
              <span>{cat}</span>
              <button
                onClick={() => setCategories((prev) => prev.filter((c) => c !== cat))}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryManager;
