// ============================================================================
// FICHIER : backend 2/users/user.controller.js
// RÔLE : Contrôleur des endpoints Panier, Wishlist, Candidature Boutique Pro et Vendeur
// ============================================================================

import * as userService from "./user.service.js";
import { addToCartDTO, updateCartQuantityDTO, wishlistActionDTO } from "./user.dto.js";

/**
 * Ajouter au panier
 */
export const addToCart = async (req, res) => {
  try {
    const { error, value } = addToCartDTO.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const cart = await userService.addToCart(req.user._id, value.productId, value.quantity);
    return res.status(200).json({ success: true, message: "Produit ajouté au panier !", data: cart });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Obtenir le panier
 */
export const getCart = async (req, res) => {
  try {
    const cart = await userService.getCart(req.user._id);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Mettre à jour la quantité d'un produit du panier
 */
export const updateCartQuantity = async (req, res) => {
  try {
    const { error, value } = updateCartQuantityDTO.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const cart = await userService.updateCartQuantity(req.user._id, value.productId, value.quantity);
    return res.status(200).json({ success: true, message: "Quantité mise à jour", data: cart });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Supprimer du panier
 */
export const removeFromCart = async (req, res) => {
  try {
    const cart = await userService.removeFromCart(req.user._id, req.params.productId);
    return res.status(200).json({ success: true, message: "Produit retiré du panier", data: cart });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Ajouter / Retirer de la Wishlist
 */
export const toggleWishlist = async (req, res) => {
  try {
    const { error, value } = wishlistActionDTO.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const result = await userService.toggleWishlist(req.user._id, value.productId);
    return res.status(200).json({ success: true, action: result.action, data: result.wishlist });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Obtenir la liste des favoris (Wishlist)
 */
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await userService.getWishlist(req.user._id);
    return res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Soumettre un dossier de candidature pour devenir Boutique Pro
 */
export const applyProShop = async (req, res) => {
  try {
    const result = await userService.applyForProShop(req.user._id, req.body);
    return res.status(200).json({ success: true, message: result.message, data: result.proShopDetails });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Consulter l'état de sa candidature Boutique Pro
 */
export const getProShopStatus = async (req, res) => {
  try {
    const data = await userService.getProShopStatus(req.user._id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Accéder au Tableau de Bord Vendeur (Ventes & Solde)
 */
export const getSellerDashboard = async (req, res) => {
  try {
    const data = await userService.getSellerDashboard(req.user._id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
