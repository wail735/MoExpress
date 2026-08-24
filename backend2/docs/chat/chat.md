# 💬 Documentation : Module Chat Temps Réel (`backend 2/chat/`)

Dossier source : [`backend 2/chat/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/chat/)

---

## 📌 Aperçu Général et Rôle

Le module `chat/` gère la messagerie instantanée en temps réel entre acheteurs, vendeurs et support client grâce au protocole **WebSockets** et à la bibliothèque **Socket.io**.

### Fichiers :
- `chat.model.js` : Modèle Mongoose d'un message (`roomId`, `sender`, `receiver`, `text`, `isRead`).
- `chat.dto.js` : Validation DTO.
- `chat.service.js` : Persistance BDD des messages et extraction de l'historique par salle (Room).
- `chat.socket.js` : Gestionnaire d'événements WebSockets Socket.io (`join_chat_room`, `send_chat_message`, `typing_start`, `typing_stop`).
- `chat.controller.js` & `chat.routes.js` : REST API pour récupérer l'historique d'une salle `/api/v1/chat/history/:roomId`.
