FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm ci --no-audit --no-fund

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]