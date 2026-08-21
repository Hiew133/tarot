import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Dev và bản build thường nằm ở gốc. GitHub Pages đặt site ở đường dẫn con
  // (/tarot/), nên workflow deploy truyền BASE_PATH vào — không có nó thì mọi
  // /assets/... tuyệt đối sẽ trỏ trượt.
  base: process.env.BASE_PATH || '/',

  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
  },
});
