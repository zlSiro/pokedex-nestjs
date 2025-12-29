## 2025 Dockerfile (NestJS) - multi-stage + Debian slim para evitar dolores con deps nativas en Alpine
## Usa Corepack para fijar Yarn 1.x de forma reproducible.

ARG NODE_IMAGE=node:22-bookworm-slim

FROM ${NODE_IMAGE} AS base
WORKDIR /app

# --- Dependencies (dev + prod) ---
FROM base AS deps
COPY package.json yarn.lock ./
RUN corepack enable \
	&& corepack prepare yarn@1.22.22 --activate \
	&& yarn install --frozen-lockfile

# --- Build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable \
	&& corepack prepare yarn@1.22.22 --activate \
	&& yarn build

# --- Production dependencies only ---
FROM base AS prod-deps
COPY package.json yarn.lock ./
RUN corepack enable \
	&& corepack prepare yarn@1.22.22 --activate \
	&& yarn install --frozen-lockfile --production=true

# --- Runtime ---
FROM ${NODE_IMAGE} AS runner

RUN apt-get update \
	&& apt-get install -y --no-install-recommends dumb-init ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER node

EXPOSE 3000

CMD ["dumb-init", "node", "dist/main"]