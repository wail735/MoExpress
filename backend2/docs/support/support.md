# 🎧 Documentation : Module Support Client (`backend 2/support/`)

Dossier source : [`backend 2/support/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/support/)

---

## 📌 Aperçu Général et Rôle

Le module `support/` permet aux clients de créer des tickets de support, d'obtenir une assistance par email via SMTP Nodemailer et permet aux administrateurs de répondre aux tickets.

### Fichiers :
- `support.model.js` : Schéma Mongoose pour les tickets.
- `support.dto.js` : Validation DTO.
- `support.service.js` : Création de tickets, réponse administrative et envoi d'emails Nodemailer.
- `support.controller.js` : Handlers HTTP.
- `support.routes.js` : Endpoint protégés.
