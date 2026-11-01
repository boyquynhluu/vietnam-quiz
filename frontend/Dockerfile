# syntax=docker/dockerfile:1
# Build bản tĩnh của React rồi phục vụ bằng nginx. API gọi cùng domain (/api), nginx ngoài cùng
# (infra/nginx) chuyển /api sang backend — nên không cần VITE_API_BASE_URL khi deploy chung domain.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
ARG VITE_API_BASE_URL=
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
