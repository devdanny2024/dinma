import Junn from '../components/Junn';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// Define your custom theme
const myCustomTheme = {
  colors: {
    accentColor: '#3aff75',
    accentColorForeground: '#333',
    actionButtonBorder: 'none',
    actionButtonSecondaryBackground: '#222',
    closeButton: '#333',
    closeButtonBackground: '#f0f0f0',
    connectButtonBackground: '#3aff75',
    connectButtonBackgroundError: '#ff4d4f',
    connectButtonInnerBackground: '#222',
    connectButtonText: '#fff',
    connectButtonTextError: '#fff',
    modalBackground: '#000',
    modalText: '#fff',
    modalTextDim: '#aaa',
    modalTextSecondary: '#ccc',
    profileAction: '#3aff75',
    profileActionHover: '#32e066',
    selectedOptionBorder: '#3aff75',
    generalBorder: '#333',
    generalBorderDim: '#222',
  },
  fonts: {
    body: '"DM Mono", monospace',
  },
  radii: {
    connectButton: '5px',
    modal: '8px',
    actionButton: '4px',
  },
  shadows: {
    connectButton: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default function Home() {
    const config = getDefaultConfig({
      appName: 'My RainbowKit App',
      projectId: 'YOUR_PROJECT_ID',
      chains: [mainnet, polygon, optimism, arbitrum, base],
      ssr: true, // If your dApp uses server side rendering (SSR)
    });

    const queryClient = new QueryClient();

  return (
    <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme}>
        <Junn/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </>
  );
}