import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/last-angel-web/',
  plugins: [react()],
})
