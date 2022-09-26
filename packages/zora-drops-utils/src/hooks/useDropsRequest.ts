import React from 'react'
import { EDITION_QUERY, dropsFetcher } from '../data'
import { DropsRequestProps } from '../typings'

export function useDropsRequest({ contractAddress, networkId = '1' }: DropsRequestProps) {
  const [data, setData] = React.useState<any>(undefined)
  const [error, setError] = React.useState<any>(undefined)

  React.useEffect(() => {
    setData(undefined)

    async function getDropsData() {
      await dropsFetcher(networkId, contractAddress, EDITION_QUERY)
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
