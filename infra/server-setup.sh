#!/usr/bin/env bash
# Chuẩn bị server Ubuntu (EC2 / VPS) MỘT LẦN trước lần deploy đầu tiên:
#   Docker Engine + compose plugin, swap (máy RAM nhỏ), múi giờ Việt Nam, thư mục /opt/vietnam-quiz.
# Chạy bằng user có sudo (EC2 Ubuntu: ubuntu):
#   curl -fsSL https://raw.githubusercontent.com/<owner>/<repo>/main/infra/server-setup.sh | bash
#   hoặc chép file lên rồi: bash server-setup.sh
# Tạo thêm user riêng cho deploy (GitHub Actions + vận hành, không có sudo, thuộc nhóm docker, sở hữu /opt/vietnam-quiz):
#   DEPLOY_USER=deploy bash server-setup.sh
#   rồi thêm public key:  echo "<nội dung file .pub>" | sudo tee -a /home/deploy/.ssh/authorized_keys
# Xong thì đăng xuất / đăng nhập lại để user dùng được lệnh docker không cần sudo.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/vietnam-quiz}"
SWAP_SIZE="${SWAP_SIZE:-2G}"
RUN_USER="${SUDO_USER:-$USER}"
DEPLOY_USER="${DEPLOY_USER:-}"

log() { echo "[$(date '+%F %T')] $*"; }
# Máy mới khởi động lần đầu thường đang chạy unattended-upgrades (giữ khoá dpkg): chờ tối đa 10 phút thay vì lỗi ngay
apt_get() { sudo apt-get -o DPkg::Lock::Timeout=600 "$@"; }

log "Cập nhật gói & múi giờ Asia/Ho_Chi_Minh"
apt_get update -y
apt_get install -y ca-certificates curl gnupg
sudo timedatectl set-timezone Asia/Ho_Chi_Minh

if ! command -v docker >/dev/null; then
  log "Cài Docker Engine + compose plugin (kho chính thức của Docker)"
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --batch --yes --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
  apt_get update -y
  apt_get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
sudo usermod -aG docker "$RUN_USER"
sudo systemctl enable --now docker

# Java + nginx cần ~1 GB: máy 2 GB thêm swap để không bị OOM khi khởi động
if ! sudo swapon --show | grep -q .; then
  log "Tạo swap $SWAP_SIZE"
  sudo fallocate -l "$SWAP_SIZE" /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
  echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf >/dev/null
  sudo sysctl -p /etc/sysctl.d/99-swappiness.conf >/dev/null
fi

# User deploy: không mật khẩu (chỉ đăng nhập bằng SSH key), không sudo. Lưu ý: nhóm docker ~ quyền root trên máy.
if [ -n "$DEPLOY_USER" ]; then
  if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
    log "Tạo user $DEPLOY_USER"
    sudo adduser --disabled-password --gecos "" "$DEPLOY_USER"
  fi
  sudo usermod -aG docker "$DEPLOY_USER"
  sudo install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
  [ -f "/home/$DEPLOY_USER/.ssh/authorized_keys" ] || sudo install -m 600 -o "$DEPLOY_USER" -g "$DEPLOY_USER" /dev/null "/home/$DEPLOY_USER/.ssh/authorized_keys"
fi
OWNER="${DEPLOY_USER:-$RUN_USER}"

log "Thư mục ứng dụng $APP_DIR (chủ sở hữu: $OWNER)"
sudo mkdir -p "$APP_DIR/infra"
sudo chown -R "$OWNER":"$OWNER" "$APP_DIR"

log "Xong. Docker: $(docker --version 2>/dev/null || sudo docker --version)"
echo "Bước tiếp: đăng xuất / đăng nhập lại SSH, rồi làm theo README.md (mục Production)"
