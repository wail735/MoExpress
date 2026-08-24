// ============================================================================
// FICHIER : backend 2/auth/auth.controller.js
// RÃ”LE : ContrÃ´leur gÃ©rant les requÃªtes HTTP d'authentification
// ============================================================================

// 1. Importation du service d'authentification
import * as authService from "./auth.service.js";

// 2. Importation des DTOs de validation Joi
import { registerDTO, loginDTO, forgotPasswordDTO, resetPasswordDTO } from "./auth.dto.js";

/**
 * ContrÃ´leur d'inscription (Signup)
 */
export const register = async (req, res, next) => {
  try {
    // Valide le corps de la requÃªte avec Joi DTO
    const { error, value } = registerDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // ExÃ©cute le service d'inscription
    const result = await authService.registerUser(value);

    // Retourne une rÃ©ponse 201 Created
    return res.status(201).json({
      success: true,
      message: "Compte crÃ©Ã© avec succÃ¨s !",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ContrÃ´leur de connexion (Login)
 */
export const login = async (req, res, next) => {
  try {
    // Valide les identifiants
    const { error, value } = loginDTO.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // ExÃ©cute le service de connexion
    const result = await authService.loginUser(value);

    return res.status(200).json({
      success: true,
      message: "Connexion rÃ©ussie !",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

/**
 * ContrÃ´leur d'oubli de mot de passe (Forgot Password)
 */
export const googleLogin = async (req, res, next) => {
  try {
    const { email, name, photoURL, uid } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "L'email est requis pour la connexion Google." });
    }
    
    const result = await authService.googleLogin({ email, name, photoURL, uid });
    
    return res.status(200).json({
      success: true,
      message: "Connexion Google russie !",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

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
 * ContrÃ´leur de rÃ©initialisation du mot de passe (Reset Password)
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
 * RÃ©cupÃ©ration du profil utilisateur connectÃ© (Me)
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
 * Endpoint de dÃ©clenchement d'ensemencement (Seed Accounts & Data)
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

