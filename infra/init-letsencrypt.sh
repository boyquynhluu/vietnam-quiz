#!/usr/bin/env bash
# Xin chứng chỉ Let's Encrypt ĐẦU TIÊN cho $DOMAIN (+ www.$DOMAIN khi DNS của www đã có).
# Chạy 1 lần trước lần `up` đầu tiên: khối HTTPS của nginx không khởi động được khi chưa có chứng chỉ, nên script dùng server standalone của certbot ở cổng 80.
# Các lần gia hạn sau tự động (container certbot + webroot).
# Dùng:  ./init-letsencrypt.sh             (chứng chỉ thật)
#        STAGING=1 ./init-letsencrypt.sh   (chứng chỉ thử của Let's Encrypt — thử nghiệm không lo giới hạn)
#        FORCE=1 ./init-letsencrypt.sh     (thay chứng chỉ đang có, vd: thay bản staging bằng bản thật)
#        Chạy lại khi đã có chứng chỉ để thêm www (giữ nguyên đường dẫn live/$DOMAIN).
set -euo pipefail

cd "$(dirname "$0")"
ENV_FILE=.env
COMPOSE="docker compose -f docker-compose.prod.yml"

DOMAIN="$(grep -E '^DOMAIN=' "$ENV_FILE" | cut -d= -f2-)"
EMAIL="$(grep -E '^LETSENCRYPT_EMAIL=' "$ENV_FILE" | cut -d= -f2-)"
if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "Thiếu DOMAIN hoặc LETSENCRYPT_EMAIL trong $ENV_FILE" >&2
  exit 1
fi

# Cổng 80 phải trống cho certbot --standalone
$COMPOSE stop nginx >/dev/null 2>&1 || true

STAGING_ARG=""
if [ "${STAGING:-0}" = "1" ]; then
  STAGING_ARG="--staging"
  echo "Dùng Let's Encrypt STAGING (chứng chỉ thử, trình duyệt sẽ báo không tin cậy)."
fi

FORCE_ARG=""
if [ "${FORCE:-0}" = "1" ]; then
  FORCE_ARG="--force-renewal"
fi

# www.$DOMAIN: chỉ thêm khi DNS đã trỏ về đây, nếu không Let's Encrypt từ chối cả chứng chỉ.
# --cert-name giữ đường dẫn live/$DOMAIN mà nginx dùng; --expand thêm www vào chứng chỉ đang có.
NAMES=("$DOMAIN")
if getent hosts "www.$DOMAIN" >/dev/null; then
  NAMES+=("www.$DOMAIN")
else
  echo "Chưa có DNS cho www.$DOMAIN — chứng chỉ chỉ gồm $DOMAIN."
fi
DOMAIN_ARGS=()
for name in "${NAMES[@]}"; do DOMAIN_ARGS+=(-d "$name"); done

echo "Xin chứng chỉ cho ${NAMES[*]} ..."
$COMPOSE run --rm -p 80:80 --entrypoint certbot certbot certonly \
  --standalone --non-interactive --agree-tos --no-eff-email \
  --email "$EMAIL" --cert-name "$DOMAIN" --expand "${DOMAIN_ARGS[@]}" $STAGING_ARG $FORCE_ARG

echo "Xong. Chạy tiếp: deploy qua CI/CD (infra/deploy.sh) hoặc build tại server: $COMPOSE up -d --build"
