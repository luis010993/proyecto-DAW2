import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // AÑADE ESTO DE AQUÍ ABAJO 👇
  preview: {
    allowedHosts: ['impartial-spontaneity-production-36c6.up.railway.app'],
  },
})