import useSWR from 'swr'
import { dropsFetcher } from '../data'
import { DropsRequestProps } from '../typings'
import { useValidAddress } from './useValidAddress'

export function useSWRDrop({
  contractAddress,
  networkId = '1',
  refreshInterval = 2000,
  ipfsGateway,
}: {
  refreshInterval?: number
  ipfsGateway?: string
} & DropsRequestProps) {
  const isValidAddress = useValidAddress(contractAddress)

  const { data, error, isValidating } = useSWR(
    [networkId, contractAddress, ipfsGateway],
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
  }
}
