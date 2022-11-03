import { GraphQLClient } from 'graphql-request'
import { returnDropEndpoint } from '../constants'
import { Networks } from '../typings'
import { addIPFSGateway } from '../lib'

export async function decodeContractUri(contractURI?: string) {
  const url = contractURI ? addIPFSGateway(contractURI) : undefined
  try {
    const contractURIData = await fetch(url)
      .then((res) => res.text())
      .then((t) => {
        try {
          return JSON.parse(t.replace(/\\n/g, ' '))
        } catch (e) {
          return undefined
        }
      })
    return contractURIData
  } catch (err) {
    console.error(err)
  }
}

export async function dropsFetcher(
  chainId: Networks,
  collectionAddress: string,
  query: any
) {
  const variables = {
    collectionAddress: collectionAddress.toLowerCase(),
  }

  const endpoint = returnDropEndpoint(chainId)
  const client = new GraphQLClient(endpoint, { headers: {} })

  const data = await client.request(query, variables).then((data) => data?.erc721Drop)
  const contractURI = await decodeContractUri(data?.contractURI)

  return {
    ...data,
    contractURI: contractURI,
  }
}
