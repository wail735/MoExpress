// ============================================================================
// FICHIER : backend 2/config/database.js
// RÔLE : Connexion à la base de données NoSQL MongoDB via Mongoose
// ============================================================================

// 1. Importation du module Mongoose pour la modélisation et les requêtes MongoDB
import mongoose from "mongoose";

// 2. Importation de Dotenv pour charger les variables d'environnement (.env)
import dotenv from "dotenv";

// 3. Exécution de dotenv.config() pour lire le fichier .env et populer process.env
dotenv.config();

/**
 * Fonction asynchrone d'initialisation de la connexion MongoDB.
 * MongoDB est une base de données NoSQL orientée document, idéale pour les applications
 * e-commerce évolutives car elle permet de stocker des structures de données complexes (ex: paniers, sous-documents).
 */
const connectDB = async () => {
  try {
    // 4. Récupération de la chaîne de connexion (URI) depuis la variable d'environnement MONGO_URI
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aliexpress_clone_db";

    // 5. Établissement de la connexion réseau asynchrone avec le serveur MongoDB
    const conn = await mongoose.connect(mongoURI);

    // 6. Affichage d'un message de confirmation de succès sur la console
    console.log(`✅ Base de données MongoDB connectée avec succès sur l'hôte : ${conn.connection.host}`);
  } catch (error) {
    // 7. En cas d'échec de connexion, affichage du message d'erreur détaillé
    console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);

    // 8. Arrêt immédiat du processus Node.js avec le code d'erreur 1 pour éviter de faire tourner un serveur aveugle
    process.exit(1);
  }
};

// 9. Exportation par défaut de la fonction connectDB pour l'invoquer au démarrage de server.js
export default connectDB;
