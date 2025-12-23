import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cette configuration assure que Vercel comprend comment compiler ton code React
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
})
