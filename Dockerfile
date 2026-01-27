# Multi-stage build для оптимизации размера образа
FROM node:20-alpine AS base

# Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force

# Стадия сборки
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Сборка приложения
RUN npm run build

# Production образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002
ENV HOST=0.0.0.0

# Создаём пользователя без root-прав
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt

# Копируем собранное приложение
COPY --from=builder --chown=nuxt:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxt:nodejs /app/package.json ./package.json

USER nuxt

EXPOSE 3002

# Запуск приложения
CMD ["node", ".output/server/index.mjs"]
