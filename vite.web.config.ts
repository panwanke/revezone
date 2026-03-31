import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Web-only build config for GitHub Pages deployment.
export default defineConfig({
  base: '/revezone/',
  root: 'src/renderer',
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src')
    }
  },
  plugins: [react()],
  define: {
    'process.env.TLDRAW_LICENSE_KEY': JSON.stringify(''),
    'process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY': JSON.stringify(''),
    'process.env': JSON.stringify({})
  },
  build: {
    outDir: resolve('dist-web'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
          tldraw: ['tldraw'],
          excalidraw: ['@excalidraw/excalidraw']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'tldraw', '@excalidraw/excalidraw']
  }
});
