# 🪙 Documentation : Module Coins (`backend 2/coins/`)

Dossier source : [`backend 2/coins/`](file:///c:/Users/mounir/Desktop/aida/New%20folder%20%282%29/code/backend 2/coins/)

---

## 📌 Aperçu Général et Rôle

Le module `coins/` permet d'acheter de la monnaie virtuelle (Coins) contre de l'argent réel (Packs 100, 500, 1000, 5000 coins) et de payer ses commandes sur la plateforme avec ces coins (taux 1 Coin = 1 €).

### Fichiers :
- `coin.model.js` : Modèle de transaction de coins (Type `buy`, `spend`, `bonus`).
- `coin.dto.js` : Validation DTO.
- `coin.service.js` : Rechargement du solde et historique des achats.
- `coin.controller.js` : Handlers HTTP.
- `coin.routes.js` : Routes Express (`/packages`, `/buy`, `/history`).
