# DUBS APICULTURE

👉 [dubs-apiculture.ch](https://dubs-apiculture.ch/)

## Installation de l'environment de dev

Un seul fichier `.env`, à la racine, lu par le backend et le frontend.
`pnpm run dev` démarre aussi le conteneur Mongo (Docker, port 27018).

```sh
cp .env.example .env
pnpm install
pnpm run dev
```

## Déploiement

Chaque push sur `main` lance [.github/workflows/deploy.yml](.github/workflows/deploy.yml) :

1. Build des images `ghcr.io/peufo/dubs-backend` et `ghcr.io/peufo/dubs-frontend` (tags `latest` et sha du commit), poussées sur GHCR.
2. Appel de l'API Dokploy (`compose.deploy`), qui redéploie le service Compose.

Dokploy déploie [compose.prod.yml](compose.prod.yml) (backend, frontend, mongo). Le domaine pointe sur le service `backend`, port 5555. L'Autodeploy de Dokploy doit rester désactivé : c'est la CI qui déclenche le déploiement, une fois les images prêtes.

- GitHub, environnement `prod` : variables `DOKPLOY_URL` et `DOKPLOY_COMPOSE_ID`, secret `DOKPLOY_API_KEY`.
- Variables Dokploy (onglet Environment) : voir [.env.prod.example](.env.prod.example).

Tester les images en local :

```sh
docker build -f backend/Dockerfile -t dubs-backend .
docker build -f frontend/Dockerfile -t dubs-frontend .
```

## TODO

- [x] Profile
  - [x] Affichage et mise à jour du profile
  - [x] Affichage des commandes
- [x] Boutique
  - [x] Faire une commande
  - [x] Envoie des mails lors de la commande
- [x] Section réserver à l'admin
  - [x] Navigation dans les actions
  - [ ] Vue des commandes + changement de status / paiement
  - [ ] Validation du panier pour un client
- [x] Faire un page avec une action prédéfini (la recherche étant réservé l'admin)
- [x] Faire le tour du contenu avec Mathilde
- [x] Débug navigation
- [x] Gerer la récupération de compte
