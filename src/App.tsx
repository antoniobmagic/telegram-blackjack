import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { Game } from './pages/Game';
import { initTelegram } from './lib/telegram';
import { AVALANCHE_FUJI_CONFIG } from './lib/config';

const config = createConfig({
  chains: [{
    ...AVALANCHE_FUJI_CONFIG,
    id: AVALANCHE_FUJI_CONFIG.chainId,
  }],
  transports: {
    [AVALANCHE_FUJI_CONFIG.chainId]: http(AVALANCHE_FUJI_CONFIG.rpcUrls[0]),
  },
});

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-900 text-white">
          <Game />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;