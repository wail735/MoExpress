# 📚 Documentation Technique Détaillée : `server.js`

**Emplacement Source** : `server.js`  
**Portée** : Backend Serveur (Node.js / Express)  
**Nombre de Lignes Code** : 150 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `server.js` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer la logique métier serveur, la gestion des routes HTTP versionnées, le traitement des requêtes entrantes, la persistance dans MongoDB ou la gestion des services de sécurité et de messagerie.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L6 | `import dotenv from "dotenv";` | Module indispensable pour les fonctionnalités du fichier. |
| L10 | `import express from "express";` | Module indispensable pour les fonctionnalités du fichier. |
| L13 | `import http from "http";` | Module indispensable pour les fonctionnalités du fichier. |
| L16 | `import connectDB from "./config/database.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L17 | `import { createRedisClient } from "./config/redis.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L18 | `import { initSocket } from "./config/socket.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L19 | `import { corsMiddleware } from "./config/cors.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L20 | `import { helmetMiddleware } from "./config/helmet.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L21 | `import { generalLimiter } from "./config/rateLimit.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L22 | `import { morganMiddleware } from "./config/morgan.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L23 | `import { checkBannedMiddleware } from "./security/ban.middleware.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L24 | `import registerChatSocketHandlers from "./chat/chat.socket.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L27 | `import authRoutes from "./auth/auth.routes.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L28 | `import productRoutes from "./products/product.routes.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L29 | `import userRoutes from "./users/user.routes.js";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

Ce fichier exporte principalement une structure par défaut (composant React ou configuration) qui est instanciée et exécutée lors du rendu ou de la chaîne de middleware.

---

## 4. 🧠 Concepts Informatiques & Technologies Employés

Les concepts suivants sont au cœur du fonctionnement de ce fichier :

- **`Express Router`** : Gestionnaire de routage HTTP d'Express pour l'association des endpoints API aux contrôleurs métiers.


---

## 5. 💡 Pourquoi ces Choix Techniques ? (Justification Pédagogique)

> **Pourquoi avoir choisi cette implémentation ici ?**
> 
1. **Sécurité Maximale** : Aucune donnée sensible n'est transmise en clair ou exposée sans validation préalable via les middlewares de sécurité.
2. **Maintenabilité Architecture MERN** : La séparation claire entre routes, contrôleurs, services et modèles facilite l'évolution du code et les tests unitaires/E2E.
3. **Performance Réseau** : L'utilisation de fonctions asynchrones non-bloquantes (`async/await`) permet au serveur Node.js de traiter des milliers de requêtes concurrentes sans ralentissement.
