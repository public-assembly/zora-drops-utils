import useSWR from 'swr'
import { EDITION_QUERY, dropsFetcher } from '../data'
import { DropsRequestProps, DropsQueryReturn } from '../typings/requestTypes'
import { useValidAddress } from './useValidAddress'

export function useSWRDrop({
  contractAddress,
  networkId = '1',
  refreshInterval = 2000,
}: {
  refreshInterval?: number
} & DropsRequestProps) {
  const isValidAddress = useValidAddress(contractAddress)

  const { data, error, isValidating } = useSWR(
    [networkId, contractAddress, EDITION_QUERY],
    dropsFetcher,
    {
      isPaused: () => !isValidAddress,
      refreshInterval: refreshInterval,
      errorRetryCount: 1,
    }
  )

  return {
    data,
    error,
    isLoading: !error && !data,
    isValidating,
    isValidAddress,
  } as {
    data: DropsQueryReturn
    error: any
    isLoading: boolean
    isValidating: boolean
    isValidAddress: boolean
  }
}
