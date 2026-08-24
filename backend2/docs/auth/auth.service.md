# 📚 Documentation Technique Détaillée : `auth.service.js`

**Emplacement Source** : `auth/auth.service.js`  
**Portée** : Backend Serveur (Node.js / Express)  
**Nombre de Lignes Code** : 167 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `auth.service.js` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer la logique métier serveur, la gestion des routes HTTP versionnées, le traitement des requêtes entrantes, la persistance dans MongoDB ou la gestion des services de sécurité et de messagerie.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L7 | `import User from "./auth.model.js";` | Module indispensable pour les fonctionnalités du fichier. |
| L10 | `import bcrypt from "bcryptjs";` | Module indispensable pour les fonctionnalités du fichier. |
| L13 | `import jwt from "jsonwebtoken";` | Module indispensable pour les fonctionnalités du fichier. |
| L16 | `import crypto from "crypto";` | Module indispensable pour les fonctionnalités du fichier. |
| L19 | `import { sendPasswordResetEmail } from "../config/email.js";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

#### 🔹 `generateToken` (Ligne 26)
- **Signature / Extrait** : `export const generateToken = (userId, role) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `registerUser` (Ligne 37)
- **Signature / Extrait** : `export const registerUser = async ({ name, email, password }) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `loginUser` (Ligne 76)
- **Signature / Extrait** : `export const loginUser = async ({ email, password }) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `forgotPassword` (Ligne 113)
- **Signature / Extrait** : `export const forgotPassword = async (email) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

#### 🔹 `resetPassword` (Ligne 136)
- **Signature / Extrait** : `export const resetPassword = async (resetToken, newPassword) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

---

## 4. 🧠 Concepts Informatiques & Technologies Employés

Les concepts suivants sont au cœur du fonctionnement de ce fichier :

- **`BcryptJS` Hachage Cryptographique** : Algorithme de hachage fort unidirectionnel avec sel aléatoire pour protéger les mots de passe.
- **`JWT (JSON Web Token)`** : Norme de jeton d'authentification autonome et cryptographiquement signé pour la gestion des sessions utilisateurs stateless.
- **`Express Router`** : Gestionnaire de routage HTTP d'Express pour l'association des endpoints API aux contrôleurs métiers.


---

## 5. 💡 Pourquoi ces Choix Techniques ? (Justification Pédagogique)

> **Pourquoi avoir choisi cette implémentation ici ?**
> 
1. **Sécurité Maximale** : Aucune donnée sensible n'est transmise en clair ou exposée sans validation préalable via les middlewares de sécurité.
2. **Maintenabilité Architecture MERN** : La séparation claire entre routes, contrôleurs, services et modèles facilite l'évolution du code et les tests unitaires/E2E.
3. **Performance Réseau** : L'utilisation de fonctions asynchrones non-bloquantes (`async/await`) permet au serveur Node.js de traiter des milliers de requêtes concurrentes sans ralentissement.
