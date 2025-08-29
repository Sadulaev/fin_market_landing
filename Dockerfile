# Базовый образ
FROM node:18-alpine AS base

# Этап сборки
FROM base AS builder
WORKDIR /app

# Копируем package.json
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Финальный образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Создаем пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Меняем пользователя
USER nextjs

# Открываем порт
EXPOSE 3000

# Переменные окружения
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]