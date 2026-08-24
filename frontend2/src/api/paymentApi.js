// Importation du client API Axios centralisé
import apiClient from "./apiClient";

// Objet regroupant les appels d'API relatifs aux paiements et transactions
export const paymentApi = {
  // Récupère les coordonnées bancaires pour le virement (GET /api/v1/payments/bank-details)
  getBankDetails: () => apiClient.get("/payments/bank-details"),
  // Initie une session de paiement Stripe avec les articles du panier (POST /api/v1/payments/stripe/checkout)
  stripeCheckout: (cartItems) => apiClient.post("/payments/stripe/checkout", { cartItems }),
  // Téléverse une preuve de virement bancaire sous forme de fichier / FormData (POST /api/v1/payments/upload-proof)
  uploadProof: (formData) => apiClient.post("/payments/upload-proof", formData),
  // Récupère toutes les preuves de paiement pour l'administrateur (GET /api/v1/payments/admin/proofs)
  getAdminProofs: () => apiClient.get("/payments/admin/proofs"),
  // Approuve ou rejette une preuve de paiement par l'administrateur (PUT /api/v1/payments/admin/proofs/:id/review)
  reviewProof: (id, status) => apiClient.put(`/payments/admin/proofs/${id}/review`, { status }),
};

// Exportation par défaut des services de paiement
export default paymentApi;
