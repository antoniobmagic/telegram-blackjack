export const AVALANCHE_FUJI_CONFIG = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'fuji',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
    default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
  testnet: true,
};

export const GAME_CONFIG = {
  INITIAL_CHIPS: 1000,
  MIN_BET: 10,
  MAX_BET: 100,
  DAILY_BONUS: 100,
  BONUS_COOLDOWN_HOURS: 24,
} as const;