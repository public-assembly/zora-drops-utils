import { ChainIds } from '../constants'

export type DropsRequestProps = {
  contractAddress: string
  networkId?: ChainIds
}

export type DropsArrayRequestProps = {
  contractAddresses: string[]
  networkId?: ChainIds
}
