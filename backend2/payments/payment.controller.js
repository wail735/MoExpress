// ============================================================================
// FICHIER : backend 2/payments/payment.controller.js
// RÔLE : Contrôleur HTTP pour les paiements Stripe, RIB/RIP et preuves de virement
// ============================================================================

import * as paymentService from "./payment.service.js";

/**
 * Consulter les coordonnées bancaires de la plateforme (Public)
 */
export const getBankDetails = async (req, res) => {
  try {
    const details = await paymentService.getBankDetails();
    return res.status(200).json({ success: true, data: details });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Créer une session Stripe Checkout
 */
export const checkoutStripe = async (req, res) => {
  try {
    const { paymentType, referenceId, amount, description } = req.body;
    const session = await paymentService.createStripeSession(req.user._id, { paymentType, referenceId, amount, description });
    return res.status(200).json({ success: true, data: session });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Téléverser une preuve de paiement (Reçu BNA/BDL/CCP/Visa)
 */
export const uploadProof = async (req, res) => {
  try {
    const file = req.file;
    const result = await paymentService.uploadPaymentProof(req.user._id, file, req.body);
    return res.status(201).json({ success: true, message: result.message, data: result.payment });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Obtenir les preuves de paiement en attente de modération (SuperAdmin)
 */
export const getPendingProofs = async (req, res) => {
  try {
    const data = await paymentService.getPendingPaymentProofs(req.query.page, req.query.limit);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Modérer une preuve de paiement (SuperAdmin Valider/Refuser)
 */
export const reviewProof = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const payment = await paymentService.reviewPaymentProof(req.user._id, req.params.id, { status, rejectionReason });
    return res.status(200).json({ success: true, message: `Statut de preuve mis à jour : [${payment.status}]`, data: payment });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
