# Header chuyển tiếp sang backend (include từ default.conf.template — file .inc không bị render envsubst).
# X-Real-IP = IP thật của khách do nginx thấy; backend đọc header này (RequestMetadata) và nginx luôn ghi đè
# giá trị client tự gửi lên.
proxy_http_version 1.1;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header X-Forwarded-Proto https;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port 443;
