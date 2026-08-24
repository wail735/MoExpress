// ============================================================================
// FICHIER : backend 2/admin/admin.routes.js
// RÔLE : Définition des routes du Panneau d'Administration (/api/v1/admin)
// ============================================================================

import { Router } from "express";
import * as adminController from "./admin.controller.js";
import { protect, authorize } from "../auth/auth.middleware.js";

const router = Router();

// Toutes les routes d'administration exigent d'être connecté (protect) et d'être SuperAdmin
router.use(protect, authorize("superAdmin"));

// Obtenir la liste de tous les utilisateurs
router.get("/users", adminController.getUsers);

// Modifier le rôle d'un utilisateur
router.put("/users/role", adminController.changeRole);

// Activer ou désactiver un compte utilisateur
router.put("/users/toggle-status", adminController.toggleUserStatus);

// Obtenir les statistiques globales de la plateforme
router.get("/stats", adminController.getStats);

// Gestion dynamique des tarifs et réglages de la plateforme
router.get("/settings", adminController.getSettings);
router.put("/settings", adminController.updateSettings);

// Modération des dossiers de candidature Boutique Pro
router.get("/pro-shops", adminController.getProShops);
router.put("/pro-shops/review", adminController.reviewProShop);

// Gestion du bannissement d'adresses IP et d'emails (Security Blacklist)
router.get("/bans", adminController.listBans);
router.post("/bans", adminController.createBan);
// Effacer le cache Redis et la mémoire de l'application
router.post("/cache/clear", adminController.clearCache);

export default router;
