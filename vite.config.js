import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '__vite-optional-peer-dep:@solana-program/system:@privy-io/react-auth:false': resolve(__dirname, 'src/shims/solanaProgramSystem.js')
    }
  },
  server: {
    host: true,
    allowedHosts: [
      'azalee-superfine-sydney.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io'
    ]
  }
})
