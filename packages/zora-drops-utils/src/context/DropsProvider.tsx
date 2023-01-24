import * as React from 'react'
import { createContext, useContext } from 'react'
import { WagmiChainProvider } from './WagmiChainContext'
import { Chain } from 'wagmi'

export type DropsProps = {
  children?: React.ReactNode
  collectionAddress: string
  chains: Chain[]
  initialChain?: Chain | number
}

export type DropsReturnTypes = {
  stringProp?: string
  functionProp?: () => void
  booleanProp?: boolean
}

const DropsContext = createContext<DropsReturnTypes>({
  stringProp: '',
  functionProp: () => {},
  booleanProp: false,
})

export function useDropsProvider() {
  return useContext(DropsContext)
}

export function DropsProvider({
  chains,
  initialChain,
  collectionAddress,
  children,
}: DropsProps) {
  return (
    <WagmiChainProvider chains={chains} initialChain={initialChain}>
      <DropsContext.Provider
        value={{
          stringProp: '',
          functionProp: () => {},
          booleanProp: false,
        }}>
        {children}
      </DropsContext.Provider>
    </WagmiChainProvider>
  )
}
