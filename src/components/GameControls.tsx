import React from 'react';
import { HandPalm, Plus, Repeat } from 'lucide-react';

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onDouble?: () => void;
  canDouble?: boolean;
  gameEnded?: boolean;
  onNewGame: () => void;
}

export function GameControls({ 
  onHit, 
  onStand, 
  onDouble, 
  canDouble = false,
  gameEnded = false,
  onNewGame 
}: GameControlsProps) {
  if (gameEnded) {
    return (
      <button
        onClick={onNewGame}
        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition"
      >
        <Repeat className="w-5 h-5" />
        <span>New Game</span>
      </button>
    );
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={onHit}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition"
      >
        <Plus className="w-5 h-5" />
        <span>Hit</span>
      </button>
      
      <button
        onClick={onStand}
        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition"
      >
        <HandPalm className="w-5 h-5" />
        <span>Stand</span>
      </button>

      {canDouble && (
        <button
          onClick={onDouble}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        >
          <span>Double Down</span>
        </button>
      )}
    </div>
  );
}