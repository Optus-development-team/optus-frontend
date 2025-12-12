import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  avalancheFuji,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'OPTUS Payment',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5', // Obtener en https://cloud.walletconnect.com
  chains: [
    mainnet,
    polygon,
    avalancheFuji,
  ],
  ssr: false,
});
