import React from 'react'
import { dropsRequests } from '../data/fetchDropsQueries'
import { ChainIds } from '../constants'

export type DropsRequestProps = {
  contractAddress: string
  networkId: ChainIds
}

export function useDropsRequest({ contractAddress, networkId = '1' }: DropsRequestProps) {
  const [data, setData] = React.useState<any>(undefined)
  const [error, setError] = React.useState<any>(undefined)

  React.useEffect(() => {
    setData(undefined)

    async function getDropsData() {
      await dropsRequests(networkId, contractAddress)
        .then((res) => {
          setData(res)
        })
        .catch((error) => {
          setError(error)
          console.error(error)
        })
    }

    getDropsData()
  }, [contractAddress])

  return {
    data: data,
    error: error,
  }
}
