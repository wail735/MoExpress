// ============================================================================
// FICHIER : backend 2/config/morgan.js
// RÔLE : Journalisation (Logging) des requêtes HTTP avec Morgan
// ============================================================================

// 1. Importation du middleware de logging HTTP Morgan
import morgan from "morgan";

// 2. Exportation du middleware morgan configuré en mode 'dev' (affichage coloré sur la console)
export const morganMiddleware = morgan("dev");

export default morganMiddleware;
