import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // BACKEND_PORT lấy từ infra/.env (file env duy nhất của dự án), mặc định 8080
  const env = loadEnv(mode, '../infra', '');
  const backendPort = process.env.BACKEND_PORT || env.BACKEND_PORT || '8080';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      // Dev: gọi /api cùng origin, Vite chuyển sang backend (mvn spring-boot:run hoặc docker-compose.dev.yml)
      proxy: {
        '/api': `http://localhost:${backendPort}`,
      },
    },
  };
});
