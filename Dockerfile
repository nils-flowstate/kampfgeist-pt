FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/data /usr/share/nginx/html/data
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
