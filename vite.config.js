import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fromRoot = (relativePath) => path.resolve(__dirname, relativePath)

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const optionalPeerAlias = (packageName, shimPath) => ({
  find: new RegExp(
    `^__vite-optional-peer-dep:${escapeRegex(packageName)}:@privy-io/react-auth:(true|false)$`
  ),
  replacement: fromRoot(shimPath)
})

const optionalPeerAliases = [
  optionalPeerAlias('@solana-program/system', './src/shims/solanaProgramSystem.js'),
  optionalPeerAlias('@solana-program/token', './src/shims/solanaProgramToken.js'),
  optionalPeerAlias('@solana-program/token-2022', './src/shims/solanaProgramToken2022.js'),
  optionalPeerAlias('@solana-program/memo', './src/shims/solanaProgramMemo.js'),
  optionalPeerAlias('@solana/kit', './src/shims/solanaKit.js'),
  optionalPeerAlias('@solana/sysvars', './src/shims/solanaSysvars.js'),
  optionalPeerAlias('@solana/web3.js', './src/shims/solanaWeb3.js')
]

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
  resolve: {
    // Force Privy's optional Solana peer deps to resolve even when Rollup wraps them.
    alias: optionalPeerAliases
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  }
})
