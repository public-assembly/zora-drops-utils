interface ChainIdKey {
  [key: string]: string
}

export const DROPS_SUBGRAPH_URLS: ChainIdKey = {
  1: 'https://api.thegraph.com/subgraphs/name/iainnash/zora-drops-mainnet',
  5: 'https://api.thegraph.com/subgraphs/name/iainnash/erc721drop-goerli',
}

export const returnDropEndpoint = (
  /**
   * Expects ID of chain
   * Currently Supports:
   * - Mainnet: 1
   * - Goerli: 5
   * @default: 1
   */
  chainId?: string
) => DROPS_SUBGRAPH_URLS[chainId || 1]
