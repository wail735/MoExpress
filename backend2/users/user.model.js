// ============================================================================
// FICHIER : backend 2/users/user.model.js
// RÔLE : Schéma Mongoose étendu pour les Utilisateurs, Acheteurs, Vendeurs et Boutiques Pro
// ============================================================================

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Nom complet de l'utilisateur
    name: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
    },
    // Adresse email unique
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Mot de passe haché (masqué par défaut lors des requêtes select)
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      select: false,
    },
    // Rôle de l'utilisateur dans le système (user, buyer, seller, admin, superAdmin)
    role: {
      type: String,
      enum: ["user", "buyer", "seller", "admin", "superAdmin"],
      default: "user",
    },
    // État d'activation du compte
    isActive: {
      type: Boolean,
      default: true,
    },
    // Statut Boutique Pro (Acheteur qui est devenu Vendeur Pro certifié)
    isProShop: {
      type: Boolean,
      default: false,
    },
    // Badge Fournisseur Certifié (Supplier Badge accordé avec l'abonnement Pro/Enterprise)
    isSupplier: {
      type: Boolean,
      default: false,
    },
    supplierBadge: {
      type: Boolean,
      default: false,
    },
    // Détails du dossier de candidature et profil de la Boutique Pro
    proShopDetails: {
      shopName: { type: String, default: "" },
      description: { type: String, default: "" },
      category: { type: String, default: "" },
      logo: { type: String, default: "" },
      banner: { type: String, default: "" },
      businessRegistrationNumber: { type: String, default: "" },
      phone: { type: String, default: "" },
      status: {
        type: String,
        enum: ["none", "pending", "approved", "rejected"],
        default: "none",
      },
      rejectionReason: { type: String, default: "" },
      appliedAt: Date,
      approvedAt: Date,
    },
    // Expérience Sans Publicités (Activable via Abonnement Payant)
    noAds: {
      type: Boolean,
      default: false,
    },
    // Solde financier des gains du vendeur (Montant accumulé des ventes après commission)
    sellerBalance: {
      type: Number,
      default: 0,
      min: [0, "Le solde du vendeur ne peut pas être négatif"],
    },
    // Solde de coins (monnaie virtuelle de la plateforme)
    coins: {
      type: Number,
      default: 0,
      min: [0, "Le solde de coins ne peut pas être négatif"],
    },
    // Statut de l'abonnement actif (basic, premium, pro, enterprise)
    subscription: {
      plan: {
        type: String,
        enum: ["none", "basic", "premium", "pro", "enterprise"],
        default: "none",
      },
      expiryDate: Date,
      discountRate: {
        type: Number,
        default: 0, // Réduction en % (ex: 10 pour 10%)
      },
    },
    // Panier d'achat de l'utilisateur (Shopping Cart)
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    // Liste de souhaits / Favoris (Wishlist)
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    // Token de réinitialisation de mot de passe (si demandé)
    resetPasswordToken: String,
    // Expiration du token de réinitialisation (ex: 10 minutes)
    resetPasswordExpires: Date,
  },
  {
    // Horodatage automatique (createdAt, updatedAt)
    timestamps: true,
  }
);

// Exportation du modèle User (évite la ré-initialisation si déjà enregistré)
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
