# Project Index - MoExpress (AliExpress Clone MERN)

## Frontend (`frontend2/`)

- **`src/App.jsx`**
  - **Rôle** : composant racine de navigation et déclaration de l'ensemble des routes React (Public, User/Seller, Admin).
  - **Dépendances** : `react-router-dom`, `Navbar`, `Footer`, `UserDashboardLayout`, pages publiques, d'authentification et d'administration.
  - **Fichiers liés** : `main.jsx`, `components/common/Navbar.jsx`, `pages/auth/*`, `pages/public/*`, `pages/user/*`, `pages/admin/*`.

- **`src/main.jsx`**
  - **Rôle** : point d'entrée Vite / React 19 pour l'injection des contextes globaux et le rendu du DOM.
  - **Dépendances** : `react`, `react-dom/client`, `react-router-dom`, `AuthProvider`, `CartProvider`, `ThemeProvider`, `NotificationProvider`, `LanguageProvider`, `CMSProvider`, `CompareProvider`, `CurrencyProvider`, `WishlistProvider`.
  - **Fichiers liés** : `App.jsx`, `index.css`, `context/*`.

- **`src/api/apiClient.js`**
  - **Rôle** : instance Axios centralisée configurée avec `baseURL: "/api/v1"`, injection automatique du token JWT Bearer depuis `localStorage`, et intercepteur de réponse d'erreur.
  - **Dépendances** : `axios`.
  - **Fichiers liés** : `api/authApi.js`, `api/productApi.js`, `api/adminApi.js`, `api/paymentApi.js`.

- **`src/api/authApi.js`**
  - **Rôle** : ensemble des méthodes d'appel API d'authentification (`login`, `register`, `getMe`, `forgotPassword`, `resetPassword`, `seed`).
  - **Dépendances** : `./apiClient`.
  - **Fichiers liés** : `pages/auth/Login.jsx`, `pages/auth/Register.jsx`, `pages/auth/ForgotPassword.jsx`, `pages/auth/ResetPassword.jsx`.

- **`src/context/AuthContext.jsx`**
  - **Rôle** : gestionnaire d'état réactif pour la session utilisateur, le jeton JWT, les rôles (`user`, `admin`, `superAdmin`, `seller`, `isProShop`) et la persistance `localStorage`.
  - **Dépendances** : `react`.
  - **Fichiers liés** : `api/authApi.js`, `components/common/Navbar.jsx`, `components/layout/UserDashboardLayout.jsx`.

- **`src/pages/auth/Login.jsx`**
  - **Rôle** : formulaire de connexion utilisateur connecté à l'API réelle `/api/v1/auth/login`.
  - **Dépendances** : `react`, `react-router-dom`, `lucide-react`, `AuthContext`, `NotificationContext`, `authApi`.
  - **Fichiers liés** : `context/AuthContext.jsx`, `api/authApi.js`, `pages/auth/ForgotPassword.jsx`.

- **`src/pages/auth/Register.jsx`**
  - **Rôle** : formulaire d'inscription utilisateur (Acheteur / Vendeur Boutique Pro) relié à l'API réelle `/api/v1/auth/register`.
  - **Dépendances** : `react`, `react-router-dom`, `lucide-react`, `AuthContext`, `NotificationContext`, `authApi`.
  - **Fichiers liés** : `context/AuthContext.jsx`, `api/authApi.js`, `pages/auth/Login.jsx`.

- **`src/pages/auth/ForgotPassword.jsx`**
  - **Rôle** : formulaire de demande de réinitialisation de mot de passe par envoi d'email SMTP réel.
  - **Dépendances** : `react`, `react-router-dom`, `lucide-react`, `NotificationContext`, `authApi`.
  - **Fichiers liés** : `api/authApi.js`, `pages/auth/ResetPassword.jsx`.

- **`src/pages/auth/ResetPassword.jsx`**
  - **Rôle** : formulaire de saisie du nouveau mot de passe avec validation du jeton URL `:token`.
  - **Dépendances** : `react`, `react-router-dom` (`useParams`), `lucide-react`, `NotificationContext`, `authApi`.
  - **Fichiers liés** : `api/authApi.js`, `pages/auth/Login.jsx`.

---

## Backend (`backend2/`)

- **`server.js`**
  - **Rôle** : serveur principal Node.js/Express intégrant WebSockets (Socket.io), MongoDB Mongoose, middlewares de sécurité (Helmet, CORS, Rate Limit, Ban Check, Morgan) et les routes d'API versionnées.
  - **Dépendances** : `express`, `http`, `socket.io`, `dotenv`, `config/database.js`, `config/email.js`, tous les routeurs d'API.
  - **Fichiers liés** : `config/*`, `auth/*`, `users/*`, `products/*`, `orders/*`, `admin/*`.

- **`.env`**
  - **Rôle** : variables de configuration d'environnement (PORT, MONGO_URI, JWT_SECRET, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, FRONTEND_URL).
  - **Dépendances** : chargées par `dotenv`.
  - **Fichiers liés** : `server.js`, `config/email.js`, `auth/auth.service.js`.

