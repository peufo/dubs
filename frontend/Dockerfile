# Image du frontend (SvelteKit, adapter-node). À builder depuis la racine du dépôt :
#   docker build -f frontend/Dockerfile .
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/

FROM base AS build
RUN pnpm install --frozen-lockfile --filter ./frontend
COPY types types
COPY frontend frontend
RUN pnpm --filter ./frontend build

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --prod --filter ./frontend

FROM node:22-alpine
ENV NODE_ENV=production \
    PORT=3000 \
    BACKEND_URL=http://backend:5555
WORKDIR /app/frontend
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/frontend/node_modules ./node_modules
COPY --from=build /app/frontend/build ./build
COPY frontend/package.json ./
USER node
EXPOSE 3000
CMD ["node", "build/index.js"]
