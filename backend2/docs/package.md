# 📦 Documentation : `backend 2/package.json`

Fichier source : [`backend 2/package.json`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend%202/package.json)

---

## 📌 Aperçu Général et Rôle

Le fichier `package.json` de `backend 2` définit la configuration centrale du nouveau serveur backend orienté fonctionnalités. Il spécifie les métadonnées du projet, active le support natif des modules ES (`"type": "module"`), définit les scripts d'exécution (`npm run dev`) et répertorie les paquets de dépendances requis pour l'authentification, la recherche, le cache Redis, le stockage d'images Cloudinary, la sécurité et la messagerie instantanée en temps réel via **Socket.io** (WebSockets).

### Commande d'installation de toutes les dépendances :
```bash
npm install
```

---

## 🛠️ Liste des Paquets npm et Explications

| Paquet | Commande d'installation | Rôle et Utilité | Pourquoi en avons-nous besoin ? |
| :--- | :--- | :--- | :--- |
| **`socket.io`** | `npm install socket.io` | Gestion des connexions bidirectionnelles en temps réel (WebSockets). | Nécessaire pour la messagerie instantanée (Chat) en direct entre utilisateurs et support client. |
| **`express`** | `npm install express` | Framework HTTP pour Node.js. | Création des routes d'API REST. |
| **`mongoose`** | `npm install mongoose` | ODM pour MongoDB. | Modélisation des schémas BDD (Users, Products, Orders, Subscriptions, Coins, Chat). |
| **`redis`** | `npm install redis` | Client pour base de données en mémoire RAM Redis. | Mise en cache ultra-rapide des produits et recherche. |
| **`jsonwebtoken`** | `npm install jsonwebtoken` | Génération et vérification des jetons JWT. | Authentification sans état (Stateless). |
| **`bcryptjs`** | `npm install bcryptjs` | Hachage sécurisé des mots de passe. | Stockage sécurisé des mots de passe des utilisateurs. |
| **`cloudinary`** | `npm install cloudinary` | SDK pour le stockage d'images sur Cloudinary. | Hébergement des photos de produits et d'avatars dans le cloud. |
| **`multer`** | `npm install multer` | Intercepteur de formulaires `multipart/form-data`. | Upload de fichiers depuis le navigateur. |
| **`nodemailer`** | `npm install nodemailer` | Transporteur d'emails SMTP. | Envoi des emails de réinitialisation de mot de passe et notifications. |
| **`joi`** | `npm install joi` | Moteur de validation de schémas de données. | Validation des données d'entrée (`req.body`, `req.params`). |
| **`helmet`** | `npm install helmet` | En-têtes HTTP de sécurité. | Protection contre les attaques XSS, Clickjacking, MIME Sniffing. |
| **`cors`** | `npm install cors` | Activation des requêtes Cross-Origin. | Communication avec le frontend React/Vite. |
| **`compression`** | `npm install compression` | Compression HTTP Gzip/Brotli. | Réduction de la taille des réponses HTTP. |
| **`express-rate-limit`** | `npm install express-rate-limit` | Limitateur de débit HTTP. | Protection Anti-DDoS et Anti-Bruteforce. |
