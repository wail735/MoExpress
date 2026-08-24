// ============================================================================
// FICHIER : backend 2/auth/auth.routes.js
// RÔLE : Définition des routes Express d'authentification (/api/v1/auth)
// ============================================================================

// 1. Importation du routeur Express
import { Router } from "express";

// 2. Importation des méthodes du contrôleur d'authentification
import * as authController from "./auth.controller.js";

// 3. Importation des middlewares de protection
import { protect } from "./auth.middleware.js";

// 4. Instanciation du routeur Express
const router = Router();

// Route d'inscription : POST /api/v1/auth/register
router.post("/register", authController.register);

// Route de connexion : POST /api/v1/auth/login
router.post("/login", authController.login);

// Route de demande de réinitialisation de mot de passe : POST /api/v1/auth/forgot-password
router.post("/forgot-password", authController.forgotPassword);

// Route de réinitialisation effective de mot de passe : POST /api/v1/auth/reset-password
router.post("/reset-password", authController.resetPassword);

// Route d'obtention de l'utilisateur connecté : GET /api/v1/auth/me (Protégée)
router.get("/me", protect, authController.getMe);

// Route d'ensemencement de données démo : POST /api/v1/auth/seed
router.post("/seed", authController.seed);

// 5. Exportation du routeur
export default router;
