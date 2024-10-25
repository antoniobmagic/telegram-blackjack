import React from 'react';
import { Link } from 'react-router-dom';
import { CircleDollarSign, Trophy, Wallet } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function Layout({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const { connect } = useConnect();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <CircleDollarSign className="w-6 h-6 text-emerald-500" />
                <span className="font-bold text-xl">Web3 Blackjack</span>
              </Link>
              <Link to="/game" className="hover:text-emerald-500 transition">
                Play Game
              </Link>
              <Link to="/leaderboard" className="hover:text-emerald-500 transition">
                <Trophy className="w-5 h-5" />
              </Link>
            </div>
            
            {!address ? (
              <div className="flex space-x-4">
                <button
                  onClick={() => connect({ connector: injected() })}
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-emerald-500">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}