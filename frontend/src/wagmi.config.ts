import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MTK Staking',
  projectId: 'd8337a6331ae5af969fa5559c5601808', // You need to get this from https://cloud.walletconnect.com
  chains: [sepolia], // Since your contract is on Sepolia
  ssr: false, // Since you're using Vite (not Next.js)
});