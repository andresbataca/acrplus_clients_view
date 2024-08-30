
FROM node:18-alpine AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install


FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM nginx:1.23.3 as prod
EXPOSE 80
COPY --from=builder /app/dist/acr_plus_clients_view/browser /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf


CMD ["nginx", "-g", "daemon off;"]
