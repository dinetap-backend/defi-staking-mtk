import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Toaster } from 'sonner';

const STAKING_ADDRESS = '0xC0524d9516112BEeea6123Eedf8488c6f1431C46' as `0x${string}`;

function App() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');

  const { data: staked } = useReadContract({
    address: STAKING_ADDRESS,
    abi: [{ inputs: [{ name: "account", type: "address" }], name: "balances", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" }],
    functionName: 'balances',
    args: [address!],
    enabled: !!address,
  });

  const { data: pending } = useReadContract({
    address: STAKING_ADDRESS,
    abi: [{ inputs: [{ name: "account", type: "address" }], name: "earned", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" }],
    functionName: 'earned',
    args: [address!],
    enabled: !!address,
  });

  const { writeContract, isPending } = useWriteContract();

  const handleStake = () => {
    if (!amount) return;
    writeContract({
      address: STAKING_ADDRESS,
      abi: [{ inputs: [{ name: "amount", type: "uint256" }], name: "stake", outputs: [], stateMutability: "nonpayable", type: "function" }],
      functionName: 'stake',
      args: [parseEther(amount)],
    });
  };

  const handleClaim = () => writeContract({ address: STAKING_ADDRESS, functionName: 'getReward' });
  const handleExit = () => writeContract({ address: STAKING_ADDRESS, functionName: 'exit' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-inner">MTK</div>
            <h1 className="text-3xl font-bold tracking-tight">MTK Staking</h1>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto pt-28 px-6">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Stake MTK
          </h1>
          <p className="text-2xl text-zinc-400">Earn more MTK • Real-time rewards</p>
        </div>

        {isConnected ? (
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 rounded-2xl p-8 text-center">
                <p className="text-zinc-400 text-sm mb-2">Staked Balance</p>
                <p className="text-5xl font-semibold">{staked ? formatEther(staked) : '0.0000'}</p>
                <p className="text-emerald-400 text-lg">MTK</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-8 text-center">
                <p className="text-zinc-400 text-sm mb-2">Pending Rewards</p>
                <p className="text-5xl font-semibold text-emerald-400">{pending ? formatEther(pending) : '0.0000'}</p>
                <p className="text-emerald-400 text-lg">MTK</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-zinc-400 mb-3 text-sm font-medium">Amount to Stake</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10.0"
                  className="w-full bg-white/10 border border-white/20 rounded-3xl px-8 py-6 text-2xl focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              <button
                onClick={handleStake}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-7 rounded-3xl font-semibold text-2xl transition hover:scale-105"
              >
                {isPending ? 'Staking...' : 'Stake MTK'}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleClaim}
                  className="bg-emerald-600 hover:bg-emerald-700 py-7 rounded-3xl font-semibold text-xl transition"
                >
                  Claim Rewards
                </button>
                <button
                  onClick={handleExit}
                  className="bg-red-600 hover:bg-red-700 py-7 rounded-3xl font-semibold text-xl transition"
                >
                  Unstake All
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ConnectButton />
          </div>
        )}

        <div className="text-center text-xs text-zinc-500 mt-12">
          MyToken: 0x829CE0190728bf5D5ED07e2D046D4E7890b41125<br />
          MyStaking: 0xC0524d9516112BEeea6123Eedf8488c6f1431C46
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
