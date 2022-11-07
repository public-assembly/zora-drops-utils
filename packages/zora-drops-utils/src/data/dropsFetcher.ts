import { GraphQLClient } from 'graphql-request'
import { returnDropEndpoint } from '../constants'
import { Networks } from '../typings'
import { DROPS_QUERY } from './dropsQuery'
import { decodeContractUri } from '../lib/decodeContractURI'

export async function dropsFetcher(
  chainId: Networks,
  collectionAddress: string,
  ipfsGateway?: string
) {
  const variables = {
    collectionAddress: collectionAddress.toLowerCase(),
  }

  const endpoint = returnDropEndpoint(chainId)
  const client = new GraphQLClient(endpoint, { headers: {} })

  const data = await client
    .request(DROPS_QUERY, variables)
    .then((data) => data?.erc721Drop)
  const contractURI = data?.contractURI
    ? await decodeContractUri(data?.contractURI, ipfsGateway)
    : null

  return {
    ...data,
    contractURI: contractURI ? contractURI : null,
  }
}
