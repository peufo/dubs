# Image du backend (Payload + Express). À builder depuis la racine du dépôt :
#   docker build -f backend/Dockerfile .
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/

FROM base AS build
RUN pnpm install --frozen-lockfile --filter ./backend
COPY types types
COPY backend backend
RUN pnpm --filter ./backend build

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --prod --filter ./backend

FROM node:22-alpine
ENV NODE_ENV=production \
    BACKEND_PORT=5555 \
    MEDIA_DIR=/app/media \
    PAYLOAD_CONFIG_PATH=build/backend/src/payload.config.js
WORKDIR /app/backend
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/build ./build
COPY backend/package.json ./
RUN mkdir -p /app/media && chown node:node /app/media
USER node
EXPOSE 5555
CMD ["node", "build/backend/src/server.js"]
