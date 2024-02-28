// #region Imports

import { defineConfig } from 'vite'
import path from 'path'

import { svelte } from '@sveltejs/vite-plugin-svelte'

// #endregion

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
