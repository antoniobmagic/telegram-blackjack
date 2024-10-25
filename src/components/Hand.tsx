import React from 'react';
import { Card } from './Card';

interface HandProps {
  cards: string[];
  hidden?: boolean;
  label: string;
  score?: number;
}

export function Hand({ cards, hidden = false, label, score }: HandProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-semibold text-gray-300">{label} {score && `(${score})`}</div>
      <div className="flex space-x-2">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            card={card} 
            hidden={hidden && index === 0}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}