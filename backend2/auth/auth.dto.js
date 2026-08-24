// ============================================================================
// FICHIER : backend 2/auth/auth.dto.js
// RÃ”LE : SchÃ©mas de validation Joi pour les requÃªtes d'authentification (DTOs)
// ============================================================================

// 1. Importation du module de validation Joi
import Joi from "joi";

/**
 * SchÃ©ma de validation DTO pour l'inscription d'un nouvel utilisateur (Signup)
 */
export const registerDTO = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Le nom est obligatoire",
    "string.min": "Le nom doit comporter au moins 2 caractres",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "L'adresse email doit tre valide",
    "string.empty": "L'email est obligatoire",
  }),
  password: Joi.string().min(6).max(50).required().messages({
    "string.min": "Le mot de passe doit comporter au moins 6 caractres",
    "string.empty": "Le mot de passe est obligatoire",
  }),
  role: Joi.string().valid("buyer", "seller").optional(),
  shopName: Joi.string().optional().allow(""),
});

/**
 * SchÃ©ma de validation DTO pour la connexion (Login)
 */
export const loginDTO = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Format d'email invalide",
    "string.empty": "L'email est obligatoire",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Le mot de passe est obligatoire",
  }),
});

/**
 * SchÃ©ma de validation DTO pour la demande de rÃ©initialisation (Forgot Password)
 */
export const forgotPasswordDTO = Joi.object({
  email: Joi.string().email().required(),
});

/**
 * SchÃ©ma de validation DTO pour la rÃ©initialisation effective (Reset Password)
 */
export const resetPasswordDTO = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});


