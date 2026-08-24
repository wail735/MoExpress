# 📚 Documentation Technique Détaillée : `CartContext.jsx`

**Emplacement Source** : `src/context/CartContext.jsx`  
**Portée** : Frontend Client React (Vite SPA)  
**Nombre de Lignes Code** : 86 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `CartContext.jsx` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer le rendu réactif de l'interface utilisateur, la gestion des états locaux et globaux, la capture des événements utilisateur et l'interaction fluide avec les APIs REST du backend via Axios.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L6 | `import React, { createContext, useContext, useState, useEffect } from "react";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

#### 🔹 `CartProvider` (Ligne 10)
- **Signature / Extrait** : `export const CartProvider = ({ children }) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `addToCart` (Ligne 20)
- **Signature / Extrait** : `const addToCart = (product, quantity = 1) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `removeFromCart` (Ligne 38)
- **Signature / Extrait** : `const removeFromCart = (productId) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `updateQuantity` (Ligne 47)
- **Signature / Extrait** : `const updateQuantity = (productId, quantity) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `clearCart` (Ligne 60)
- **Signature / Extrait** : `const clearCart = () => setCartItems([]);`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `subtotal` (Ligne 62)
- **Signature / Extrait** : `const subtotal = (cartItems \|\| []).reduce((sum, item) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `totalCount` (Ligne 66)
- **Signature / Extrait** : `const totalCount = (cartItems \|\| []).reduce((sum, item) => sum + (item.quantity \|\| 1), 0);`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `useCart` (Ligne 85)
- **Signature / Extrait** : `export const useCart = () => useContext(CartContext);`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

---

## 4. 🧠 Concepts Informatiques & Technologies Employés

Les concepts suivants sont au cœur du fonctionnement de ce fichier :

- **`useState` (React State Hook)** : Permet d'associer un état local réactif à ce composant. Dès que l'état change, React redéfinit et réaffiche les éléments du DOM impactés.
- **`useEffect` (React Lifecycle Hook)** : Gère les effets secondaires. Il s'exécute après le rendu du composant et permet la synchronisation avec des APIs distantes ou des abonnements.
- **`useContext` & Context API** : Permet de consommer des états globaux partagés (ex: `AuthContext` pour la session utilisateur, `NotificationContext` pour les toasts).
- **`Express Router`** : Gestionnaire de routage HTTP d'Express pour l'association des endpoints API aux contrôleurs métiers.


---

## 5. 💡 Pourquoi ces Choix Techniques ? (Justification Pédagogique)

> **Pourquoi avoir choisi cette implémentation ici ?**
> 
1. **Réactivité & Fluidité UX** : L'utilisation de React et des hooks garantit une mise à jour instantanée de l'interface utilisateur sans rechargement de page.
2. **Découplage Propre** : Les appels API sont isolés pour assurer la séparation stricte entre la couche de présentation UI et les échanges réseau.
3. **Robustesse & Erreurs** : Les blocs de capture d'erreur empêchent le plantage de l'application et fournissent un retour d'information clair via les notifications toast.
