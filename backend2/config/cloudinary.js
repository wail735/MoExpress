// ============================================================================
// FICHIER : backend 2/config/cloudinary.js
// RÔLE : Service de téléversement et gestion des médias cloud (Cloudinary)
// ============================================================================

// 1. Importation du SDK officiel Cloudinary v2
import { v2 as cloudinary } from "cloudinary";

// 2. Importation du module natif de gestion de fichiers Node.js (fs)
import fs from "fs";

/**
 * Configuration des identifiants API Cloudinary depuis les variables d'environnement.
 */
cloudinary.config({
  // Nom unique du cloud attribué par Cloudinary
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // Clé d'API publique
  api_key: process.env.CLOUDINARY_API_KEY,
  // Secret d'API privé
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Force l'utilisation d'URL HTTPS sécurisées
  secure: true,
});

/**
 * Uploade une image locale vers Cloudinary et nettoie le fichier temporaire du disque.
 * @param {string} filePath - Chemin absolu du fichier temporaire créé par Multer
 * @param {Object} options - Options personnalisées (ex: sous-dossier)
 */
export const uploadImage = async (filePath, options = {}) => {
  try {
    // 3. Fusion des options par défaut (dossier 'aliexpress_products', recadrage auto, netteté)
    const uploadOptions = {
      folder: "aliexpress_products",
      use_filename: true,
      overwrite: true,
      resource_type: "auto",
      transformation: [
        { width: 1000, height: 1000, crop: "limit", quality: "auto", fetch_format: "auto" },
      ],
      ...options,
    };

    // 4. Exécution de l'upload asynchrone vers le cloud
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    // 5. Suppression immédiate du fichier temporaire du disque local serveur s'il existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 6. Retourne l'URL publique HTTPS et le publicId Cloudinary
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    // Si l'upload échoue, supprimer quand même le fichier temporaire pour éviter d'encombrer le disque
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("❌ Erreur lors de l'upload vers Cloudinary :", error.message);
    throw new Error(`Échec du téléversement d'image : ${error.message}`);
  }
};

/**
 * Supprime une image distante de Cloudinary à l'aide de son ID public.
 * @param {string} publicId - L'identifiant unique public du fichier sur Cloudinary
 */
export const deleteImage = async (publicId) => {
  try {
    // Exécute la méthode de suppression de l'API Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error(`❌ Erreur de suppression Cloudinary [${publicId}] :`, error.message);
    throw error;
  }
};

export default {
  uploadImage,
  deleteImage,
};
