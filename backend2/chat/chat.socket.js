// ============================================================================
// FICHIER : backend 2/chat/chat.socket.js
// RÔLE : Gestionnaire d'événements Socket.io pour le chat en temps réel
// ============================================================================

import { saveMessage } from "./chat.service.js";

/**
 * Attache les gestionnaires d'événements de chat instantané à l'instance Socket.io
 * @param {Object} io - Instance du serveur Socket.io
 */
export const registerChatSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    // 1. Un utilisateur rejoint une salle de chat (Room)
    socket.on("join_chat_room", (roomId) => {
      socket.join(roomId);
      console.log(`💬 Client WebSockets [${socket.id}] a rejoint la salle : ${roomId}`);
    });

    // 2. Envoi d'un message instantané en temps réel (Persistance BDD + Émission temps réel)
    socket.on("send_chat_message", async (data) => {
      try {
        const { roomId, senderId, receiverId, text } = data;

        // Étape 1 : Sauvegarde le message dans MongoDB via le service
        const savedMessage = await saveMessage({ roomId, senderId, receiverId, text });

        // Étape 2 : Diffuse immédiatement le message à tous les membres connectés à la salle (Room)
        io.to(roomId).emit("new_chat_message", savedMessage);
      } catch (error) {
        console.error("❌ Erreur d'envoi du message WebSocket :", error.message);
        socket.emit("chat_error", { message: "Impossible d'envoyer le message" });
      }
    });

    // 3. Indicateur de saisie ("En train d'écrire...")
    socket.on("typing_start", (data) => {
      socket.to(data.roomId).emit("user_is_typing", { userId: data.userId, name: data.name });
    });

    socket.on("typing_stop", (data) => {
      socket.to(data.roomId).emit("user_stopped_typing", { userId: data.userId });
    });
  });
};

export default registerChatSocketHandlers;
