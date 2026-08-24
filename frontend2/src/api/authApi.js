// Importation du client API Axios centralisé
import apiClient from "./apiClient";

// Objet regroupant les appels d'API liés à l'authentification et aux comptes utilisateurs
export const authApi = {
  // Connecte un utilisateur en envoyant ses identifiants (POST /api/v1/auth/login)
  login: (credentials) => apiClient.post("/auth/login", credentials),
  // Inscrit un nouvel utilisateur (POST /api/v1/auth/register)
  register: (userData) => apiClient.post("/auth/register", userData),
  // Récupère le profil de l'utilisateur actuellement connecté via son token JWT (GET /api/v1/auth/me)
  getMe: () => apiClient.get("/auth/me"),
  // Envoie une demande de réinitialisation de mot de passe à l'adresse email spécifiée (POST /api/v1/auth/forgot-password)
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
  // Réinitialise le mot de passe à l'aide d'un jeton de réinitialisation (POST /api/v1/auth/reset-password)
  resetPassword: (token, newPassword) => apiClient.post("/auth/reset-password", { token, newPassword }),
  // Initialise les données de démonstration / seed d'authentification (POST /api/v1/auth/seed)
  seed: () => apiClient.post("/auth/seed"),
};

// Exportation par défaut des services d'authentification
export default authApi;
