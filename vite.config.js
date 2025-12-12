import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'azalee-superfine-sydney.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io'
    ]
  },
  optimizeDeps: {
    exclude: ['@privy-io/react-auth']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  }
})
