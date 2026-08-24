# 🛍️ Documentation : Module Produits (`backend 2/products/`)

Dossier source : [`backend 2/products/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/products/)

---

## 📌 Aperçu Général et Rôle

Le module `products/` gère le catalogue complet des produits (CRUD, upload d'images sur Cloudinary via Multer, recherche par mots-clés `$text` & regex, filtres de prix/catégorie et pagination).

### Fichiers :
- `product.model.js` : Schéma Mongoose avec index textuels (`name`, `description`, `category`, `brand`).
- `product.dto.js` : Validation DTO Joi des prix, quantités et champs requis.
- `product.service.js` : Logique CRUD, upload Cloudinary et recherche multi-critères.
- `product.controller.js` : Handlers de requêtes HTTP.
- `product.routes.js` : Routes Express publiques et protégées (`admin`, `superAdmin`).
