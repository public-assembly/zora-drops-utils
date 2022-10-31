export type DropsContractProps = {
  children?: React.ReactNode
  collectionAddress?: string
  networkId?: '1' | '5'
  onSuccessCallback?: () => void
  onMintCallback?: () => void
}

export type SaleDate = {
  iso?: Date | string
  unixtime?: number | string
  pretty?: string
}

export type DropsContractReturnTypes = {
  purchase?: () => void
  onMintCallback: () => void
  setMintQuantity?: React.ChangeEventHandler<HTMLInputElement>
  collectionData?: any
  collectionAddress?: string
  networkId?: '1' | '5'
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
    walletBalance: number | string
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
}
