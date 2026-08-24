// ============================================================================
// FICHIER : backend 2/config/seed.js
// RÔLE : Script d'initialisation et d'ensemencement (Seeding) alimenté par le fichier .env
// ============================================================================

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./database.js";
import User from "../users/user.model.js";
import Product from "../products/product.model.js";
import Settings from "./settings.model.js";

dotenv.config();

export const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("🌱 Début de l'ensemencement de la base de données MoExpress via les variables d'environnement (.env)...");

    const salt = await bcrypt.genSalt(10);

    // Mots de passe sécurisés hachés depuis le fichier .env
    const superAdminPassword = await bcrypt.hash(process.env.SEED_SUPERADMIN_PASSWORD || "admin123", salt);
    const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "admin123", salt);
    const buyerPassword = await bcrypt.hash(process.env.SEED_BUYER_PASSWORD || "user123", salt);
    const basicPassword = await bcrypt.hash(process.env.SEED_BASIC_PASSWORD || "user123", salt);
    const premiumPassword = await bcrypt.hash(process.env.SEED_PREMIUM_PASSWORD || "user123", salt);
    const proPassword = await bcrypt.hash(process.env.SEED_PRO_PASSWORD || "user123", salt);
    const enterprisePassword = await bcrypt.hash(process.env.SEED_ENTERPRISE_PASSWORD || "user123", salt);

    // 1. Liste des 7 comptes utilisateurs témoins configurés par l'environnement (.env)
    const seedUsers = [
      {
        name: process.env.SEED_SUPERADMIN_NAME || "MoExpress SuperAdmin Master",
        email: process.env.SEED_SUPERADMIN_EMAIL || "superadmin@moexpress.com",
        password: superAdminPassword,
        role: "superAdmin",
        isProShop: true,
        isSupplier: true,
        noAds: true,
        coins: 10000,
        sellerBalance: 45800.0,
        proShopDetails: {
          shopName: "MoExpress Corporate Flagship",
          category: "Electronics & Global Trade",
          businessRegistrationNumber: "RC-2026-999999",
          status: "approved",
        },
      },
      {
        name: process.env.SEED_ADMIN_NAME || "Admin Staff Manager",
        email: process.env.SEED_ADMIN_EMAIL || "admin@moexpress.com",
        password: adminPassword,
        role: "admin",
        isProShop: true,
        isSupplier: true,
        noAds: true,
        coins: 5000,
      },
      {
        name: process.env.SEED_BUYER_NAME || "Normal Buyer User",
        email: process.env.SEED_BUYER_EMAIL || "buyer@moexpress.com",
        password: buyerPassword,
        role: "buyer",
        isProShop: false,
        isSupplier: false,
        noAds: false,
        coins: 150,
      },
      {
        name: process.env.SEED_BASIC_NAME || "Basic Subscriber User",
        email: process.env.SEED_BASIC_EMAIL || "basic@moexpress.com",
        password: basicPassword,
        role: "buyer",
        subscription: { plan: "basic", expiryDate: new Date(Date.now() + 30 * 86400000) },
        noAds: true,
        coins: 200,
      },
      {
        name: process.env.SEED_PREMIUM_NAME || "Premium VIP User",
        email: process.env.SEED_PREMIUM_EMAIL || "premium@moexpress.com",
        password: premiumPassword,
        role: "buyer",
        subscription: { plan: "premium", expiryDate: new Date(Date.now() + 30 * 86400000) },
        noAds: true,
        coins: 500,
      },
      {
        name: process.env.SEED_PRO_NAME || "Pro Boutique Seller",
        email: process.env.SEED_PRO_EMAIL || "pro@moexpress.com",
        password: proPassword,
        role: "seller",
        subscription: { plan: "pro", expiryDate: new Date(Date.now() + 30 * 86400000) },
        isProShop: true,
        isSupplier: true,
        noAds: true,
        coins: 1000,
        sellerBalance: 12450.75,
        proShopDetails: {
          shopName: "MoStore Official Pro Boutique",
          category: "Electronics",
          businessRegistrationNumber: "RC-2026-123456",
          status: "approved",
        },
      },
      {
        name: process.env.SEED_ENTERPRISE_NAME || "Enterprise Global Supplier",
        email: process.env.SEED_ENTERPRISE_EMAIL || "enterprise@moexpress.com",
        password: enterprisePassword,
        role: "seller",
        subscription: { plan: "enterprise", expiryDate: new Date(Date.now() + 30 * 86400000) },
        isProShop: true,
        isSupplier: true,
        noAds: true,
        coins: 2500,
        sellerBalance: 89400.0,
        proShopDetails: {
          shopName: "Global Trade Enterprise Hub",
          category: "Wholesale & Tech",
          businessRegistrationNumber: "RC-2026-777888",
          status: "approved",
        },
      },
    ];

    for (const u of seedUsers) {
      await User.findOneAndUpdate({ email: u.email }, u, { upsert: true, new: true });
    }

    console.log("✅ 7 Comptes démo créés depuis .env avec succès !");

    // 2. Initialisation des Réglages Système (Settings)
    await Settings.getSettings();
    console.log("✅ Réglages système initialisés !");

    return { success: true, message: "Ensemencement réussi ! 7 comptes démo créés depuis .env." };
  } catch (error) {
    console.error("❌ Erreur lors de l'ensemencement :", error.message);
    throw error;
  }
};

// Exécution directe via CLI node
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  seedDatabase().then(() => process.exit(0));
}

export default seedDatabase;
