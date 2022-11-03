import type { ContractTransaction } from 'ethers'

export type Networks = '1' | '5'

export interface DropsContractProps {
  children?: React.ReactNode
  /**
   * @default: undefined
   * Currently supports Zora's ERC721 Drops contracts both Editions & Drops style metadata
   */
  collectionAddress?: string
  /**
   * @default: '1'
   * Goerli and Mainnet Ethereum networks supported
   */
  networkId?: Networks
  /**
   * @default: undefined
   * Pass in a custom ipfs gateway to override https://ipfs.io/
   * Expects the gateway uri ie. mygateway.mypinata.cloud
   */
  ipfsGateway?: string
}

export interface DropsContractProviderProps extends DropsContractProps {
  /**
   * Function prop for successful mint
   */
  onSuccessCallback?: () => void
  /**
   * Function prop for mint button onClick event
   */
  onMintCallback?: () => void
}

export type SaleDate = {
  iso?: Date | string
  unixtime?: number | string
  pretty?: string
}

export interface AllowListEntry {
  maxCanMint: string
  user: string
  price: string
  proof: string[]
}

export interface DropsContractReturnTypes {
  purchase: () => Promise<ContractTransaction | undefined>
  purchasePresale: (
    quantity: number,
    allowlistEntry?: AllowListEntry
  ) => Promise<ContractTransaction | undefined>
  onMintCallback: () => void
  setMintQuantity?: React.ChangeEventHandler<HTMLInputElement>
  collectionData?: any
  collectionAddress?: string
  networkId?: Networks
  ipfsGateway?: string
  transaction?: {
    purchaseData: any
    purchaseLoading: boolean
    purchaseSuccess: boolean
    txHash?: string
  }
  totalPrice?: {
    raw: string | number
    pretty: string | number
  }
  mintQuantity?: {
    name: string
    queryValue: number
  }
  errors: {
    unpredictableGasLimit: boolean
    insufficientFunds: boolean
  }
  purchaseLimit?: {
    maxAmount?: number
    pastAmount?: boolean
    prettyMaxAmount?: number | string
  }
  inventory?: {
    totalSupply?: number
    totalSold?: number
    prettyInventory?: string
  }
  balance?: {
    walletLimit: boolean
    walletBalance: number
  }
  mintStatus?: {
    text?: string
    isEnded?: boolean
    isActive?: boolean
    startDate?: SaleDate
    endDate?: SaleDate
    preSale?: {
      presaleStart?: SaleDate
      presaleEnd?: SaleDate
      presaleMerkleRoot?: string
    }
  }
  saleStatus?: {
    startDate?: number
    endDate?: number
    startDateFull?: SaleDate
    endDateFull?: SaleDate
    presaleStartDateFull?: SaleDate
    presaleEndDateFull?: SaleDate
    isSoldOut?: boolean
    saleIsActive?: boolean
    saleNotStarted?: boolean
    saleIsFinished?: boolean
    merkleRootExists?: boolean
    presaleExists?: boolean
    publicSaleExists?: boolean
    presaleIsActive?: boolean
    presaleMerkleRoot?: string
  }
  allowList?: {
    allowlistEntry?: AllowListEntry
    accessAllowed?: boolean
  }
}
