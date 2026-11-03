# Discover Vietnam Quiz

Web trắc nghiệm tiếng Anh về lịch sử, văn hóa, thiên nhiên, con người Việt Nam.

Cấu trúc theo dự án `pho-son`: backend và frontend là 2 image riêng, nginx ngoài cùng làm HTTPS và chuyển `/api` sang backend,
toàn bộ hạ tầng nằm trong `infra/`. Không dùng database — câu hỏi nằm trong `questions.json`.

## Cấu trúc thư mục

```
vietnam-quiz/
├── backend/                         # Spring Boot 3.5 (Java 21), 1 Maven module, Dockerfile riêng
│   └── src/
│       ├── main/java/com/quiz/
│       │   ├── VietnamQuizApplication.java
│       │   ├── common/              # config (CORS) dùng chung
│       │   └── question/            # câu hỏi, chủ đề, chấm điểm: controller / service / dto / domain
│       ├── main/resources/
│       │   ├── application.yml      # + application-dev.yml, application-prod.yml
│       │   └── questions.json
│       └── test/java/com/quiz/<module>/
├── frontend/                        # React 18 + Vite, Dockerfile (build tĩnh -> nginx)
│   └── src/ api, assets, components, hooks, pages, utils
├── infra/                           # docker-compose dev/prod, nginx, script server / deploy / HTTPS
├── .github/workflows/               # ci.yml, cd.yml, secret-scan.yml
├── .githooks/                       # pre-commit chặn file build + secret
├── docs/
└── loadtest/
```

## Bảo mật khi commit

Sau khi clone, bật pre-commit hook (chặn commit file build, `.env`, key/chứng chỉ và secret hard-code):

```bash
git config core.hooksPath .githooks
```

