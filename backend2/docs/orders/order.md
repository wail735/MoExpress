# 📦 Documentation : Module Commandes (`backend 2/orders/`)

Dossier source : [`backend 2/orders/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/orders/)

---

## 📌 Aperçu Général et Rôle

Le module `orders/` gère la création des commandes, le calcul automatique des réductions d'abonnement, le paiement via Coins ou Carte, le suivi de livraison (Order Tracking), la mise à jour des stocks et l'envoi d'emails de confirmation.

### Fichiers :
- `order.model.js` : Modèle Mongoose d'une commande (Items, subtotal, discountAmount, totalAmount, paymentMethod, status, trackingNumber).
- `order.dto.js` : Validation DTO Joi.
- `order.service.js` : Validation des stocks, application du discount d'abonnement, déduction des coins, vidage du panier et envoi d'emails Nodemailer.
- `order.controller.js` : Handlers HTTP (`createOrder`, `getMyOrders`, `trackOrder`, `updateOrderStatus`).
- `order.routes.js` : Déclaration des endpoints.
