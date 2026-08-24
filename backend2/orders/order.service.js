// ============================================================================
// FICHIER : backend 2/orders/order.service.js
// RÔLE : Logique métier des commandes (Paiement Coins/Carte, Réductions Abonnement, Stock & Suivi)
// ============================================================================

import Order from "./order.model.js";
import { User } from "../auth/auth.model.js";
import Product from "../products/product.model.js";
import { sendEmail } from "../config/email.js";

/**
 * Créer une commande à partir du panier de l'utilisateur.
 */
export const createOrder = async (userId, { paymentMethod, shippingAddress }) => {
  const user = await User.findById(userId).populate("cart.product");

  if (!user.cart || user.cart.length === 0) {
    throw new Error("Votre panier d'achat est vide.");
  }

  // 1. Calcul du sous-total et vérification des stocks produits
  let subtotal = 0;
  const orderItems = [];

  for (let cartItem of user.cart) {
    const product = cartItem.product;
    if (!product || !product.isPublished) {
      throw new Error(`Le produit [${product?.name || "Inconnu"}] n'est plus disponible.`);
    }

    if (product.quantity < cartItem.quantity) {
      throw new Error(`Stock insuffisant pour le produit [${product.name}]. Restant : ${product.quantity}`);
    }

    subtotal += product.price * cartItem.quantity;
    orderItems.push({
      product: product._id,
      quantity: cartItem.quantity,
      price: product.price,
    });
  }

  // 2. Application de la réduction liée à l'abonnement de l'utilisateur (ex: 10% pour Premium, 20% pour Pro)
  let discountRate = user.subscription?.discountRate || 0;
  let discountAmount = (subtotal * discountRate) / 100;
  let totalAmount = subtotal - discountAmount;

  // 3. Gestion du paiement par Coins (Exchange money/coins)
  if (paymentMethod === "coins") {
    // 1 Coin = 1 Euro (taux de conversion)
    if (user.coins < totalAmount) {
      throw new Error(`Solde de coins insuffisant ! Requis : ${totalAmount} coins. Votre solde : ${user.coins} coins.`);
    }
    // Déduit les coins du compte de l'utilisateur
    user.coins -= totalAmount;
  }

  // 4. Création de la commande dans MongoDB
  const newOrder = await Order.create({
    user: userId,
    items: orderItems,
    subtotal,
    discountAmount,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod === "coins" ? "completed" : "pending",
    shippingAddress,
    status: "processing",
    trackingNumber: "TRK-" + Date.now().toString().slice(-8),
  });

  // 5. Mise à jour des stocks des produits vendus
  for (let cartItem of user.cart) {
    await Product.findByIdAndUpdate(cartItem.product._id, {
      $inc: { quantity: -cartItem.quantity },
    });
  }

  // 6. Vider le panier de l'utilisateur
  user.cart = [];
  await user.save();

  // 7. Envoi d'un email de confirmation de commande
  await sendEmail({
    to: user.email,
    subject: `✅ Confirmation de votre commande #${newOrder._id}`,
    html: `<h3>Merci pour votre commande sur AliExpress Clone !</h3><p>Montant total réglé : <strong>${totalAmount.toFixed(2)} €</strong> via ${paymentMethod}.</p><p>Numéro de suivi colis : <strong>${newOrder.trackingNumber}</strong></p>`,
  }).catch((err) => console.error("Erreur d'envoi d'email commande :", err));

  return newOrder;
};

/**
 * Récupérer toutes les commandes de l'utilisateur connecté avec détails
 */
export const getUserOrders = async (userId) => {
  return await Order.find({ user: userId }).populate("items.product").sort({ createdAt: -1 });
};

/**
 * Suivre une commande spécifique par son ID (Tracking)
 */
export const trackOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).populate("items.product");
  if (!order) {
    throw new Error("Commande non trouvée.");
  }
  return {
    orderId: order._id,
    status: order.status,
    trackingNumber: order.trackingNumber,
    shippingAddress: order.shippingAddress,
    totalAmount: order.totalAmount,
    items: order.items,
    createdAt: order.createdAt,
  };
};

/**
 * Mettre à jour le statut et le suivi d'une commande (Admin / SuperAdmin)
 */
export const updateOrderStatus = async (orderId, { status, trackingNumber }) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Commande non trouvée.");
  }

  if (status) order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  await order.save();
  return order;
};

export default {
  createOrder,
  getUserOrders,
  trackOrder,
  updateOrderStatus,
};
