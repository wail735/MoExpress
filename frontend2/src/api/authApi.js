// Importation du client API Axios centralisÃ©
import apiClient from "./apiClient";

// Objet regroupant les appels d'API liÃ©s Ã  l'authentification et aux comptes utilisateurs
export const authApi = {
  // Connecte un utilisateur en envoyant ses identifiants (POST /api/v1/auth/login)
  login: (credentials) => apiClient.post("/auth/login", credentials),
  // Inscrit un nouvel utilisateur (POST /api/v1/auth/register)
  register: (userData) => apiClient.post("/auth/register", userData),
  // Connecte ou inscrit un utilisateur via Google (POST /api/v1/auth/google)
  googleLogin: (userData) => apiClient.post("/auth/google", userData),
  // RÃ©cupÃ¨re le profil de l'utilisateur actuellement connectÃ© via son token JWT (GET /api/v1/auth/me)
  getMe: () => apiClient.get("/auth/me"),
  // Envoie une demande de rÃ©initialisation de mot de passe Ã  l'adresse email spÃ©cifiÃ©e (POST /api/v1/auth/forgot-password)
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
  // RÃ©initialise le mot de passe Ã  l'aide d'un jeton de rÃ©initialisation (POST /api/v1/auth/reset-password)
  resetPassword: (token, newPassword) => apiClient.post("/auth/reset-password", { token, newPassword }),
  // Initialise les donnÃ©es de dÃ©monstration / seed d'authentification (POST /api/v1/auth/seed)
  seed: () => apiClient.post("/auth/seed"),
};

// Exportation par dÃ©faut des services d'authentification
export default authApi;

