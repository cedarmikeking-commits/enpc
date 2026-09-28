import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [react(), viteMockServe(
    {
      mockPath: './mock',
      enable: true,
      logger: true,
    }
  )],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://62.234.182.118:13001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
});

