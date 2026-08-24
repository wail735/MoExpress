// ============================================================================
// FICHIER : backend 2/products/product.model.js
// RÔLE : Schéma Mongoose pour la collection Produits (Products)
// ============================================================================

// 1. Importation du module mongoose
import mongoose from "mongoose";

// 2. Définition du schéma Mongoose d'un produit (AliExpress Clone)
const productSchema = new mongoose.Schema(
  {
    // Nom du produit
    name: {
      type: String,
      required: [true, "Le nom du produit est obligatoire"],
      trim: true,
      minlength: [3, "Le nom du produit doit contenir au moins 3 caractères"],
      index: true,
    },
    // Description détaillée
    description: {
      type: String,
      required: [true, "La description du produit est obligatoire"],
    },
    // Prix actuel en Euros
    price: {
      type: Number,
      required: [true, "Le prix est obligatoire"],
      min: [0, "Le prix ne peut pas être négatif"],
    },
    // Prix d'origine avant réduction (pour calculer le % de promo)
    comparePrice: {
      type: Number,
      default: 0,
    },
    // Quantité en stock
    quantity: {
      type: Number,
      required: [true, "La quantité en stock est obligatoire"],
      min: [0, "La quantité ne peut pas être négative"],
      default: 1,
    },
    // Catégorie principale (ex: "Électronique", "Mode", "Maison")
    category: {
      type: String,
      required: [true, "La catégorie est obligatoire"],
      index: true,
    },
    // Sous-catégorie optionnelle
    subCategory: String,
    // Marque du produit
    brand: {
      type: String,
      default: "Générique",
    },
    // Galerie d'images uploader sur Cloudinary
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        isMain: { type: Boolean, default: false },
      },
    ],
    // Évaluation moyenne (Rating de 1 à 5 étoiles)
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    // Nombre d'avis clients reçus
    numReviews: {
      type: Number,
      default: 0,
    },
    // État de publication (actif / archivé)
    isPublished: {
      type: Boolean,
      default: true,
    },
    // Vendeur / Administrateur créateur du produit
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Lien personnalisé généré pour les campagnes Meta Ads (Facebook/Instagram Ads)
    customMetaAdsUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 3. Création d'index de recherche textuelle pour la recherche rapide MongoDB ($text search)
productSchema.index({ name: "text", description: "text", category: "text", brand: "text" });

export const Product = mongoose.model("Product", productSchema);
export default Product;