- Biến môi trường chỉ nằm trong `infra/.env` (đã ignore, không commit). Tạo bằng `infra/init-env.sh` — script chứa danh sách biến chuẩn.
- CI luôn chạy [gitleaks](https://github.com/gitleaks/gitleaks) qua `.github/workflows/secret-scan.yml`.
- Dòng bị nhận nhầm là secret: thêm comment `gitleaks:allow` vào cuối dòng.

## Môi trường dev và production

| | Dev (máy lập trình) | Production (VPS) |
|---|---|---|
| Compose | `infra/docker-compose.dev.yml` | `infra/docker-compose.prod.yml` |
| File env | `infra/.env` tạo bằng `./init-env.sh dev` | `infra/.env` trên VPS, tạo bằng `./init-env.sh prod` |
| Profile Spring | `dev`: CORS cho Vite, log DEBUG | `prod`: không CORS, không trả stacktrace |
| Cổng mở | `127.0.0.1`: backend `BACKEND_PORT` (8080), debug `DEBUG_PORT` (5005) | Chỉ nginx 80/443 |
| Frontend | `npm run dev` (Vite proxy `/api` -> `BACKEND_PORT`) | Image nginx tĩnh, nginx ngoài cùng làm HTTPS + chuyển `/api` sang backend |

### Dev

```bash
bash infra/init-env.sh dev                                       # tạo infra/.env
docker compose -f infra/docker-compose.dev.yml up -d --build      # backend http://localhost:$BACKEND_PORT (mặc định 8080)
cd frontend && npm install && npm run dev                         # http://localhost:5173
```

- Không dùng Docker: `cd backend && mvn spring-boot:run` (mặc định profile `dev`).
- Debug: gắn IDE vào `localhost:$DEBUG_PORT` (mặc định 5005). Trùng cổng với project khác thì đổi `BACKEND_PORT` / `DEBUG_PORT` trong `infra/.env`.
- Test: `cd backend && mvn verify`; lint frontend: `cd frontend && npm run lint`.

### Production (VPS Ubuntu + Docker)

Chuẩn bị server (một lần):

```bash
DEPLOY_USER=deploy bash infra/server-setup.sh     # Docker, swap, múi giờ, thư mục /opt/vietnam-quiz, user deploy
echo "<nội dung deploy_key.pub>" | sudo tee -a /home/deploy/.ssh/authorized_keys
```

Trên VPS, trong `/opt/vietnam-quiz/infra` (CD tự chép thư mục `infra/` lên; lần đầu có thể chép tay):

```bash
./init-env.sh prod             # tạo infra/.env
nano .env                      # điền DOMAIN, LETSENCRYPT_EMAIL
./init-letsencrypt.sh          # lần đầu: chứng chỉ HTTPS (DNS của DOMAIN phải trỏ về VPS)
```

Sau đó deploy qua CI/CD, hoặc build tại server: `docker compose -f docker-compose.prod.yml up -d --build`.

> Production bắt buộc có tên miền (`DOMAIN`) vì nginx chỉ phục vụ HTTPS.

## CI/CD (GitHub Actions → VPS)

- **`ci.yml`** (mọi push / PR): `mvn verify`, `npm run lint` + `npm run build`, `nginx -t` cho template; PR build thử 2 image.
- **`cd.yml`** (push lên `main` hoặc Run workflow): chạy lại CI → build & đẩy
  `ghcr.io/<owner>/<repo>/backend` và `/frontend` (tag `yyyyMMdd-<sha>` + `latest`) → vào tailnet qua Tailscale →
  chép image sang VPS (`docker save | ssh vps docker load`) → chạy `infra/deploy.sh <tag>`:
  khởi động lại, chờ backend healthy; không healthy thì tự quay về phiên bản trước.
- **`secret-scan.yml`**: gitleaks + chặn file build / `.env` / key bị commit.

> **Vì sao cần Tailscale:** VPS chỉ có IPv6, runner GitHub chỉ có IPv4, và `ghcr.io` cũng không có IPv6.
> Runner vào tailnet tạm thời (relay DERP của Tailscale chạy được trên IPv6) để SSH, rồi tự đẩy image sang VPS.

Chuẩn bị Tailscale (một lần):

1. Trên VPS: `curl -fsSL https://tailscale.com/install.sh | sh && sudo tailscale up`, rồi `tailscale ip -4` lấy IP `100.x.y.z`.
2. Trong [admin console](https://login.tailscale.com/admin/acls/file), thêm tag vào policy file:
   `"tagOwners": { "tag:ci": ["autogroup:admin"] }` (ACL mặc định cho phép mọi node trong tailnet SSH vào VPS).
3. Settings → OAuth clients → tạo client có scope **Auth Keys (write)**, tag `tag:ci` → lấy client ID / secret.

Tạo SSH key riêng cho deploy (trên máy bạn):

```bash
ssh-keygen -t ed25519 -f deploy_key -N ""
```

Lấy `VPS_KNOWN_HOSTS` (chạy trên VPS, theo đúng IP Tailscale dùng làm `VPS_HOST`): `ssh-keyscan -H "$(tailscale ip -4)"`

Cấu hình trong GitHub: Settings → Environments → `production`:

| Loại | Tên | Giá trị |
|---|---|---|
| Secret | `TS_OAUTH_CLIENT_ID` | OAuth client ID của Tailscale |
| Secret | `TS_OAUTH_SECRET` | OAuth client secret của Tailscale |
| Secret | `VPS_HOST` | IP Tailscale của VPS (`100.x.y.z`) |
| Secret | `VPS_USER` | `deploy` |
| Secret | `VPS_SSH_KEY` | nội dung file `deploy_key` (private key) |
| Secret | `VPS_KNOWN_HOSTS` | kết quả `ssh-keyscan` |
| Secret | `VPS_PORT` | (tùy chọn) cổng SSH, mặc định 22 |
| Variable | `APP_DIR` | (tùy chọn) mặc định `/opt/vietnam-quiz` |
| Variable | `APP_URL` | (tùy chọn) ví dụ `https://quiz.example.com` – dùng cho smoke test |

Muốn có bước duyệt tay trước khi deploy: bật *Required reviewers* cho environment `production`.

Rollback thủ công trên VPS: `IMAGE_PREFIX=ghcr.io/<owner>/<repo> bash /opt/vietnam-quiz/infra/deploy.sh <tag cũ>`

## API

| Method | URL | Mô tả |
|---|---|---|
| GET | `/api/categories` | Danh sách chủ đề + số câu |
| GET | `/api/questions?category=HISTORY&limit=10&shuffle=true` | Lấy câu hỏi (không kèm đáp án) |
| POST | `/api/submit` | Body `{"answers":[{"questionId":1,"chosen":0}]}` → chấm điểm + giải thích |

## Thêm câu hỏi

Thêm phần tử vào `backend/src/main/resources/questions.json` (`id` không trùng, `category` là HISTORY / CULTURE / NATURE / PEOPLE,
`answer` là vị trí đáp án đúng, bắt đầu từ 0), rồi build / deploy lại backend.
