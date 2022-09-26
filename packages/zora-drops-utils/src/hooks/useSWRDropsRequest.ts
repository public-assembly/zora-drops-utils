import useSWR from 'swr'
import { EDITION_QUERY, dropsFetcher } from '../data'
import { DropsRequestProps } from '../typings'

export function useSWRDropsRequest({
  contractAddress,
  networkId = '1',
}: DropsRequestProps) {
  const { data, error } = useSWR(
    [networkId, contractAddress, EDITION_QUERY],
    dropsFetcher,
    {
      errorRetryCount: 1,
    }
  )

  return {
    data: data,
    error: error,
  }
}
