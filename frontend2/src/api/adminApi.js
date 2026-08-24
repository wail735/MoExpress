// Importation du client Axios configuré pour effectuer les requêtes API
import apiClient from "./apiClient";

// Objet regroupant les appels d'API pour le panneau d'administration
export const adminApi = {
  // Récupère les statistiques globales d'administration (GET /api/v1/admin/stats)
  getStats: () => apiClient.get("/admin/stats"),
  // Récupère la liste de tous les utilisateurs (GET /api/v1/admin/users)
  getUsers: () => apiClient.get("/admin/users"),
  // Met à jour le rôle d'un utilisateur spécifique par son ID (PUT /api/v1/admin/users/:userId/role)
  updateUserRole: (userId, role) => apiClient.put(`/admin/users/${userId}/role`, { role }),
  // Récupère les paramètres globaux de la plateforme (GET /api/v1/admin/settings)
  getSettings: () => apiClient.get("/admin/settings"),
  // Met à jour les paramètres de la plateforme avec les nouvelles données (PUT /api/v1/admin/settings)
  updateSettings: (settingsData) => apiClient.put("/admin/settings", settingsData),
  // Récupère la liste des bannissements/blocages de sécurité (GET /api/v1/admin/bans)
  getBans: () => apiClient.get("/admin/bans"),
  // Ajoute un nouveau bannissement (POST /api/v1/admin/bans)
  addBan: (banData) => apiClient.post("/admin/bans", banData),
  // Supprime un bannissement existant via son identifiant (DELETE /api/v1/admin/bans/:id)
  deleteBan: (id) => apiClient.delete(`/admin/bans/${id}`),
  // Récupère les demandes de création de boutiques Pro (GET /api/v1/admin/pro-shops)
  getProShopApplications: () => apiClient.get("/admin/pro-shops"),
  // Valide ou rejette une demande de boutique Pro par son ID (PUT /api/v1/admin/pro-shops/:id/review)
  reviewProShop: (id, status) => apiClient.put(`/admin/pro-shops/${id}/review`, { status }),
};

// Exportation par défaut de l'objet adminApi
export default adminApi;
