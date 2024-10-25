import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Hand } from '../components/Hand';
import { GameControls } from '../components/GameControls';
import { BettingControls } from '../components/BettingControls';
import { StatsDisplay } from '../components/StatsDisplay';
import { calculateHandValue, createDeck } from '../lib/utils';
import { AlertTriangle, Wallet } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';

export function Game() {
  const { 
    address,
    chips, 
    bet, 
    gameStatus,
    setAddress,
    setBet, 
    setChips, 
    resetGame,
    incrementGamesPlayed,
    incrementGamesWon 
  } = useGameStore();
  
  const [betAmount, setBetAmount] = useState(10);
  const [deck, setDeck] = useState<string[]>([]);
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState<string>('');
  const [isDealing, setIsDealing] = useState(false);

  const { address: wagmiAddress } = useAccount();
  const { connect } = useConnect();

  useEffect(() => {
    if (wagmiAddress && !address) {
      setAddress(wagmiAddress);
    }
  }, [wagmiAddress, address]);

  useEffect(() => {
    if (gameStatus === 'playing' && playerHand.length === 0) {
      startNewGame();
    }
  }, [gameStatus]);

  const startNewGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck[0], newDeck[1]]);
    setDealerHand([newDeck[2], newDeck[3]]);
    setGameResult('');
    setIsDealing(false);
    incrementGamesPlayed();
  };

  const placeBet = () => {
    if (betAmount <= chips) {
      setBet(betAmount);
      setChips(chips - betAmount);
    }
  };

  const hit = () => {
    if (isDealing) return;
    setIsDealing(true);
    const newCard = deck[playerHand.length + dealerHand.length];
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);

    if (calculateHandValue(newHand) > 21) {
      endGame('bust');
    } else {
      setIsDealing(false);
    }
  };

  const stand = async () => {
    if (isDealing) return;
    setIsDealing(true);
    let currentDealerHand = [...dealerHand];
    let currentIndex = playerHand.length + dealerHand.length;

    while (calculateHandValue(currentDealerHand) < 17) {
      currentDealerHand = [...currentDealerHand, deck[currentIndex]];
      currentIndex++;
      await new Promise(resolve => setTimeout(resolve, 500));
      setDealerHand(currentDealerHand);
    }

    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(currentDealerHand);

    if (dealerValue > 21) {
      endGame('dealer_bust');
    } else if (dealerValue > playerValue) {
      endGame('dealer_wins');
    } else if (dealerValue < playerValue) {
      endGame('player_wins');
    } else {
      endGame('push');
    }
  };

  const endGame = (result: string) => {
    setGameResult(result);
    setIsDealing(false);
    
    if (result === 'player_wins' || result === 'dealer_bust') {
      setChips(chips + bet * 2);
      incrementGamesWon();
    } else if (result === 'push') {
      setChips(chips + bet);
    }
  };

  if (gameStatus === 'connecting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
        <h1 className="text-2xl font-bold text-center">Welcome to Avalanche Blackjack</h1>
        <button
          onClick={() => connect()}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <StatsDisplay />

      <div className="w-full max-w-4xl bg-gray-800 rounded-xl p-8">
        {gameStatus === 'betting' ? (
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-2xl font-bold">Place Your Bet</h2>
            <BettingControls
              chips={chips}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              onPlaceBet={placeBet}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-12">
            <Hand 
              cards={dealerHand} 
              hidden={!gameResult} 
              label="Dealer" 
              score={gameResult ? calculateHandValue(dealerHand) : undefined}
            />
            
            <div className="flex flex-col items-center space-y-4">
              {gameResult && (
                <div className={`text-xl font-bold ${
                  gameResult.includes('win') ? 'text-emerald-500' : 
                  gameResult === 'push' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {getResultMessage(gameResult, bet)}
                </div>
              )}
              
              <GameControls
                onHit={hit}
                onStand={stand}
                gameEnded={!!gameResult}
                onNewGame={() => {
                  resetGame();
                  setPlayerHand([]);
                  setDealerHand([]);
                }}
              />
            </div>

            <Hand 
              cards={playerHand} 
              label="Your Hand" 
              score={calculateHandValue(playerHand)}
            />
          </div>
        )}
      </div>

      {chips < 10 && (
        <div className="flex items-center space-x-2 text-yellow-500 bg-yellow-900/50 px-4 py-2 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          <span>Running low on chips! The house will give you more chips if you go broke.</span>
        </div>
      )}
    </div>
  );
}

function getResultMessage(result: string, bet: number): string {
  switch (result) {
    case 'player_wins':
      return `You win ${bet} chips!`;
    case 'dealer_wins':
      return `Dealer wins! You lose ${bet} chips`;
    case 'bust':
      return `Bust! You lose ${bet} chips`;
    case 'dealer_bust':
      return `Dealer busts! You win ${bet} chips!`;
    case 'push':
      return 'Push! Bet returned.';
    default:
      return '';
  }
}