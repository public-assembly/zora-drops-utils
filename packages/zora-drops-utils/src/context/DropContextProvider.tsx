import React from 'react'
import { DropsRequestProps } from '../typings'
import { useSWRDrop } from '../hooks'

export type DropContextProps = {
  children?: React.ReactNode
}

export type DropContextReturnTypes = {
  contractAddress?: string
  data?: any /* DAIN TODO - spec data return typings */
  error?: any
  isLoading?: boolean
  isValidAddress?: boolean
}

const DropContext = React.createContext<DropContextReturnTypes>({
  contractAddress: undefined,
  data: null,
  error: undefined,
  isLoading: undefined,
  isValidAddress: undefined,
})

export function useDropContextProvider() {
  return React.useContext(DropContext)
}

export function DropContextProvider({
  children,
  contractAddress,
  networkId = '1',
  refreshInterval = 2000,
}: {
  refreshInterval?: number
} & DropContextProps &
  DropsRequestProps) {
  const { data, error, isLoading, isValidAddress } = useSWRDrop({
    contractAddress: contractAddress,
    networkId: networkId,
    refreshInterval: refreshInterval,
  })

  return (
    <DropContext.Provider
      value={{
        contractAddress,
        data,
        error,
        isLoading,
        isValidAddress,
      }}>
      {children}
    </DropContext.Provider>
  )
}
