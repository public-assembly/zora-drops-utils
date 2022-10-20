import React from 'react'
import { DropsArrayRequestProps, DropsQueryReturn } from '../typings/requestTypes'
import { useSWRDropsArray } from '../hooks'
import { addIPFSGateway } from '../lib'

export type DropsContextProps = {
  children?: React.ReactNode
  customIpfsGateway?: string
}

export type DropsContextReturnTypes = {
  contractAddresses?: string[]
  data?: DropsQueryReturn[] | null
  parsedData?: DropsQueryReturn[] | null
  error?: any
  isLoading?: boolean
  isValidAddress?: boolean
}

const DropsContext = React.createContext<DropsContextReturnTypes>({
  contractAddresses: undefined,
  data: null,
  parsedData: null,
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
  customIpfsGateway,
}: {
  refreshInterval?: number
} & DropsContextProps &
  DropsArrayRequestProps) {
  const { data, error, isLoading } = useSWRDropsArray({
    contractAddresses: contractAddresses,
    networkId: networkId,
    refreshInterval: refreshInterval,
  })

  const parsedData = React.useMemo(() => {
    if (data) {
      try {
        const withIpfs = data.map((entry) => {
          return {
            ...entry,
            editionMetadata: {
              ...entry?.editionMetadata,
              imageURI: addIPFSGateway(
                entry?.editionMetadata?.imageURI,
                customIpfsGateway
              ),
              animationURI: addIPFSGateway(
                entry?.editionMetadata?.animationURI,
                customIpfsGateway
              ),
            },
          }
        })
        return withIpfs as DropsQueryReturn[]
      } catch (err) {
        console.error(err)
      }
    }
  }, [data])

  return (
    <DropsContext.Provider
      value={{
        contractAddresses,
        data: data,
        parsedData: parsedData,
        error,
        isLoading,
      }}>
      {children}
    </DropsContext.Provider>
  )
}
