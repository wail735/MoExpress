# 📚 Documentation Technique Détaillée : `payment.service.js`

**Emplacement Source** : `payments/payment.service.js`  
**Portée** : Backend Serveur (Node.js / Express)  
**Nombre de Lignes Code** : 209 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `payment.service.js` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer la logique métier serveur, la gestion des routes HTTP versionnées, le traitement des requêtes entrantes, la persistance dans MongoDB ou la gestion des services de sécurité et de messagerie.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L6 | `import Payment from "./payment.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L7 | `import User from "../users/user.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L8 | `import Order from "../orders/order.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L9 | `import Ad from "../ads/ad.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L10 | `import Settings from "../config/settings.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L11 | `import { uploadImage } from "../config/cloudinary.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L12 | `import { createNotification } from "../notifications/notification.service.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L13 | `import { subscribeToPlan } from "../subscriptions/subscription.service.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L14 | `import Stripe from "stripe";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

#### 🔹 `getBankDetails` (Ligne 19)
- **Signature / Extrait** : `export const getBankDetails = async () => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `createStripeSession` (Ligne 46)
- **Signature / Extrait** : `export const createStripeSession = async (userId, { paymentType, referenceId, amount, description }) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `uploadPaymentProof` (Ligne 102)
- **Signature / Extrait** : `export const uploadPaymentProof = async (userId, file, { paymentType, referenceId, method, amount }) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `reviewPaymentProof` (Ligne 143)
- **Signature / Extrait** : `export const reviewPaymentProof = async (adminId, paymentId, { status, rejectionReason = "" }) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `getPendingPaymentProofs` (Ligne 190)
- **Signature / Extrait** : `export const getPendingPaymentProofs = async (page = 1, limit = 20) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `skip` (Ligne 191)
- **Signature / Extrait** : `const skip = (Number(page) - 1) * Number(limit);`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

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
