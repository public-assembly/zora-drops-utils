import { Networks } from './dropsContractTypes'

export type DropsRequestProps = {
  contractAddress: string
  networkId?: Networks
}

export type DropsArrayRequestProps = {
  contractAddresses: string[]
  networkId?: Networks
}
