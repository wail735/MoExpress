// ============================================================================
// FICHIER : backend 2/server.js
// RÔLE : Point d'entrée principal du serveur Backend 2 (AliExpress Clone MERN)
// ============================================================================

import dotenv from "dotenv";
dotenv.config();

// 1. Importation du framework Express pour la gestion des routes HTTP
import express from "express";

// 2. Importation du module HTTP natif de Node.js pour intégrer WebSockets (Socket.io)
import http from "http";

// 3. Importation des configurations de sécurité, base de données et services
import connectDB from "./config/database.js";
import { createRedisClient } from "./config/redis.js";
import { initSocket } from "./config/socket.js";
import { corsMiddleware } from "./config/cors.js";
import { helmetMiddleware } from "./config/helmet.js";
import { generalLimiter } from "./config/rateLimit.js";
import { morganMiddleware } from "./config/morgan.js";
import { checkBannedMiddleware } from "./security/ban.middleware.js";
import registerChatSocketHandlers from "./chat/chat.socket.js";

// 4. Importation des routeurs de modules orientés fonctionnalités
import authRoutes from "./auth/auth.routes.js";
import productRoutes from "./products/product.routes.js";
import userRoutes from "./users/user.routes.js";
import orderRoutes from "./orders/order.routes.js";
import subscriptionRoutes from "./subscriptions/subscription.routes.js";
import coinRoutes from "./coins/coin.routes.js";
import supportRoutes from "./support/support.routes.js";
import chatRoutes from "./chat/chat.routes.js";
import adminRoutes from "./admin/admin.routes.js";
import notificationRoutes from "./notifications/notification.routes.js";
import adRoutes from "./ads/ad.routes.js";
import contactRoutes from "./contact/contact.routes.js";
import newsletterRoutes from "./newsletter/newsletter.routes.js";
import socialRoutes from "./social/social.routes.js";
import disputeRoutes from "./disputes/dispute.routes.js";
import paymentRoutes from "./payments/payment.routes.js";
import aiRoutes from "./ai/ai.routes.js";

// 5. Initialisation de l'application Express
const app = express();

// 6. Connexion à la base de données MongoDB
connectDB();

// 7. Connexion au client Redis pour le cache et les compteurs
const redisClient = createRedisClient();

// 8. Création du serveur HTTP natif à partir de l'instance Express (Requis pour WebSockets)
const server = http.createServer(app);

// 9. Initialisation du serveur WebSockets (Socket.io)
const io = initSocket(server);

// 10. Enregistrement des gestionnaires d'événements de chat en temps réel sur Socket.io
registerChatSocketHandlers(io);

// ============================================================================
// 🔒 CHAÎNE DE MIDDLEWARES DE SÉCURITÉ ET OPTIMISATION
// ============================================================================

// A. Sécurisation des en-têtes HTTP avec Helmet
app.use(helmetMiddleware);

// B. Activation de la politique CORS pour autoriser le frontend
app.use(corsMiddleware);

// C. Limitation du taux de requêtes pour protéger contre les attaques DDoS
app.use("/api", generalLimiter);

// D. Middleware de bannissement de sécurité (IP / Email blacklist check)
app.use(checkBannedMiddleware);

// E. Journalisation des requêtes HTTP dans la console
app.use(morganMiddleware);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// F. Parsers pour décoder le JSON et les formulaires dans req.body (limite 10Mo pour images)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// G. Service statique pour les fichiers téléversés dans le dossier uploads/ (sans Cloudinary)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================================================
// 🔀 BRANCHEMENT DES ROUTES D'API REST VERSIONNÉES (/api/v1)
// ============================================================================

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/coins", coinRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/ads", adRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/social", socialRoutes);
app.use("/api/v1/disputes", disputeRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/ai", aiRoutes);

// Route racine d'accueil et de test d'état du serveur (Healthcheck)
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "🚀 Serveur Backend 2 (AliExpress Clone) est opérationnel !",
    timestamp: new Date().toISOString(),
  });
});

// Middleware de gestion des routes non trouvées (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `La route [${req.method} ${req.originalUrl}] n'existe pas sur ce serveur.`,
  });
});

// Middleware de gestion globale des erreurs serveur (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur non interceptée :", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur interne du serveur",
  });
});

// ============================================================================
// 🚀 DÉMARRAGE DE L'ÉCOUTE SUR LE PORT RÉSEAU
// ============================================================================

// Importation du script d'ensemencement (.env)
import { seedDatabase } from "./config/seed.js";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Serveur Backend 2 démarré sur le port ${PORT}`);
  console.log(`⚡ WebSockets (Socket.io) écoute sur ws://localhost:${PORT}`);
  seedDatabase().catch((err) => console.log("Seeding deferred:", err.message));
});

export default app;
