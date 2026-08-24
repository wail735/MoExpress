# 🔐 Documentation : Module Authentification (`backend 2/auth/`)

Dossier source : [`backend 2/auth/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/auth/)

---

## 📌 Aperçu Général et Rôle

Le module `auth/` regroupe l'intégralité des composants d'inscription, connexion, réinitialisation de mot de passe et protection des routes par rôle.

### Fichiers du Module :
- `auth.model.js` : Schéma Mongoose de l'utilisateur (Users, Rôles `user`, `admin`, `superAdmin`, solde de Coins, abonnements, panier et wishlist).
- `auth.dto.js` : Schémas Joi pour valider les payloads `register`, `login`, `forgotPassword` et `resetPassword`.
- `auth.service.js` : Logique de hachage Bcrypt, signature JWT et envoi d'emails SMTP via Nodemailer.
- `auth.controller.js` : Contrôleurs HTTP.
- `auth.middleware.js` : Middlewares `protect` (vérification de Token JWT) et `authorize` (contrôle RBAC).
- `auth.routes.js` : Router Express.
