// ============================================================================
// FICHIER : backend 2/config/helmet.js
// RÔLE : Configuration des en-têtes HTTP de sécurité avec Helmet
// ============================================================================

// 1. Importation du middleware de sécurité Helmet.js
import helmet from "helmet";

/**
 * Configure et masque les en-têtes de sécurité HTTP pour verrouiller les vulnérabilités.
 */
export const helmetMiddleware = helmet({
  // Content Security Policy (CSP)
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "ws:"],
    },
  },
  // Anti-Clickjacking : Interdit l'intégration dans des iFrames externes
  frameguard: { action: "deny" },
  // Cache la technologie utilisée (Remplace X-Powered-By)
  hidePoweredBy: { setTo: "Express Server" },
  // HTTP Strict Transport Security (HSTS) : Impose HTTPS pendant 1 an
  hsts: { maxAge: 31536000, includeSubDomains: true },
  // Empêche le navigateur de deviner le type MIME
  noSniff: true,
  // Protection XSS
  xssFilter: true,
});

export default helmetMiddleware;
