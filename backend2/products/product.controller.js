// ============================================================================
// FICHIER : backend 2/products/product.controller.js
// RÔLE : Contrôleur gérant les requêtes HTTP sur les produits et l'auto-complétion Ollama
// ============================================================================

import * as productService from "./product.service.js";
import { createProductDTO, updateProductDTO } from "./product.dto.js";

/**
 * Créer un produit (Admin / SuperAdmin / Seller Pro)
 */
export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = createProductDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const product = await productService.createProduct(value, req.files, req.user._id);

    return res.status(201).json({
      success: true,
      message: "Produit créé avec succès !",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Obtenir tous les produits avec recherche et filtres
 */
export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.searchProducts(req.query);
    return res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Auto-complétion de la recherche client mot par mot / lettre par lettre (API Ollama AI + BDD)
 */
export const autocomplete = async (req, res, next) => {
  try {
    const queryText = req.query.q || req.query.query || "";
    const result = await productService.autocompleteSearch(queryText);
    return res.status(200).json({
      success: true,
      query: queryText,
      source: result.source,
      suggestions: result.suggestions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Obtenir un produit par son ID
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Mettre à jour un produit
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { error, value } = updateProductDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const updatedProduct = await productService.updateProduct(req.params.id, value, req.files);

    return res.status(200).json({
      success: true,
      message: "Produit mis à jour avec succès !",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Supprimer un produit
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
