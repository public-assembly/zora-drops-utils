import { configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { AVAILABLE_CHAINS } from './chains'

// Configure wagmi
export const { chains, provider, webSocketProvider } = configureChains(AVAILABLE_CHAINS, [
  jsonRpcProvider({
    priority: 0,
    rpc: (chain) =>
      chain.id === 1
        ? { http: 'https://rpc.ankr.com/eth' }
        : { http: 'https://rpc.ankr.com/eth_goerli' },
  }),
  publicProvider({ priority: 1 }),
])

// Configure connectors
/*
const { connectors } = getDefaultWallets({
  appName: 'NextDapp',
  chains,
})
*/

// Create wagmi client
export const client = createClient({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  autoConnect: true,
  provider,
  webSocketProvider,
})
