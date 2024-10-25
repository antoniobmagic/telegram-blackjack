import React from 'react';
import { Coins } from 'lucide-react';

interface BettingControlsProps {
  chips: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onPlaceBet: () => void;
}

export function BettingControls({ 
  chips, 
  betAmount, 
  setBetAmount, 
  onPlaceBet 
}: BettingControlsProps) {
  const chipValues = [10, 25, 50, 100];

  const handleChipClick = (value: number) => {
    if (value + betAmount <= chips) {
      setBetAmount(betAmount + value);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Math.min(Number(e.target.value), chips))}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg w-32 text-center"
          min="10"
          max={chips}
        />
        <button
          onClick={() => setBetAmount(0)}
          className="text-gray-400 hover:text-white transition"
        >
          Clear
        </button>
      </div>

      <div className="flex space-x-4">
        {chipValues.map((value) => (
          <button
            key={value}
            onClick={() => handleChipClick(value)}
            disabled={value + betAmount > chips}
            className={`relative group ${
              value + betAmount > chips ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:-translate-y-1'
            }`}
          >
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${value === 10 ? 'bg-blue-600' :
                value === 25 ? 'bg-green-600' :
                value === 50 ? 'bg-red-600' :
                'bg-purple-600'} 
              shadow-lg transition-transform duration-200
            `}>
              <Coins className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              {value}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onPlaceBet}
        disabled={betAmount < 10 || betAmount > chips}
        className={`
          flex items-center space-x-2 px-8 py-3 rounded-lg text-lg font-semibold
          ${betAmount >= 10 && betAmount <= chips
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-gray-700 cursor-not-allowed'
          } transition
        `}
      >
        Place Bet
      </button>
    </div>
  );
}