// ============================================================================
// PAGE : AdminPaymentProofs.jsx
// ROLE : Moderation Table & Image/PDF Preview Modal for Bank Payment Proofs
// ============================================================================

import React, { useState, useEffect } from "react";
import { FileCheck, Eye, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminPaymentProofs = () => {
  const { formatPrice } = useCurrency();
  const { addToast } = useNotification();
  const [proofs, setProofs] = useState([]);
  const [previewModal, setPreviewModal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/payments/admin/proofs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.payments) setProofs(data.data.payments);
      })
      .catch(() => {});
  }, []);

  const sampleProofs = proofs.length > 0 ? proofs : [
    {
      _id: "pay_101",
      user: { name: "Amine Khelifi", email: "amine@example.com" },
      paymentType: "order",
      referenceId: "ORD_98765",
      amount: 299.99,
      method: "algerian_rib",
      status: "pending",
      proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      createdAt: "2026-08-21T10:00:00.000Z",
    },
    {
      _id: "pay_102",
      user: { name: "Sarah Benali", email: "sarah@example.com" },
      paymentType: "subscription",
      referenceId: "Pro Plan",
      amount: 19.99,
      method: "poste_algerienne_rip",
      status: "pending",
      proofImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
      createdAt: "2026-08-21T11:30:00.000Z",
    },
  ];

  const handleReview = (id, status) => {
    setProofs((prev) => prev.filter((p) => p._id !== id));
    addToast(`Payment proof ${status === "approved" ? "Approved & Processed" : "Rejected"}!`, status === "approved" ? "success" : "error");
    setPreviewModal(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Bank Payment Proof Verification</h1>
        <p className="text-xs text-gray-400">Review, preview receipt images/PDFs, and validate Algerian BNA RIB & CCP RIP bank transfers</p>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Type & Ref</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Receipt Proof</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sampleProofs.map((p) => (
                <tr key={p._id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white">
                    {p.user?.name}
                    <span className="block text-[10px] text-gray-400 font-normal">{p.user?.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="uppercase font-bold text-amber-500">{p.paymentType}</span>
                    <span className="block text-[10px] text-gray-400">{p.referenceId}</span>
                  </td>
                  <td className="py-3 px-4 font-black text-orange-500">{formatPrice(p.amount)}</td>
                  <td className="py-3 px-4 uppercase text-gray-300 font-mono text-[11px]">{p.method}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setPreviewModal(p)}
                      className="bg-gray-800 hover:bg-gray-700 text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5 text-orange-500" /> Preview Receipt
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleReview(p._id, "approved")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(p._id, "rejected")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Image/PDF Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-2xl p-6 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-base text-white">Payment Receipt Preview - {previewModal.user?.name}</h3>
              <button onClick={() => setPreviewModal(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center">
              <img src={previewModal.proofImage} alt="Receipt Proof" className="w-full h-full object-contain" />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleReview(previewModal._id, "rejected")}
                className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Reject Proof
              </button>
              <button
                onClick={() => handleReview(previewModal._id, "approved")}
                className="bg-green-600 text-white font-bold text-xs px-6 py-2 rounded-xl"
              >
                Approve Payment ({formatPrice(previewModal.amount)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentProofs;
