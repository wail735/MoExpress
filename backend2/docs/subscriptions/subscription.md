# 💳 Documentation : Module Abonnements (`backend 2/subscriptions/`)

Dossier source : [`backend 2/subscriptions/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/subscriptions/)

---

## 📌 Aperçu Général et Rôle

Le module `subscriptions/` gère le système d'abonnement (Plans `basic`, `premium`, `pro`, `enterprise`). Chaque abonnement confère au souscripteur un pourcentage de réduction automatique sur toutes ses commandes et lui alloue un montant mensuel de coins (monnaie virtuelle).

### Fichiers :
- `subscription.model.js` : Modèle des forfaits et réductions.
- `subscription.dto.js` : Validation DTO.
- `subscription.service.js` : Mise à jour du taux de réduction de l'utilisateur, attribution des coins et calcul de la date d'expiration (+30 jours).
- `subscription.controller.js` : Handlers HTTP.
- `subscription.routes.js` : Enpoints `/plans` et `/subscribe`.
