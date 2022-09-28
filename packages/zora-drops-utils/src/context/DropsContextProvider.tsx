import React from 'react'
import { DropsArrayRequestProps } from '../typings/requestTypes'
import { useSWRDropsArray } from '../hooks'

export type DropsContextProps = {
  children?: React.ReactNode
}

export type DropsContextReturnTypes = {
  contractAddresses?: string[]
  data?: any /* DAIN TODO - spec data return typings */
  error?: any
  isLoading?: boolean
  isValidAddress?: boolean
}

const DropsContext = React.createContext<DropsContextReturnTypes>({
  contractAddresses: undefined,
  data: null,
  error: undefined,
  isLoading: undefined,
  isValidAddress: undefined,
})

export function useDropsContextProvider() {
  return React.useContext(DropsContext)
}

export function DropsContextProvider({
  children,
  contractAddresses,
  networkId = '1',
  refreshInterval = 2000,
}: {
  refreshInterval?: number
} & DropsContextProps &
  DropsArrayRequestProps) {
  const { data, error, isLoading } = useSWRDropsArray({
    contractAddresses: contractAddresses,
    networkId: networkId,
    refreshInterval: refreshInterval,
  })

  return (
    <DropsContext.Provider
      value={{
        contractAddresses,
        data,
        error,
        isLoading,
      }}>
      {children}
    </DropsContext.Provider>
  )
}
