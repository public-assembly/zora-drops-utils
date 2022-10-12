import { ChainIds } from '../constants'

export type DropsRequestProps = {
  contractAddress: string
  networkId?: ChainIds
}

export type DropsArrayRequestProps = {
  contractAddresses: string[]
  networkId?: ChainIds
}

export type DropsQueryReturn = {
  address?: string
  creator?: string
  editionMetadata?: {
    imageURI?: string
    animationURI?: string
    contractURI?: string
    description?: string
  }
  maxSupply?: string
  name?: string
  owner?: string
  salesConfig?: {
    maxSalePurchasePerAddress?: string
    publicSalePrice?: string
    publicSaleStart?: string
    publicSaleEnd?: string
  }
  symbol?: string
  totalMinted?: string
}
