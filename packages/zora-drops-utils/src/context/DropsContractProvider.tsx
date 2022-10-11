import React from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
} from 'wagmi'
import zoraDropsABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json'
import { ethers } from 'ethers'
import { useSWRDrop } from '../hooks'
import { dateFormat } from '../constants'

const DEFAULT_MINT_QUANTITY = {
  name: '1',
  queryValue: 1,
}

export type DropsContractProps = {
  children?: React.ReactNode
  collectionAddress?: string
  networkId?: '1' | '5'
  onSuccessCallback?: () => void
}

export type DropsContractReturnTypes = {
  purchase?: () => void
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
    startDate?: {
      iso?: Date | string
      unixtime?: number | string
      pretty?: string
    }
    endDate?: {
      iso?: Date | string
      unixtime?: number | string
      pretty?: string
    }
  }
}

const DropsContractContext = React.createContext<DropsContractReturnTypes>({
  purchase: () => {},
  transaction: {
    purchaseData: undefined,
    purchaseLoading: false,
    purchaseSuccess: false,
    txHash: undefined,
  },
  setMintQuantity: undefined,
  collectionData: undefined,
  collectionAddress: undefined,
  networkId: '1',
  totalPrice: undefined,
  mintQuantity: DEFAULT_MINT_QUANTITY,
  errors: {
    unpredictableGasLimit: false,
    insufficientFunds: false,
  },
  purchaseLimit: {
    maxAmount: undefined,
    pastAmount: undefined,
    prettyMaxAmount: undefined,
  },
  inventory: {
    totalSupply: undefined,
    totalSold: undefined,
    prettyInventory: undefined,
  },
  balance: {
    walletLimit: false,
    walletBalance: undefined,
  },
  mintStatus: {
    text: undefined,
    isEnded: undefined,
    isActive: undefined,
    startDate: {
      iso: undefined,
      unixtime: undefined,
      pretty: undefined,
    },
    endDate: {
      iso: undefined,
      unixtime: undefined,
      pretty: undefined,
    },
  },
})

export function useDropsContractProvider() {
  return React.useContext(DropsContractContext)
}

