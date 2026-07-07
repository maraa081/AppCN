import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CN/',
  preview: {
    allowedHosts: ['guaiguai2.duckdns.org'],
  },
})
