import React, { useState } from 'react';
import { Crown, Calendar } from 'lucide-react';

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Crown className="w-8 h-8 text-yellow-500" />
          Leaderboard
        </h2>
        
        <div className="flex gap-4">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              timeframe === 'weekly' ? 'bg-emerald-600' : 'bg-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              timeframe === 'monthly' ? 'bg-emerald-600' : 'bg-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Monthly
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Player</th>
              <th className="px-6 py-4 text-right">Winnings</th>
              <th className="px-6 py-4 text-right">Games Played</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder data - will be replaced with real data from Firebase */}
            {[1, 2, 3].map((rank) => (
              <tr key={rank} className="border-t border-gray-700">
                <td className="px-6 py-4">#{rank}</td>
                <td className="px-6 py-4">0x1234...5678</td>
                <td className="px-6 py-4 text-right text-emerald-500">+1000 CHIPS</td>
                <td className="px-6 py-4 text-right">42</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}