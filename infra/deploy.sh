#!/usr/bin/env bash
# Deploy 1 phiên bản image lên server (EC2). GitHub Actions (cd.yml) gọi qua SSH:
#   printf '%s' "$TOKEN" | GHCR_USER=<user> IMAGE_PREFIX=ghcr.io/<owner>/<repo> bash infra/deploy.sh <tag>
# Gọi tay trên server (image đã có sẵn / repo public):
#   IMAGE_PREFIX=ghcr.io/<owner>/<repo> bash infra/deploy.sh <tag>
#
# Các bước: kéo image -> up -d -> chờ backend healthy -> ghi lại phiên bản đang chạy.
# Backend không lên trong thời gian chờ -> tự quay về phiên bản trước.
set -euo pipefail

cd "$(dirname "$0")"
TAG="${1:?Dùng: deploy.sh <tag>}"
PREFIX="${IMAGE_PREFIX:?Thiếu IMAGE_PREFIX (vd ghcr.io/owner/repo)}"
COMPOSE=(docker compose -f docker-compose.prod.yml)
STATE_FILE=.deployed-version
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-180}"

log() { echo "[$(date '+%F %T')] $*"; }

[ -f .env ] || { echo "Thiếu infra/.env — tạo bằng ./init-env.sh prod trước khi deploy" >&2; exit 1; }

# 1. Đăng nhập registry nếu được truyền token qua stdin (repo private)
if [ -n "${GHCR_USER:-}" ] && [ ! -t 0 ]; then
  TOKEN="$(cat)"
  if [ -n "$TOKEN" ]; then
    printf '%s' "$TOKEN" | docker login "${PREFIX%%/*}" -u "$GHCR_USER" --password-stdin >/dev/null
    trap 'docker logout "${PREFIX%%/*}" >/dev/null 2>&1 || true' EXIT
  fi
fi

PREVIOUS="$(cat "$STATE_FILE" 2>/dev/null || true)"
run() { IMAGE_PREFIX="$PREFIX" APP_VERSION="$1" "${COMPOSE[@]}" "${@:2}"; }

wait_healthy() {
  local waited=0 status
  while [ "$waited" -lt "$HEALTH_TIMEOUT" ]; do
    status="$(docker inspect -f '{{.State.Health.Status}}' vietnam-quiz-backend 2>/dev/null || echo missing)"
    [ "$status" = healthy ] && return 0
    sleep 5
    waited=$((waited + 5))
  done
  return 1
}

# 2. Kéo image mới, khởi động lại (nginx / certbot giữ nguyên nếu không đổi)
#    Tag gắn theo commit nên image đã có trên máy thì không kéo lại (vd rollback về tag cũ)
if docker image inspect "$PREFIX/backend:$TAG" "$PREFIX/frontend:$TAG" >/dev/null 2>&1; then
  log "Image $PREFIX/{backend,frontend}:$TAG đã có sẵn — bỏ qua pull"
else
  log "Kéo image $PREFIX/{backend,frontend}:$TAG"
  run "$TAG" pull backend frontend
fi
log "Khởi động phiên bản $TAG"
run "$TAG" up -d --no-build --remove-orphans

# Template nginx chỉ được render khi container khởi động: đổi template (file mount, compose không thấy) -> restart nginx
NGINX_HASH_FILE=.nginx-templates.sha
NGINX_HASH="$(cat nginx/templates/* | sha256sum | cut -d' ' -f1)"
if [ "$NGINX_HASH" != "$(cat "$NGINX_HASH_FILE" 2>/dev/null || true)" ]; then
  log "Cấu hình nginx thay đổi — khởi động lại nginx"
  run "$TAG" restart nginx
  echo "$NGINX_HASH" > "$NGINX_HASH_FILE"
fi

# Nginx là cổng vào duy nhất (80/443): cấu hình lỗi thì container khởi động lại liên tục dù backend vẫn chạy
nginx_running() {
  sleep 8
  [ "$(docker inspect -f '{{.State.Running}} {{.State.Restarting}}' vietnam-quiz-nginx 2>/dev/null)" = "true false" ]
}

# 3. Chờ backend healthy, rồi kiểm tra nginx
if wait_healthy; then
  if ! nginx_running; then
    log "Nginx không chạy (backend vẫn healthy) — log gần nhất:"
    docker logs --tail 20 vietnam-quiz-nginx 2>&1 || true
    exit 1
  fi
  echo "$TAG" > "$STATE_FILE"
  log "Deploy $TAG thành công"
  docker image prune -f >/dev/null || true
  exit 0
fi

log "Backend không healthy sau ${HEALTH_TIMEOUT}s — log gần nhất:"
docker logs --tail 80 vietnam-quiz-backend || true
if [ -n "$PREVIOUS" ] && [ "$PREVIOUS" != "$TAG" ]; then
  log "Quay về phiên bản trước: $PREVIOUS"
  run "$PREVIOUS" up -d --no-build backend frontend
  if wait_healthy; then
    log "Đã chạy lại $PREVIOUS"
  else
    log "Phiên bản $PREVIOUS cũng không lên — kiểm tra tay"
  fi
fi
exit 1
