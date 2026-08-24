// ============================================================================
// FICHIER : backend 2/orders/order.controller.js
// RÔLE : Contrôleur gérant les requêtes HTTP des commandes et du suivi (Tracking)
// ============================================================================

import * as orderService from "./order.service.js";
import { createOrderDTO, updateOrderStatusDTO } from "./order.dto.js";

/**
 * Créer une commande à partir du panier (Checkout)
 */
export const createOrder = async (req, res) => {
  try {
    const { error, value } = createOrderDTO.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const order = await orderService.createOrder(req.user._id, value);
    return res.status(201).json({
      success: true,
      message: "Commande créée avec succès !",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Obtenir l'historique des commandes de l'utilisateur connecté
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.user._id);
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Suivre le statut d'une commande (Order Tracking)
 */
export const trackOrder = async (req, res) => {
  try {
    const tracking = await orderService.trackOrder(req.params.id, req.user._id);
    return res.status(200).json({ success: true, data: tracking });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Mettre à jour le statut d'une commande (Admin / SuperAdmin)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { error, value } = updateOrderStatusDTO.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const order = await orderService.updateOrderStatus(req.params.id, value);
    return res.status(200).json({ success: true, message: "Statut mis à jour", data: order });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
