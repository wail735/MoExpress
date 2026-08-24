// ============================================================================
// FICHIER : backend 2/auth/auth.service.js
// RÃ”LE : Logique mÃ©tier d'authentification (JWT, Bcrypt, Inscription, Connexion, Reset Password)
// ============================================================================

// 1. Importation du modÃ¨le User
import User from "./auth.model.js";

// 2. Importation de BcryptJS pour le hachage et la comparaison des mots de passe
import bcrypt from "bcryptjs";

// 3. Importation de jsonwebtoken pour gÃ©nÃ©rer et signer les tokens JWT
import jwt from "jsonwebtoken";

// 4. Importation de crypto natif Node.js pour gÃ©nÃ©rer des tokens alÃ©atoires hexadÃ©cimaux
import crypto from "crypto";

// 5. Importation du service d'envoi d'emails Nodemailer
import { sendPasswordResetEmail } from "../config/email.js";

/**
 * GÃ©nÃ¨re un jeton de sÃ©curitÃ© JWT signÃ©.
 * @param {string} userId - ID unique Mongo de l'utilisateur
 * @param {string} role - RÃ´le de l'utilisateur (user, admin, superAdmin)
 */
export const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET || "super_secret_jwt_key_aliexpress",
    { expiresIn: process.env.JWT_EXPIRE || "30d" }
  );
};

/**
 * Service d'inscription d'un nouvel utilisateur (Signup)
 */
export const registerUser = async ({ name, email, password, role, shopName }) => {
  // VÃ©rifie si un utilisateur avec cet email existe dÃ©jÃ  en BDD
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("Un compte existe dÃ©jÃ  avec cette adresse email.");
  }

  // GÃ©nÃ¨re un sel de hachage Bcrypt Ã  10 tours
  const salt = await bcrypt.genSalt(10);
  // Hache le mot de passe en clair
  const hashedPassword = await bcrypt.hash(password, salt);

  const userRole = role === "seller" ? "seller" : "buyer";
  const isPro = role === "seller" || Boolean(shopName);

  // CrÃ©e l'utilisateur dans MongoDB
  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: userRole,
    isProShop: isPro,
    isSupplier: isPro,
    proShopDetails: isPro
      ? {
          shopName: shopName || `${name}'s Pro Boutique`,
          status: "approved",
          category: "General Marketplace",
        }
      : undefined,
  });

  // GÃ©nÃ¨re un token JWT d'authentification
  const token = generateToken(newUser._id, newUser.role);

  return {
    user: newUser,
    token,
  };
};

/**
 * Service de connexion d'un utilisateur (Login)
 */
export const loginUser = async ({ email, password }) => {
  // Recherche l'utilisateur par email et inclut le mot de passe masquÃ© avec +password
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) {
    throw new Error("Adresse email ou mot de passe incorrect.");
  }

  // VÃ©rifie si le compte est dÃ©sactivÃ©
  if (!user.isActive) {
    throw new Error("Votre compte a Ã©tÃ© dÃ©sactivÃ©. Veuillez contacter le support.");
  }

  // Compare le mot de passe saisi avec le hash stockÃ©
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Adresse email ou mot de passe incorrect.");
  }

  // GÃ©nÃ¨re un token JWT
  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      coins: user.coins,
      subscription: user.subscription,
    },
    token,
  };
};

/**
 * Service d'oubli de mot de passe (Forgot Password)
 */
export const googleLogin = async ({ email, name, photoURL, uid }) => {
  let user = await User.findOne({ email: email.toLowerCase() });
  
  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);
    
    user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "buyer",
      isProShop: false,
      isSupplier: false,
      noAds: false,
      coins: 100, // Bonus d'inscription via Google
    });
  }

  const token = generateToken(user._id, user.role);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProShop: user.isProShop,
      coins: user.coins,
    },
    token,
  };
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error("Aucun compte n'est associÃ© Ã  cette adresse email.");
  }

  // GÃ©nÃ¨re un token de rÃ©initialisation alÃ©atoire de 32 octets (hexadÃ©cimal)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Enregistre le token et son expiration (10 minutes) sur l'utilisateur
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // Envoie l'email via SMTP Nodemailer
  await sendPasswordResetEmail(user.email, resetToken);

  return { message: "Un email de rÃ©initialisation vous a Ã©tÃ© envoyÃ©." };
};

/**
 * Service de rÃ©initialisation de mot de passe (Reset Password)
 */
export const resetPassword = async (resetToken, newPassword) => {
  // Recherche l'utilisateur par token valide et non expirÃ©
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Le jeton de rÃ©initialisation est invalide ou a expirÃ©.");
  }

  // Hache le nouveau mot de passe
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Efface le token de rÃ©initialisation
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return { message: "Mot de passe rÃ©initialisÃ© avec succÃ¨s. Vous pouvez vous connecter." };
};

export default {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  generateToken,
};

