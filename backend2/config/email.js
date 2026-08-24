// ============================================================================
// FICHIER : backend 2/config/email.js
// RÔLE : Configuration SMTP et envoi d'emails transactionnels (Nodemailer)
// ============================================================================

// 1. Importation du module Nodemailer pour l'envoi d'emails via le protocole SMTP
import nodemailer from "nodemailer";

/**
 * Crée le transporteur SMTP réutilisable.
 * SMTP (Simple Mail Transfer Protocol) est le protocole standard pour l'envoi d'emails sur Internet.
 */
const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT) || 465;
  const isSecure = process.env.EMAIL_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    // Hôte SMTP (ex: mail.soukboudouaou.com)
    host: process.env.EMAIL_HOST || "mail.soukboudouaou.com",
    // Port d'écoute SMTP (465 pour SSL)
    port: port,
    // Activer SSL/TLS
    secure: isSecure,
    // Identifiants d'authentification du compte expéditeur
    auth: {
      user: process.env.EMAIL_USER || "contactus@soukboudouaou.com",
      pass: process.env.EMAIL_PASSWORD || "admin2026$",
    },
    tls: {
      rejectUnauthorized: false,
    },
    // Pool de connexions réutilisables pour optimiser les envois groupés
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });
};

/**
 * Envoie un email transactionnel générique.
 * @param {Object} options - Options de l'email (to, subject, html, text)
 */
export const sendEmail = async (options) => {
  try {
    // Instancie le transporteur SMTP
    const transporter = createTransporter();

    // Recompose les détails de l'email
    const mailOptions = {
      from: `"${process.env.APP_NAME || "MoExpress"}" <${process.env.EMAIL_USER || "contactus@soukboudouaou.com"}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ""),
    };

    // Exécute l'envoi asynchrone de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email envoyé avec succès à ${options.to} [ID: ${info.messageId}]`);
    return info;
  } catch (error) {
    console.error(`❌ Erreur d'envoi d'email à ${options.to} :`, error.message);
    throw error;
  }
};

/**
 * Envoie un email de réinitialisation de mot de passe à l'utilisateur.
 * @param {string} userEmail - Adresse email du destinataire
 * @param {string} resetToken - Token unique généré pour réinitialiser le mot de passe
 */
export const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #ff4747;">🔐 Réinitialisation de votre mot de passe</h2>
      <p>Vous avez demandé la réinitialisation de votre mot de passe sur notre plateforme.</p>
      <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe. Ce lien est valide pendant 10 minutes :</p>
      <a href="${resetUrl}" style="background-color: #ff4747; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Réinitialiser mon mot de passe
      </a>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: "🔐 Réinitialisation de votre mot de passe - AliExpress Clone",
    html,
  });
};

export default {
  sendEmail,
  sendPasswordResetEmail,
};
