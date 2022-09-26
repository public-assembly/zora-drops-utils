import { GraphQLClient } from 'graphql-request'
import { EDITION_QUERY } from './dropsQuery'
import { returnDropEndpoint, ChainIds } from '../constants'

export async function dropsRequests(chainId: ChainIds, collectionAddress: string) {
  const variables = {
    collectionAddress: collectionAddress,
  }

  const endpoint = returnDropEndpoint(chainId)
  const client = new GraphQLClient(endpoint, { headers: {} })

  const data = await client
    .request(EDITION_QUERY, variables)
    .then((data) => data?.erc721Drop)

  return data
}
