import React from 'react';
import { Trophy, Coins, BarChart2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function StatsDisplay() {
  const { chips, highestChips, gamesPlayed, gamesWon } = useGameStore();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
      <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
        <Coins className="w-8 h-8 text-emerald-500" />
        <div>
          <div className="text-sm text-gray-400">Current Chips</div>
          <div className="text-xl font-bold">{chips}</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <div>
          <div className="text-sm text-gray-400">Highest Chips</div>
          <div className="text-xl font-bold">{highestChips}</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
        <BarChart2 className="w-8 h-8 text-blue-500" />
        <div>
          <div className="text-sm text-gray-400">Games Played</div>
          <div className="text-xl font-bold">{gamesPlayed}</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
        <div className="w-8 h-8 flex items-center justify-center text-emerald-500">
          <span className="text-lg font-bold">%</span>
        </div>
        <div>
          <div className="text-sm text-gray-400">Win Rate</div>
          <div className="text-xl font-bold">
            {gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
}