import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTelegramUser } from '../lib/telegram';
import { initializePlayer } from '../lib/firebase';
import { INITIAL_CHIPS, isDevelopment } from '../lib/config';

interface GameState {
  address: string | null;
  chips: number;
  bet: number;
  highestChips: number;
  gamesPlayed: number;
  gamesWon: number;
  gameStatus: 'connecting' | 'betting' | 'playing' | 'finished';
  setAddress: (address: string) => Promise<void>;
  setBet: (amount: number) => void;
  setChips: (amount: number) => void;
  incrementGamesPlayed: () => void;
  incrementGamesWon: () => void;
  resetGame: () => void;
  resetStats: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      address: null,
      chips: INITIAL_CHIPS,
      bet: 0,
      highestChips: INITIAL_CHIPS,
      gamesPlayed: 0,
      gamesWon: 0,
      gameStatus: 'connecting',
      setAddress: async (address: string) => {
        const telegramUser = getTelegramUser();
        if (telegramUser && !isDevelopment) {
          const isNewPlayer = await initializePlayer(address, telegramUser.id.toString());
          if (isNewPlayer) {
            set({ chips: INITIAL_CHIPS, highestChips: INITIAL_CHIPS });
          }
        } else {
          // In development, always start with initial chips
          set({ chips: INITIAL_CHIPS, highestChips: INITIAL_CHIPS });
        }
        set({ address, gameStatus: 'betting' });
      },
      setBet: (amount) => set({ bet: amount, gameStatus: 'playing' }),
      setChips: (amount) => set((state) => ({ 
        chips: amount,
        highestChips: Math.max(amount, state.highestChips)
      })),
      incrementGamesPlayed: () => set((state) => ({ 
        gamesPlayed: state.gamesPlayed + 1 
      })),
      incrementGamesWon: () => set((state) => ({ 
        gamesWon: state.gamesWon + 1 
      })),
      resetGame: () => set({ bet: 0, gameStatus: 'betting' }),
      resetStats: () => set({ 
        chips: INITIAL_CHIPS, 
        highestChips: INITIAL_CHIPS, 
        gamesPlayed: 0, 
        gamesWon: 0 
      })
    }),
    {
      name: 'avalanche-blackjack-storage'
    }
  )
);