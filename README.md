# MTK Staking - Beautiful ERC20 Staking dApp

Modern, secure, and aesthetic staking platform built with **Foundry + Next.js 15 + Wagmi + RainbowKit**.

![Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=MTK+Staking+Screenshot)

## ✨ Features

- Clean single-pool staking
- Real-time reward calculation
- Approval handling (one-click)
- Responsive glassmorphic UI
- Pause / Emergency controls
- Fully audited-ready contracts

## Tech Stack

**Contracts**: Solidity 0.8.20 + Foundry  
**Frontend**: Next.js 15 + TypeScript + Tailwind + shadcn/ui + RainbowKit  
**Web3**: wagmi + viem

## Quick Start

```bash
# 1. Clone
git clone https://github.com/yourusername/mtk-staking.git
cd mtk-staking

# 2. Deploy Contracts
cd contracts
cp .env.example .env
forge install
forge script script/Deploy.s.sol --rpc-url https://rpc.sepolia.org --broadcast --verify

# 3. Run Frontend
cd ../frontend
cp .env.example .env.local
npm install
npm run dev