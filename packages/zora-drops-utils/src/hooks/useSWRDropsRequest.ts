import useSWR from 'swr'
import { EDITION_QUERY, dropsFetcher } from '../data'
import { DropsRequestProps } from '../typings'
import { useValidAddress } from './useValidAddress'

export function useSWRDropsRequest({
  contractAddress,
  networkId = '1',
}: DropsRequestProps) {
  const isValidAddress = useValidAddress(contractAddress)

  const { data, error, isValidating } = useSWR(
    [networkId, contractAddress, EDITION_QUERY],
    dropsFetcher,
    {
      isPaused: () => !isValidAddress,
      errorRetryCount: 1,
    }
  )

  return {
    data,
    error,
    isLoading: !error && !data,
    isValidating,
    isValidAddress,
  }
}
