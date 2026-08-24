// ============================================================================
// FICHIER : backend 2/config/rateLimit.js
// RÔLE : Limitation du taux de requêtes HTTP (Rate Limiting Anti-DDoS et Recherche Ollama)
// ============================================================================

import rateLimit from "express-rate-limit";

// 1. Limiteur de débit général pour l'API REST (100 requêtes par 15 minutes par IP)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
  max: 100, // 100 requêtes maximum par fenêtre
  message: {
    success: false,
    message: "Trop de requêtes envoyées depuis cette IP. Veuillez rééessayer dans 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Limiteur strict pour l'authentification (15 tentatives max par 15 minutes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  },
});

// 3. Limiteur adapté à l'auto-complétion Ollama en direct (120 requêtes par minute par IP)
// Permet la frappe en direct lettre par lettre au clavier sans bloquer l'utilisateur
export const autocompleteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // Fenêtre de 1 minute
  max: 120, // 120 requêtes par minute
  message: {
    success: false,
    message: "Trop de requêtes d'auto-complétion. Veuillez ralentir la frappe au clavier.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default {
  generalLimiter,
  authLimiter,
  autocompleteLimiter,
};
