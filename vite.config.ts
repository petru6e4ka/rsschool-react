/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]__[hash:base64:6]',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTest.ts'],
  },
});
