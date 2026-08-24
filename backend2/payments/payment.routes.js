// ============================================================================
// FICHIER : backend 2/payments/payment.routes.js
// RÔLE : Définition des routes Express du système de paiement (/api/v1/payments)
// ============================================================================

import { Router } from "express";
import * as paymentController from "./payment.controller.js";
import { protect, authorize } from "../auth/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// Route publique : Obtenir les RIB Algérie, RIP CCP et coordonnées bancaires Visa
router.get("/bank-details", paymentController.getBankDetails);

// Routes protégées par authentification
router.post("/stripe/checkout", protect, paymentController.checkoutStripe);
router.post("/upload-proof", protect, upload.single("proofImage"), paymentController.uploadProof);

// Routes réservées au SuperAdmin (Validation des preuves de virement)
router.get("/admin/proofs", protect, authorize("superAdmin"), paymentController.getPendingProofs);
router.put("/admin/proofs/:id/review", protect, authorize("superAdmin"), paymentController.reviewProof);

export default router;
