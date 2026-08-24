# 📚 Documentation Technique Détaillée : `CoinsWallet.jsx`

**Emplacement Source** : `src/pages/user/CoinsWallet.jsx`  
**Portée** : Frontend Client React (Vite SPA)  
**Nombre de Lignes Code** : 119 lignes  

---

## 1. 📌 Rôle et Responsabilité du Fichier

Le fichier `CoinsWallet.jsx` est un composant clé de l'architecture MoExpress (AliExpress Clone).

Il a pour rôle d'assurer le rendu réactif de l'interface utilisateur, la gestion des états locaux et globaux, la capture des événements utilisateur et l'interaction fluide avec les APIs REST du backend via Axios.

---

## 2. 🔗 Dépendances & Importations Explicites

Ce fichier s'appuie sur les importations suivantes pour exécuter ses fonctions :

| Ligne | Module / Composant Importé | Rôle & Nécessité Technologique |
| :--- | :--- | :--- |
| L6 | `import React, { useState } from "react";` | Module indispensable pour les fonctionnalités du fichier. |
| L7 | `import { Link, useNavigate } from "react-router-dom";` | Module indispensable pour les fonctionnalités du fichier. |
| L8 | `import { Coins, PlusCircle, CheckCircle, Sparkles, LogIn } from "lucide-react";` | Module indispensable pour les fonctionnalités du fichier. |
| L9 | `import { useAuth } from "../../context/AuthContext";` | Module indispensable pour les fonctionnalités du fichier. |
| L10 | `import { useCurrency } from "../../context/CurrencyContext";` | Module indispensable pour les fonctionnalités du fichier. |
| L11 | `import { useNotification } from "../../context/NotificationContext";` | Module indispensable pour les fonctionnalités du fichier. |

---

## 3. 📝 Analyse Approfondie du Code (Séquence et Structure)

### Découpage du Fichier et Fonctions Déclarées :

#### 🔹 `CoinsWallet` (Ligne 13)
- **Signature / Extrait** : `export const CoinsWallet = () => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Synchrone.

#### 🔹 `handleBuyCoins` (Ligne 29)
- **Signature / Extrait** : `const handleBuyCoins = async (pack) => {`
- **Rôle Fonctionnel** : Cette fonction/méthode est responsable de l'exécution d'une étape clé du traitement.
- **Mode d'Exécution** : Asynchrone avec retour de Promesse (`Promise`).

---

## 4. 🧠 Concepts Informatiques & Technologies Employés

Les concepts suivants sont au cœur du fonctionnement de ce fichier :

- **`useState` (React State Hook)** : Permet d'associer un état local réactif à ce composant. Dès que l'état change, React redéfinit et réaffiche les éléments du DOM impactés.
- **`useContext` & Context API** : Permet de consommer des états globaux partagés (ex: `AuthContext` pour la session utilisateur, `NotificationContext` pour les toasts).
- **`useNavigate` (React Router)** : Offre la navigation programmatique dynamique sans rechargement complet de la page navigateur.
- **`Express Router`** : Gestionnaire de routage HTTP d'Express pour l'association des endpoints API aux contrôleurs métiers.


---

## 5. 💡 Pourquoi ces Choix Techniques ? (Justification Pédagogique)

> **Pourquoi avoir choisi cette implémentation ici ?**
> 
1. **Réactivité & Fluidité UX** : L'utilisation de React et des hooks garantit une mise à jour instantanée de l'interface utilisateur sans rechargement de page.
2. **Découplage Propre** : Les appels API sont isolés pour assurer la séparation stricte entre la couche de présentation UI et les échanges réseau.
3. **Robustesse & Erreurs** : Les blocs de capture d'erreur empêchent le plantage de l'application et fournissent un retour d'information clair via les notifications toast.
