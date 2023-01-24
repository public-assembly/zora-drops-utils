import React, { createContext, ReactNode, useMemo } from 'react'
import { Chain } from 'wagmi'

interface WagmiChainContextValue {
  chains: Chain[]
  initialChainId?: number
}

const WagmiChainContext = createContext<WagmiChainContextValue>({
  chains: [],
})

interface WagmiProviderProps {
  chains: Chain[]
  initialChain?: Chain | number
  children: ReactNode
}

export function WagmiChainProvider({
  chains,
  children,
  initialChain,
}: WagmiProviderProps) {
  return (
    <WagmiChainContext.Provider
      value={useMemo(
        () => ({
          chains: chains,
          initialChainId:
            typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }),
        [chains, initialChain]
      )}>
      {children}
    </WagmiChainContext.Provider>
  )
}
