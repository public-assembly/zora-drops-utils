import useSWR from 'swr'
import { dropsArrayFetcher } from '../data'
import { DropsArrayRequestProps } from '../typings/requestTypes'

export function useSWRDropsArray({
  contractAddresses,
  networkId = '1',
  refreshInterval = 2000,
}: {
  refreshInterval?: number
} & DropsArrayRequestProps) {
  /* Todo: add invalid address in list check? */
  const { data, error, isValidating } = useSWR(
    [{ contractAddresses, networkId }],
    dropsArrayFetcher,
    {
      errorRetryCount: 1,
      refreshInterval: refreshInterval,
    }
  )

  return {
    data,
    error,
    isLoading: !error && !data,
    isValidating,
  }
}
