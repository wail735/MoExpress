# 📚 Documentation Technique Détaillée : `notification.service.js`

**Emplacement Source** : `notifications/notification.service.js`  
**Portée** : Backend Serveur (Node.js / Express)  
**Nombre de Lignes Code** : 130 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `notification.service.js` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer la logique métier serveur, la gestion des routes HTTP versionnées, le traitement des requêtes entrantes, la persistance dans MongoDB ou la gestion des services de sécurité et de messagerie.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L6 | `import Notification from "./notification.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L7 | `import User from "../users/user.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L8 | `import { sendEmail } from "../config/email.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L9 | `import { getIO } from "../config/socket.js";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

#### 🔹 `createNotification` (Ligne 14)
- **Signature / Extrait** : `export const createNotification = async ({`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `getUserNotifications` (Ligne 82)
- **Signature / Extrait** : `export const getUserNotifications = async (userId, page = 1, limit = 20) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `skip` (Ligne 83)
- **Signature / Extrait** : `const skip = (Number(page) - 1) * Number(limit);`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `markAsRead` (Ligne 105)
- **Signature / Extrait** : `export const markAsRead = async (notificationId, userId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `markAllAsRead` (Ligne 119)
- **Signature / Extrait** : `export const markAllAsRead = async (userId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

---

## 4. 🧠 Concepts Informatiques & Technologies Employés

Les concepts suivants sont au cœur du fonctionnement de ce fichier :



---

## 5. 💡 Pourquoi ces Choix Techniques ? (Justification Pédagogique)

> **Pourquoi avoir choisi cette implémentation ici ?**
> 
1. **Sécurité Maximale** : Aucune donnée sensible n'est transmise en clair ou exposée sans validation préalable via les middlewares de sécurité.
2. **Maintenabilité Architecture MERN** : La séparation claire entre routes, contrôleurs, services et modèles facilite l'évolution du code et les tests unitaires/E2E.
3. **Performance Réseau** : L'utilisation de fonctions asynchrones non-bloquantes (`async/await`) permet au serveur Node.js de traiter des milliers de requêtes concurrentes sans ralentissement.