export function DropsContractProvider({
  children,
  collectionAddress,
  networkId = '1',
  onSuccessCallback = () => {},
}: DropsContractProps) {
  const { data: collectionData } = useSWRDrop({
    contractAddress: collectionAddress,
    networkId: networkId,
  })

  const [mintQuantity, setMintQuantity] = React.useState(DEFAULT_MINT_QUANTITY)

  const handleUpdateMintQuantity = React.useCallback(
    (event: any) => {
      setMintQuantity({
        name: event?.target?.value,
        queryValue: parseInt(event?.target?.value),
      })
    },
    [mintQuantity, setMintQuantity]
  )

  const totalPurchasePrice = React.useMemo(() => {
    try {
      const publicSalePriceNumber = Number(collectionData?.salesConfig?.publicSalePrice)
      const total = String(mintQuantity.queryValue * publicSalePriceNumber)
      return total
    } catch (err) {
      console.error(err)
    }
  }, [collectionData, collectionData?.salesConfig?.publicSalePrice, mintQuantity])

  const { address } = useAccount()

  const { data: balanceOf } = useContractRead({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  const { config, error } = usePrepareContractWrite({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'purchase',
    args: [mintQuantity.queryValue],
    overrides: {
      value: totalPurchasePrice,
    },
  })

  const insufficientFunds = React.useMemo(() => {
    if (error) {
      /* @ts-ignore */
      return error.code === 'INSUFFICIENT_FUNDS'
    }
  }, [error])

  const unpredictableGasLimit = React.useMemo(() => {
    if (error) {
      /* @ts-ignore */
      return error.code === 'UNPREDICTABLE_GAS_LIMIT'
    }
  }, [error])

  const purchaseLimit = React.useMemo(() => {
    const maxPerAddress = collectionData?.salesConfig?.maxSalePurchasePerAddress || 1
    return {
      maxAmount: maxPerAddress,
      pastAmount: mintQuantity.queryValue > Number(maxPerAddress),
      prettyMaxAmount: maxPerAddress === '4294967295' ? '∞' : maxPerAddress,
    }
  }, [collectionData, mintQuantity])

  const inventory = React.useMemo(() => {
    return {
      totalSupply: collectionData?.maxSupply,
      totalSold: collectionData?.totalMinted,
      prettyInventory: `${collectionData?.totalMinted} / ${
        collectionData?.maxSupply === '18446744073709551615'
          ? '∞'
          : collectionData?.maxSupply
      }`,
    }
  }, [collectionData, mintQuantity])

  const balance = React.useMemo(() => {
    try {
      return {
        walletLimit: balanceOf >= purchaseLimit?.maxAmount,
        walletBalance: balanceOf && balanceOf.toString(),
      }
    } catch (err) {
      console.error(err)
    }
  }, [purchaseLimit, balanceOf])

  const prettyPurchasePrice = React.useMemo(() => {
    try {
      return totalPurchasePrice ? ethers.utils.formatUnits(totalPurchasePrice) : ''
    } catch (err) {
      console.error(err)
    }
  }, [totalPurchasePrice])

  const {
    write: purchase,
    data: purchaseData,
    isLoading: purchaseLoading,
    isSuccess: purchaseSuccess,
  } = useContractWrite({
    ...config,
    onSuccess() {
      ;() => onSuccessCallback()
    },
  })

  const startDate = React.useMemo(() => {
    if (collectionData?.salesConfig?.publicSaleStart) {
      const isoDate = new Date(
        Number(collectionData?.salesConfig?.publicSaleStart) * 1000
      )
      return {
        iso: isoDate,
        unixTime: collectionData?.salesConfig?.publicSaleStart,
        pretty: `${isoDate.toLocaleString(...dateFormat)}`,
      }
    }
  }, [collectionData?.salesConfig?.publicSaleStart])

  const endDate = React.useMemo(() => {
    if (collectionData?.salesConfig?.publicSaleEnd) {
      const isoDate = new Date(Number(collectionData?.salesConfig?.publicSaleEnd) * 1000)
      const formattedEndDate = `${isoDate.toLocaleString(...dateFormat)}`
      return {
        iso: isoDate,
        unixTime: collectionData?.salesConfig?.publicSaleEnd,
        pretty: formattedEndDate !== 'Invalid Date' ? formattedEndDate : undefined,
      }
    }
  }, [collectionData?.salesConfig?.publicSaleEnd])

  const isEnded = React.useMemo(() => {
    const end = collectionData?.salesConfig?.publicSaleEnd
    if (end) return Number(end) < Date.now()
  }, [collectionData?.salesConfig?.publicSaleEnd])

  const isActive = React.useMemo(() => {
    const start = collectionData?.salesConfig?.publicSaleStart
    if (start) return Number(start) <= Date.now()
  }, [
    collectionData?.salesConfig?.publicSaleEnd,
    collectionData?.salesConfig?.publicSaleStart,
    isEnded,
  ])

  return (
    <DropsContractContext.Provider
      value={{
        collectionData,
        purchase,
        transaction: {
          purchaseData,
          purchaseLoading,
          purchaseSuccess,
          txHash: purchaseData && purchaseData?.hash,
        },
        mintQuantity,
        setMintQuantity: handleUpdateMintQuantity,
        totalPrice: {
          raw: totalPurchasePrice,
          pretty: prettyPurchasePrice,
        },
        collectionAddress: collectionAddress,
        networkId: networkId,
        errors: {
          insufficientFunds: insufficientFunds,
          unpredictableGasLimit: unpredictableGasLimit,
        },
        purchaseLimit,
        inventory,
        balance,
        mintStatus: {
          text: undefined,
          isEnded: isEnded,
          isActive: isActive,
          startDate: startDate,
          endDate: endDate,
        },
      }}>
      {children}
    </DropsContractContext.Provider>
  )
}
