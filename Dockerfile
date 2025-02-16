# Указываем базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY ./app/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем pm2 глобально, если он необходим
RUN npm install pm2 -g

# Копируем оставшийся код приложения
COPY ./app .

# Устанавливаем переменную окружения для сборки
ENV NODE_ENV=production

# Выполняем сборку приложения
RUN npm run build

# Открываем порт 3000 для доступа
EXPOSE 3000

# Запускаем приложение без PM2 напрямую через node
CMD ["node", ".output/server/index.mjs"]