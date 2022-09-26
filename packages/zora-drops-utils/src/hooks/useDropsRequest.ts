import React from 'react'
import { dropsRequests } from '../data/fetchDropsQueries'
import { ChainIds } from '../constants'

export type DropsRequestProps = {
  contractAddress: string
  networkId: ChainIds
}

export function useDropsRequest({ contractAddress, networkId = '1' }: DropsRequestProps) {
  const [data, setData] = React.useState<any>(undefined)

  React.useMemo(async () => {
    setData(undefined)
    await dropsRequests(networkId, contractAddress)
      .then((res) => {
        setData(res)
      })
      .catch((error) => console.error(error))
  }, [contractAddress])

  return {
    data: data,
  }
}
