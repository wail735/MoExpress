# ⚡ Documentation Backend 2 - REST API & WebSockets MoExpress MARKETPLACE

## Architecture Orientée Fonctionnalités (`backend 2/`)

Le serveur Backend 2 est une API REST Node.js/Express connectée à MongoDB et Redis avec intégration WebSockets (Socket.io).

---

## 🔀 Répertoire des Endpoints API (`/api/v1`)

| Module | Route Principale | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/v1/auth` | Authentification, Inscription multi-rôles (`buyer`, `seller`), Connexion JWT |
| **Products** | `/api/v1/products` | Gestion du catalogue, recherche auto-complétée Ollama AI (`/autocomplete`), liens Meta Ads |
| **Users** | `/api/v1/users` | Profil utilisateur, demandes Boutique Pro (`/pro-shop/apply`), dashboard vendeur limité |
| **Admin** | `/api/v1/admin` | Réglages dynamiques, création d'Admins, distribution de rôles, bannissements IP/Email |
| **Ads** | `/api/v1/ads` | Publicités auto-service style Meta Ads, placements sponsorisés sur la Homepage |
| **Payments** | `/api/v1/payments` | Checkout Stripe, coordonnées RIB BNA & RIP CCP, validation des reçus de virement |
| **Disputes** | `/api/v1/disputes` | Centre de résolution de conflits, ouverture de litiges escroquerie & arbitrage SuperAdmin |
| **Social** | `/api/v1/social` | Réseau d'amis, demandes d'ajout, avis/commentaires produits (1-5★), likes & partages |
| **Contact** | `/api/v1/contact` | Formulaire de contact public & réponses directes par email du SuperAdmin |
| **Newsletter** | `/api/v1/newsletter` | Inscription newsletter & campagnes de diffusion d'emails marketing HTML |

---

## 🔒 Middlewares de Sécurité

- **`checkBannedMiddleware`** (`backend 2/security/ban.middleware.js`) : Intercepte les requêtes HTTP pour vérifier si l'adresse IP du client ou son adresse Email figure dans la liste noire (`Ban`).
- **`autocompleteLimiter`** (`backend 2/config/rateLimit.js`) : Limiteur ajusté à **120 requêtes par minute** sur la recherche par auto-complétion Ollama AI pour garantir une frappe fluide au clavier sans blocage DDoS.
