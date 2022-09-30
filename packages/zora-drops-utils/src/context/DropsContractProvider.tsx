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

const DEFAULT_MINT_QUANTITY = {
  name: '1',
  queryValue: 1,
}

export type DropsContractProps = {
  children?: React.ReactNode
  collectionAddress?: string
  onSuccessCallback?: () => void
}

export type DropsContractReturnTypes = {
  purchase?: () => void
  setMintQuantity?: React.ChangeEventHandler<HTMLInputElement>
  collectionData?: any
  collectionAddress?: string
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
})

export function useDropsContractProvider() {
  return React.useContext(DropsContractContext)
}

export function DropsContractProvider({
  children,
  collectionAddress,
  onSuccessCallback = () => {},
}: DropsContractProps) {
  const { data: collectionData } = useSWRDrop({ contractAddress: collectionAddress })

  const [mintQuantity, setMintQuantity] = React.useState(DEFAULT_MINT_QUANTITY)

  const handleUpdateMintQuantity = React.useCallback(
    (event: any) => {
      setMintQuantity({
        name: event?.target?.value,
        queryValue: parseInt(event?.target?.value),
      })
      console.log(mintQuantity.queryValue)
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
      prettyInventory: `${collectionData?.totalMinted} / ${collectionData?.maxSupply}`,
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

  return (
    <DropsContractContext.Provider
      value={{
        purchase,
        transaction: {
          purchaseData,
          purchaseLoading,
          purchaseSuccess,
          txHash: purchaseData && purchaseData?.hash,
        },
        mintQuantity,
        setMintQuantity: handleUpdateMintQuantity,
        collectionData,
        totalPrice: {
          raw: totalPurchasePrice,
          pretty: prettyPurchasePrice,
        },
        collectionAddress: collectionAddress,
        errors: {
          insufficientFunds: insufficientFunds,
          unpredictableGasLimit: unpredictableGasLimit,
        },
        purchaseLimit,
        inventory,
        balance,
      }}>
      {children}
    </DropsContractContext.Provider>
  )
}
