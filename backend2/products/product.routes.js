// ============================================================================
// FICHIER : backend 2/products/product.routes.js
// RÔLE : Définition des routes Express des produits et d'auto-complétion (/api/v1/products)
// ============================================================================

import { Router } from "express";
import * as productController from "./product.controller.js";
import { protect, authorize } from "../auth/auth.middleware.js";
import { autocompleteLimiter } from "../config/rateLimit.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// Route publique : GET /api/v1/products (Recherche, filtres, pagination)
router.get("/", productController.getProducts);

// Route publique d'auto-complétion intelligente mot par mot / lettre par lettre (Ollama AI + BDD) avec limiteur dédié
router.get("/autocomplete", autocompleteLimiter, productController.autocomplete);

// Route publique : GET /api/v1/products/:id (Détails d'un produit)
router.get("/:id", productController.getProductById);

// Route réservée aux Vendeurs / Admins / SuperAdmin : POST /api/v1/products (Créer un produit avec images)
router.post(
  "/",
  protect,
  authorize("seller", "admin", "superAdmin"),
  upload.array("images", 5),
  productController.createProduct
);

// Route réservée aux Vendeurs / Admins / SuperAdmin : PUT /api/v1/products/:id (Mettre à jour)
router.put(
  "/:id",
  protect,
  authorize("seller", "admin", "superAdmin"),
  upload.array("images", 5),
  productController.updateProduct
);

// Route réservée aux Vendeurs / Admins / SuperAdmin : DELETE /api/v1/products/:id (Supprimer)
router.delete(
  "/:id",
  protect,
  authorize("seller", "admin", "superAdmin"),
  productController.deleteProduct
);

export default router;