- **`config/database.js`**
  - **Rôle** : connexion asynchrone à MongoDB via Mongoose.
  - **Dépendances** : `mongoose`.
  - **Fichiers liés** : `server.js`.

- **`config/email.js`**
  - **Rôle** : configuration SMTP Nodemailer (port 465 SSL/TLS, serveur `mail.soukboudouaou.com`) et envoi des emails transactionnels (Reset Password URL).
  - **Dépendances** : `nodemailer`.
  - **Fichiers liés** : `auth/auth.service.js`, `.env`.

- **`auth/auth.model.js`**
  - **Rôle** : schéma Mongoose du modèle Utilisateur (champs email, password haché, role, resetPasswordToken, resetPasswordExpires, coins, subscription, isProShop).
  - **Dépendances** : `mongoose`.
  - **Fichiers liés** : `auth/auth.service.js`, `users/user.service.js`.

- **`auth/auth.service.js`**
  - **Rôle** : logique métier d'authentification (génération JWT, hachage bcrypt, inscription, connexion, oubli de mot de passe via jeton 32 octets, réinitialisation de mot de passe).
  - **Dépendances** : `auth.model.js`, `bcryptjs`, `jsonwebtoken`, `crypto`, `config/email.js`.
  - **Fichiers liés** : `auth/auth.controller.js`, `config/email.js`.

- **`auth/auth.controller.js`**
  - **Rôle** : gestionnaires de requêtes/réponses HTTP pour l'authentification (`register`, `login`, `forgotPassword`, `resetPassword`, `getMe`, `seed`).
  - **Dépendances** : `auth.service.js`, `auth.dto.js`.
  - **Fichiers liés** : `auth/auth.routes.js`.

- **`auth/auth.routes.js`**
  - **Rôle** : définition des routes Express d'authentification (`/api/v1/auth/*`).
  - **Dépendances** : `express.Router`, `auth.controller.js`, `auth.middleware.js`.
  - **Fichiers liés** : `server.js`.

---

## API Routes (`/api/v1`)

| Méthode | Endpoint | Contrôleur | Auth Requise | Rôle |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | `authController.register` | Non | Inscription d'un utilisateur acheteur ou vendeur |
| `POST` | `/api/v1/auth/login` | `authController.login` | Non | Connexion utilisateur & génération de token JWT |
| `POST` | `/api/v1/auth/forgot-password` | `authController.forgotPassword` | Non | Génération du jeton & envoi d'email SMTP réel |
| `POST` | `/api/v1/auth/reset-password` | `authController.resetPassword` | Non | Validation du jeton, hachage bcrypt & maj mot de passe |
| `GET` | `/api/v1/auth/me` | `authController.getMe` | Oui (JWT) | Obtenir le profil de l'utilisateur connecté |
| `POST` | `/api/v1/auth/seed` | `authController.seed` | Non / Admin | Ensemencement des comptes démo et produits BDD |
| `GET` | `/api/v1/products` | `productController.getProducts` | Non | Récupération des produits avec filtres & pagination |
| `GET` | `/api/v1/users/profile` | `userController.getProfile` | Oui (JWT) | Profil utilisateur étendu |
| `GET` | `/api/v1/admin/dashboard` | `adminController.getDashboardStats` | Oui (Admin) | Statistiques de la plateforme |

---

## Database (MongoDB `moexpress_db`)

- **Collections** :
  - `users` : documents utilisateurs (comptes, rôles, solde, boutiques pro, jetons de réinitialisation).
  - `products` : catalogue produits (images, prix, catégories, boutique parente, avis).
  - `orders` : commandes acheteurs (statut de livraison, articles, paiements).
  - `subscriptions` : abonnements utilisateurs.
  - `disputes` : litiges et réclamations.
  - `settings` : configuration globale du système.

---

## Authentication Workflow

1. **Signup** :
   - Frontend `Register.jsx` -> `POST /api/v1/auth/register` -> Vérification unicité email -> Hachage Bcrypt -> MongoDB Create -> Token JWT retourné -> Stockage local `localStorage`.
2. **Login** :
   - Frontend `Login.jsx` -> `POST /api/v1/auth/login` -> Recherche Mongo -> Vérification statut actif -> Comparaison Bcrypt -> Token JWT retourné -> Stockage `AuthContext`.
3. **Logout** :
   - Frontend `AuthContext.logout()` -> Effacement du jeton et du profil utilisateur dans `localStorage` et redirection.
4. **Forgot Password** :
   - Frontend `ForgotPassword.jsx` -> `POST /api/v1/auth/forgot-password` -> Recherche Mongo -> Jeton 32 octets + expiration 10m -> Envoi email SMTP réel (`mail.soukboudouaou.com:465`) avec lien `http://localhost:5173/reset-password/:token`.
5. **Reset Password** :
   - Frontend `ResetPassword.jsx` (recueille `:token` via `useParams`) -> `POST /api/v1/auth/reset-password` -> Vérification Mongo de la validité et date du jeton -> Hachage nouveau mot de passe Bcrypt -> Invalidation du jeton -> Confirmation et redirection vers `/login`.
