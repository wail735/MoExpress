// ============================================================================
// FICHIER : backend 2/auth/auth.controller.js
// RÔLE : Contrôleur gérant les requêtes HTTP d'authentification
// ============================================================================

// 1. Importation du service d'authentification
import * as authService from "./auth.service.js";

// 2. Importation des DTOs de validation Joi
import { registerDTO, loginDTO, forgotPasswordDTO, resetPasswordDTO } from "./auth.dto.js";

/**
 * Contrôleur d'inscription (Signup)
 */
export const register = async (req, res, next) => {
  try {
    // Valide le corps de la requête avec Joi DTO
    const { error, value } = registerDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Exécute le service d'inscription
    const result = await authService.registerUser(value);

    // Retourne une réponse 201 Created
    return res.status(201).json({
      success: true,
      message: "Compte créé avec succès !",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Contrôleur de connexion (Login)
 */
export const login = async (req, res, next) => {
  try {
    // Valide les identifiants
    const { error, value } = loginDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Exécute le service de connexion
    const result = await authService.loginUser(value);

    return res.status(200).json({
      success: true,
      message: "Connexion réussie !",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

/**
 * Contrôleur d'oubli de mot de passe (Forgot Password)
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { error, value } = forgotPasswordDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const result = await authService.forgotPassword(value.email);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Contrôleur de réinitialisation du mot de passe (Reset Password)
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { error, value } = resetPasswordDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const result = await authService.resetPassword(value.token, value.newPassword);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Récupération du profil utilisateur connecté (Me)
 */
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Endpoint de déclenchement d'ensemencement (Seed Accounts & Data)
 */
export const seed = async (req, res) => {
  try {
    const seedDatabase = (await import("../config/seed.js")).default;
    const result = await seedDatabase();
    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
