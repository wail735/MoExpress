// ============================================================================
// FICHIER : backend 2/config/redis.js
// RÔLE : Gestion du cache en mémoire RAM et compteurs distribués avec Redis
// ============================================================================

// 1. Importation du client officiel Redis pour Node.js
import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

/**
 * CONCEPT : QU'EST-CE QUE REDIS ?
 * Redis (Remote Dictionary Server) est une base de données en mémoire vive (RAM) ultra-rapide.
 * Contrairement à MongoDB qui écrit sur le disque dur, Redis conserve les données directement dans la mémoire vive,
 * offrant des temps de réponse inférieurs à la milliseconde (sub-millisecond latency).
 *
 * POURQUOI L'UTILISER DANS UN E-COMMERCE ?
 * 1. Cache de Catalogue Produit : Évite d'interroger MongoDB à chaque fois qu'un utilisateur consulte un produit phare.
 * 2. Compteurs de Rate Limiting : Compte instantanément le nombre de requêtes par IP sans surcharger la BDD.
 * 3. Session Store : Stockage des sessions utilisateur actives.
 */

export const createRedisClient = () => {
  const clientOptions = process.env.REDIS_URL
    ? { url: process.env.REDIS_URL }
    : {
        username: process.env.REDIS_USERNAME || "default",
        password: process.env.REDIS_PASSWORD || "0yDAOLTJTFHm2ePhiZF6cqUKEtpWWRyC",
        socket: {
          host: process.env.REDIS_HOST || "flight-tiger-cloudlike-55770.db.redis.io",
          port: parseInt(process.env.REDIS_PORT) || 14879,
        },
      };

  const client = redis.createClient(clientOptions);

  // 4. Écoute de l'événement de connexion initiale réussie
  client.on("connect", () => {
    console.log("✅ Client Redis connecté avec succès à la mémoire RAM");
  });

  // 5. Écoute des erreurs de connexion ou d'exécution de commandes
  client.on("error", (error) => {
    const errMsg = error?.message || (typeof error === "object" ? JSON.stringify(error) : String(error));
    if (errMsg && errMsg.trim()) {
      console.error(`❌ Erreur Redis : ${errMsg}`);
    }
  });

  // 6. Écoute de l'événement indiquant que Redis est prêt à recevoir des commandes
  client.on("ready", () => {
    console.log("🔄 Redis est prêt pour les opérations de mise en cache");
  });

  // 7. Écoute de l'événement de déconnexion
  client.on("end", () => {
    console.warn("⚠️ Client Redis déconnecté");
  });

  // 8. Démarrage asynchrone de la connexion Redis
  client.connect().catch((err) => {
    console.error("❌ Échec de la connexion initiale à Redis :", err.message);
  });

  // 9. Retourne l'instance du client
  return client;
};

/**
 * Stocke une valeur en cache dans Redis avec une durée d'expiration (TTL).
 * @param {Object} client - Instance du client Redis
 * @param {string} key - Clé unique du cache
 * @param {any} data - Données à stocker (seront converties en chaîne JSON)
 * @param {number} ttl - Time-To-Live en secondes (par défaut 3600s = 1 heure)
 */
export const cacheData = async (client, key, data, ttl = 3600) => {
  try {
    // Convertit l'objet JavaScript en chaîne JSON
    const serializedData = JSON.stringify(data);
    // Définit la clé avec expiration automatique (SETEX key seconds value)
    await client.setEx(key, ttl, serializedData);
    return true;
  } catch (error) {
    console.error(`Erreur d'écriture dans le cache Redis [${key}] :`, error.message);
    return false;
  }
};

/**
 * Récupère et désérialise une donnée du cache Redis.
 * @param {Object} client - Instance du client Redis
 * @param {string} key - Clé du cache à lire
 */
export const getCachedData = async (client, key) => {
  try {
    // Lit la valeur sous forme de chaîne JSON
    const rawData = await client.get(key);
    // Si la clé n'existe pas ou a expiré, retourne null
    if (!rawData) return null;
    // Reconvertit la chaîne JSON en objet JavaScript
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Erreur de lecture du cache Redis [${key}] :`, error.message);
    return null;
  }
};

/**
 * Invalide (supprime) les clés de cache correspondant à un motif (pattern).
 * @param {Object} client - Instance du client Redis
 * @param {string} pattern - Motif de recherche des clés (ex: "product:*")
 */
export const invalidateCache = async (client, pattern) => {
  try {
    // Recherche des clés correspondant au motif
    const keys = await client.keys(pattern);
    // Si des clés sont trouvées, les supprimer en masse
    if (keys && keys.length > 0) {
      await client.del(keys);
    }
    return true;
  } catch (error) {
    console.error(`Erreur d'invalidation du cache Redis [${pattern}] :`, error.message);
    return false;
  }
};

export default {
  createRedisClient,
  cacheData,
  getCachedData,
  invalidateCache,
};
