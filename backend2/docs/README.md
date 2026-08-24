# 📚 Documentation Générale : Backend 2 (AliExpress Clone MERN)

Bienvenue dans la documentation officielle de l'application **Backend 2**. Ce projet a été construit avec une **architecture par fonctionnalités (Feature-Based Architecture)** et inclut un système de messagerie temps réel via **WebSockets (Socket.io)**, la gestion des abonnements, des coins, du panneau SuperAdmin, du cache Redis et de la sécurité avancée.

---

## 📂 Organisation du Code Source et de la Documentation

| Module / Dossier | Description & Fonctionnalités | Fichier Documentation |
| :--- | :--- | :--- |
| [`package.json`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/package.json) | Dépendances npm et scripts | [`docs/package.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/package.md) |
| [`server.js`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/server.js) | Serveur HTTP Express & WebSockets | [`docs/server.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/server.md) |
| [`config/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/config/) | BDD, Redis, WebSockets, SMTP, Cors, Helmet, RateLimit | [`docs/config/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/config/socket.md) |
| [`auth/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/auth/) | Inscription, Connexion, Reset Password, JWT, Bcrypt | [`docs/auth/auth.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/auth/auth.md) |
| [`products/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/products/) | CRUD Produits, Upload Cloudinary, Recherche & Filtres | [`docs/products/product.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/products/product.md) |
| [`users/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/users/) | Panier d'achat (Cart) et Favoris (Wishlist) | [`docs/users/user.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/users/user.md) |
| [`orders/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/orders/) | Commandes, Paiement Coins/Carte, Suivi de colis | [`docs/orders/order.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/orders/order.md) |
| [`subscriptions/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/subscriptions/) | Plans d'abonnement, réductions et bonus mensuels | [`docs/subscriptions/subscription.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/subscriptions/subscription.md) |
| [`coins/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/coins/) | Achat de packs de coins (Exchange Money for Coins) | [`docs/coins/coin.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/coins/coin.md) |
| [`support/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/support/) | Tickets de support et notifications par email SMTP | [`docs/support/support.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/support/support.md) |
| [`chat/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/chat/) | Messagerie instantanée en temps réel avec Socket.io | [`docs/chat/chat.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/chat/chat.md) |
| [`admin/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/admin/) | Panneau d'administration SuperAdmin & Stats | [`docs/admin/admin.md`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/docs/admin/admin.md) |
