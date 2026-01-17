FROM node:20

WORKDIR /app
COPY frontend/package*.json ./
COPY frontend/postcss.config.js ./
COPY frontend/tailwind.config.js ./


RUN npm install

COPY frontend/ ./

EXPOSE 3000

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
