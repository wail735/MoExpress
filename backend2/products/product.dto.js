// ============================================================================
// FICHIER : backend 2/products/product.dto.js
// RÔLE : Schémas de validation Joi pour la création et mise à jour de produits (DTOs)
// ============================================================================

// 1. Importation de Joi
import Joi from "joi";

/**
 * DTO de création d'un produit
 */
export const createProductDTO = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  comparePrice: Joi.number().min(0).optional(),
  quantity: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  subCategory: Joi.string().allow(""),
  brand: Joi.string().allow(""),
});

/**
 * DTO de mise à jour d'un produit
 */
export const updateProductDTO = Joi.object({
  name: Joi.string().min(3).max(200).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().positive().optional(),
  comparePrice: Joi.number().min(0).optional(),
  quantity: Joi.number().integer().min(0).optional(),
  category: Joi.string().optional(),
  subCategory: Joi.string().allow(""),
  brand: Joi.string().allow(""),
  isPublished: Joi.boolean().optional(),
});
