import { GraphQLClient } from 'graphql-request'
import { returnDropEndpoint, ChainIds } from '../constants'

export async function dropsFetcher(
  chainId: ChainIds,
  collectionAddress: string,
  query: any
) {
  const variables = {
    collectionAddress: collectionAddress.toLowerCase(),
  }

  const endpoint = returnDropEndpoint(chainId)
  const client = new GraphQLClient(endpoint, { headers: {} })

  const data = await client.request(query, variables).then((data) => data?.erc721Drop)

  return data
}
