
FROM node:18-alpine AS base
WORKDIR /app

FROM base AS builder
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --workspace=api

FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm install --omit=dev

FROM node:18-alpine AS api-final
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY apps/api/package.json ./package.json

CMD ["node", "dist/main.js"]