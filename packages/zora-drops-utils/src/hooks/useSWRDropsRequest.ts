import useSWR from 'swr'
import React from 'react'
import { EDITION_QUERY, dropsFetcher } from '../data'
import { DropsRequestProps } from '../typings'
import { useValidAddress } from './useValidAddress'

export function useSWRDropsRequest({
  contractAddress,
  networkId = '1',
}: DropsRequestProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const isValidAddress = useValidAddress(contractAddress)

  const { data, error, isValidating } = useSWR(
    [networkId, contractAddress, EDITION_QUERY],
    dropsFetcher,
    {
      isPaused: () => !isValidAddress,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
      errorRetryCount: 1,
    }
  )

  React.useEffect(() => {
    if (isValidating) setIsLoading(true)
  }, [isValidating])

  return {
    data,
    error,
    isLoading,
    isValidAddress,
  }
}
