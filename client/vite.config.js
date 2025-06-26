// client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is the explicit configuration that will fix the issue
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})