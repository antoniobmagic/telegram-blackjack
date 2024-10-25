import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  card?: string;
  hidden?: boolean;
  className?: string;
}

export function Card({ card, hidden = false, className }: CardProps) {
  if (!card || hidden) {
    return (
      <div className={cn(
        "w-24 h-36 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center",
        "shadow-lg transform transition-transform hover:scale-105",
        className
      )}>
        <div className="w-16 h-24 rounded bg-gray-800"></div>
      </div>
    );
  }

  const [value, suit] = card.split('');
  const suitColors: Record<string, string> = {
    '♥': 'text-red-500',
    '♦': 'text-red-500',
    '♠': 'text-white',
    '♣': 'text-white'
  };

  return (
    <div className={cn(
      "w-24 h-36 bg-white rounded-lg border-2 border-gray-200 flex flex-col items-center justify-between p-2",
      "shadow-lg transform transition-transform hover:scale-105",
      className
    )}>
      <div className={cn("text-xl font-bold", suitColors[suit])}>{value}</div>
      <div className={cn("text-4xl", suitColors[suit])}>{suit}</div>
      <div className={cn("text-xl font-bold rotate-180", suitColors[suit])}>{value}</div>
    </div>
  );
}