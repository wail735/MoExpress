# 📚 Documentation Technique Détaillée : `social.service.js`

**Emplacement Source** : `social/social.service.js`  
**Portée** : Backend Serveur (Node.js / Express)  
**Nombre de Lignes Code** : 177 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `social.service.js` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer la logique métier serveur, la gestion des routes HTTP versionnées, le traitement des requêtes entrantes, la persistance dans MongoDB ou la gestion des services de sécurité et de messagerie.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L6 | `import { FriendRequest, Review } from "./social.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L7 | `import User from "../users/user.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L8 | `import Product from "../products/product.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L9 | `import { createNotification } from "../notifications/notification.service.js";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

#### 🔹 `sendFriendRequest` (Ligne 14)
- **Signature / Extrait** : `export const sendFriendRequest = async (requesterId, recipientId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `respondFriendRequest` (Ligne 58)
- **Signature / Extrait** : `export const respondFriendRequest = async (requestId, recipientId, status) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `getUserFriends` (Ligne 90)
- **Signature / Extrait** : `export const getUserFriends = async (userId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `addProductReview` (Ligne 106)
- **Signature / Extrait** : `export const addProductReview = async (userId, productId, rating, comment) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `likeReview` (Ligne 131)
- **Signature / Extrait** : `export const likeReview = async (userId, reviewId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `shareProduct` (Ligne 149)
- **Signature / Extrait** : `export const shareProduct = async (productId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `getProductReviews` (Ligne 162)
- **Signature / Extrait** : `export const getProductReviews = async (productId) => {`
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
