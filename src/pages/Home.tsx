import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Trophy, Coins } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
        Web3 Blackjack
      </h1>
      
      <p className="text-xl text-gray-400 text-center max-w-2xl">
        Play Blackjack with your crypto wallet, compete in weekly and monthly tournaments,
        and climb the leaderboard to win exclusive rewards!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
        <div className="bg-gray-800 p-6 rounded-xl">
          <PlayCircle className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Start Playing</h3>
          <p className="text-gray-400">Connect your wallet and get free points to start playing instantly</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <Trophy className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Compete & Win</h3>
          <p className="text-gray-400">Join weekly and monthly tournaments with exciting prize pools</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <Coins className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
          <p className="text-gray-400">Top players receive exclusive rewards and special privileges</p>
        </div>
      </div>

      <button
        onClick={() => navigate('/game')}
        className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
      >
        Play Now
      </button>
    </div>
  );
}