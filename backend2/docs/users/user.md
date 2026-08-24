# 👤 Documentation : Module Utilisateurs (`backend 2/users/`)

Dossier source : [`backend 2/users/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/users/)

---

## 📌 Aperçu Général et Rôle

Le module `users/` gère le panier d'achat (Shopping Cart) et la liste d'envies (Wishlist / Favoris) de chaque utilisateur.

### Fichiers :
- `user.model.js` : Schéma Mongoose de l'utilisateur (Users, Rôles `user`, `admin`, `superAdmin`, solde de Coins, abonnements, panier et wishlist).
- `user.dto.js` : Validation DTO pour l'ajout au panier et la gestion des favoris.
- `user.service.js` : Implémentation de l'ajout/suppression d'articles au panier et toggle favoris avec peuplement des détails Mongoose (`populate`).
- `user.controller.js` : Contrôleurs HTTP.
- `user.routes.js` : Routes Express protégées par le middleware `protect`.
