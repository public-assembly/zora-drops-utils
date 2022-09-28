import React from 'react'
import { dropsArrayFetcher } from '../data'
import { DropsArrayRequestProps } from '../typings/requestTypes'

export function useDropsArray({
  contractAddresses,
  networkId = '1',
}: DropsArrayRequestProps) {
  const [data, setData] = React.useState<any>(undefined)
  const [error, setError] = React.useState<any>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setData(undefined)
    setIsLoading(true)

    async function getDropsArray() {
      await dropsArrayFetcher({
        contractAddresses: contractAddresses,
        networkId: networkId,
      })
        .then((res) => {
          setData(res)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
          console.error(error)
        })
    }
    getDropsArray()
  }, [contractAddresses])

  return {
    data: data,
    error: error,
    isLoading,
  }
}
