# 👑 Documentation : Module Administration (`backend 2/admin/`)

Dossier source : [`backend 2/admin/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/admin/)

---

## 📌 Aperçu Général et Rôle

Le module `admin/` est réservé au rôle **SuperAdmin** (`authorize("superAdmin")`). Il permet de gérer les comptes de tous les utilisateurs, de promouvoir un utilisateur en rôle `admin` ou `superAdmin`, de désactiver/réactiver des comptes et d'obtenir des statistiques financières globales.

### Fichiers :
- `admin.service.js` : Gestion des utilisateurs, mises à jour des rôles, bascule du statut `isActive` et agrégations MongoDB pour calculer le chiffre d'affaires total.
- `admin.controller.js` : Handlers HTTP pour le panneau d'administration.
- `admin.routes.js` : Routes Express sécurisées par le middleware `authorize("superAdmin")`.
