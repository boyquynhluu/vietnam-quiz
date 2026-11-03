#!/usr/bin/env bash
# Tạo file infra/.env (file env DUY NHẤT của dự án, đã nằm trong .gitignore — KHÔNG commit).
#   ./init-env.sh dev     trên máy lập trình  (dùng với docker-compose.dev.yml)
#   ./init-env.sh prod    TRÊN VPS            (dùng với docker-compose.prod.yml)
# Docker Compose tự đọc infra/.env (cùng thư mục với file compose), không cần --env-file.
# Danh sách biến bên dưới là "chuẩn" của dự án: thêm biến mới thì thêm vào đây.
set -euo pipefail

cd "$(dirname "$0")"
ENV_NAME="${1:-}"
if [ "$ENV_NAME" != "dev" ] && [ "$ENV_NAME" != "prod" ]; then
  echo "Dùng: $0 dev|prod" >&2
  exit 1
fi
DST=".env"
if [ -e "$DST" ]; then
  echo "$DST đã tồn tại — không ghi đè (xoá file cũ nếu muốn tạo lại)." >&2
  exit 1
fi

if [ "$ENV_NAME" = "prod" ]; then
  CORS=""
else
  CORS="http://localhost:5173,http://localhost:4173"
fi

umask 077
cat > "$DST" <<TEMPLATE
# =====================================================================
#  Vietnam Quiz — biến môi trường (infra/.env). KHÔNG commit.
#  Máy này: ${ENV_NAME}   (tạo bởi infra/init-env.sh lúc $(date '+%F %T'))
#  Dev:  docker compose -f docker-compose.dev.yml up -d --build
#  Prod: docker compose -f docker-compose.prod.yml up -d --build
# =====================================================================
APP_ENV=${ENV_NAME}

# --- Backend ---
# Chỉ dev: nguồn frontend được gọi API (production cùng domain, không cần CORS).
CORS_ALLOWED_ORIGINS=${CORS}
BACKEND_MEM_LIMIT=512m
# Chỉ dev: cổng trên máy lập trình (đổi nếu trùng với project khác). Vite proxy đọc BACKEND_PORT.
BACKEND_PORT=8080
DEBUG_PORT=5005
APP_VERSION=latest

# --- Tên miền / HTTPS (chỉ production) ---
DOMAIN=vietnam-quiz.quanlychitieu.online
LETSENCRYPT_EMAIL=vanductai.dhv@gmail.com
TEMPLATE
chmod 600 "$DST"

echo "Đã tạo infra/$DST cho môi trường $ENV_NAME."
if [ "$ENV_NAME" = "prod" ]; then
  echo "Cần điền: DOMAIN, LETSENCRYPT_EMAIL — rồi chạy ./init-letsencrypt.sh."
else
  echo "Dùng được ngay."
fi
