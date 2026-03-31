import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Web-only build config for GitHub Pages deployment.
// This builds only the renderer (React app) without Electron.
// window.api calls use optional chaining (?.) throughout the codebase
// so they gracefully no-op in the browser environment.
export default defineConfig({
  // Set base to match your GitHub Pages URL: https://<user>.github.io/<repo>/
  base: '/revezone/',
  root: 'src/renderer',
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src')
    }
  },
  plugins: [react()],
  define: {
    // Ensure process.env is available for any packages that reference it
    'process.env': {
      'process.env.TLDRAW_LICENSE_KEY': JSON.stringify(''),
      'process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY': JSON.stringify('')
    }
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
