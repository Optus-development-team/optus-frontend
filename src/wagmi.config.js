import { getDefaultConfig, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coreWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  mainnet,
  polygon,
  avalancheFuji,
} from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recomendadas',
      wallets: [metaMaskWallet, coreWallet, rainbowWallet, coinbaseWallet],
    },
    {
      groupName: 'Otras',
      wallets: [walletConnectWallet],
    },
  ],
  {
    appName: 'OPTUS Payment',
    projectId,
  }
);

export const config = getDefaultConfig({
  appName: 'OPTUS Payment',
  projectId,
  chains: [mainnet, polygon, avalancheFuji],
  connectors,
  ssr: false,
});
