// ============================================================================
// FICHIER : backend 2/users/user.routes.js
// RÔLE : Définition des routes Express de l'utilisateur, panier, wishlist et boutique pro (/api/v1/users)
// ============================================================================

import { Router } from "express";
import * as userController from "./user.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

// Toutes les routes de gestion d'utilisateur sont protégées par token JWT (protect)
router.use(protect);

// Routes du Panier d'achat (Cart)
router.get("/cart", userController.getCart);
router.post("/cart", userController.addToCart);
router.put("/cart", userController.updateCartQuantity);
router.delete("/cart/:productId", userController.removeFromCart);

// Routes de la Liste de Souhaits (Wishlist / Favoris)
router.get("/wishlist", userController.getWishlist);
router.post("/wishlist/toggle", userController.toggleWishlist);

// Routes Candidature & Statut Boutique Pro
router.post("/pro-shop/apply", userController.applyProShop);
router.get("/pro-shop/status", userController.getProShopStatus);

// Route Tableau de Bord Vendeur (Réservée aux vendeurs pro certifiés)
router.get("/seller/dashboard", userController.getSellerDashboard);

export default router;
