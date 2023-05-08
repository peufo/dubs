FROM node:18-alpine
WORKDIR /app
ENV CI=true
RUN npm install -g pnpm pm2

#COPY backend/package.json backend/.npmrc pnpm-lock.yaml pnpm-workspace.yaml ./

COPY . .
RUN pnpm --filter ./backend install --frozen-lockfile
RUN pnpm --filter ./backend build
WORKDIR /app/backend

EXPOSE 5002

CMD ["pm2-runtime", "./ecosystem.config.js"]