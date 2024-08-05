import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'three': path.resolve(__dirname, 'node_modules/three'),
      'three/examples/jsm': path.resolve(__dirname, 'node_modules/three/examples/jsm')
    }
  },
  optimizeDeps: {
    include: ['three']
  }
});
