# syntax=docker/dockerfile:1.7

# ============================================================
# 1) Base image
# ============================================================
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# Common envs across stages (use key=value to silence Docker warnings)
ENV NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_LOGLEVEL=warn \
    NPM_CONFIG_PROGRESS=false \
    NEXT_TELEMETRY_DISABLED=1

# ============================================================
# 2) Install dependencies (cached layer)
#    BuildKit cache mount keeps npm cache between builds → 5-10x faster
# ============================================================
FROM base AS deps
WORKDIR /app

# 512MB is plenty for `npm ci`; saves headroom for parallel jobs on low-RAM VPS
ENV NODE_OPTIONS=--max-old-space-size=512

COPY package.json package-lock.json* ./

# NOTE: do NOT add --ignore-scripts here. Next.js + sharp need their
# postinstall to compile native bindings; without them image
# optimization crashes the container at runtime.
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci \
      --legacy-peer-deps \
      --no-audit --no-fund \
      --prefer-offline \
      --maxsockets 5

# ============================================================
# 3) Build the Next.js app
# ============================================================
FROM base AS builder
WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=1024

# NEXT_PUBLIC_* must be present at build time (Next.js inlines them into the bundle).
ARG NEXT_PUBLIC_SITE_URL=https://ishraqa.shop
ARG NEXT_PUBLIC_API_URL=https://api.ishraqa.shop
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=D9HVUCRC77UD7F80B5S0
ARG NEXT_PUBLIC_SNAP_PIXEL_ID=
ARG NEXT_PUBLIC_ENABLE_PIXELS=true

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID \
    NEXT_PUBLIC_TIKTOK_PIXEL_ID=$NEXT_PUBLIC_TIKTOK_PIXEL_ID \
    NEXT_PUBLIC_SNAP_PIXEL_ID=$NEXT_PUBLIC_SNAP_PIXEL_ID \
    NEXT_PUBLIC_ENABLE_PIXELS=$NEXT_PUBLIC_ENABLE_PIXELS

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ============================================================
# 4) Production runtime — minimal, non-root
# ============================================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
