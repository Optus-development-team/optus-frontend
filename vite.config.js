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
    rollupOptions: {
      external: [
        '@solana-program/system',
        '@solana/web3.js'
      ],
      output: {
        globals: {
          '@solana-program/system': 'SolanaProgram',
          '@solana/web3.js': 'SolanaWeb3'
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      '@solana-program/system': '__vite-optional-peer-dep:@solana-program/system:@privy-io/react-auth:false',
      '@solana/web3.js': '__vite-optional-peer-dep:@solana/web3.js:@privy-io/react-auth:false'
    }
  }
})
