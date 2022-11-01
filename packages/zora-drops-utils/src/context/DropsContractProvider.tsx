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
import { DropsContractReturnTypes, DropsContractProps } from './../typings'
import { useSaleStatus } from '../hooks/useSaleStatus'
import { useAllowlistEntry } from '../hooks/useAllowlistEntry'

const DEFAULT_MINT_QUANTITY = {
  name: '1',
  queryValue: 1,
}

const DropsContractContext = React.createContext<DropsContractReturnTypes>({
  purchase: () => {},
  purchasePresale: () => {},
  onMintCallback: () => {},
  setMintQuantity: () => {},
  mintQuantity: DEFAULT_MINT_QUANTITY,
  transaction: {
    purchaseData: undefined,
    purchaseLoading: false,
    purchaseSuccess: false,
    txHash: undefined,
  },
  errors: {
    unpredictableGasLimit: false,
    insufficientFunds: false,
  },
  networkId: '1',
  collectionAddress: undefined,
  collectionData: undefined,
  totalPrice: undefined,
  /* Sales Data */
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
  saleStatus: undefined,
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
    preSale: {
      presaleStart: {
        iso: undefined,
        unixtime: undefined,
        pretty: undefined,
      },
      presaleEnd: {
        iso: undefined,
        unixtime: undefined,
        pretty: undefined,
      },
      presaleMerkleRoot: undefined,
    },
  },
} as DropsContractReturnTypes)

export function useDropsContractProvider() {
  return React.useContext(DropsContractContext)
}

export function DropsContractProvider({
  children,
  collectionAddress,
  networkId = '1',
  onSuccessCallback = () => {},
  onMintCallback = () => {},
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

  const saleStatus = useSaleStatus({ collectionData: collectionData })

  const { data: balanceOf } = useContractRead({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  /* PublicSale Purchase */
  const { config, error } = usePrepareContractWrite({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'purchase',
    args: [mintQuantity.queryValue],
    overrides: {
      value: totalPurchasePrice,
    },
  })

  const {
    write: purchase,
    data: purchaseData,
    isLoading: purchaseLoading,
    isSuccess: purchaseSuccess,
  } = useContractWrite({
    ...config,
    onSuccess() {
      onSuccessCallback()
    },
  })

  /* PreSale Purchase */
  const { allowlistEntry } = useAllowlistEntry({
    merkleRoot: saleStatus?.presaleMerkleRoot,
    address: address,
  })

  const {
    config: presalePurchaseConfig,
    // error: presalePurchaseError
  } = usePrepareContractWrite({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'purchasePresale',
    args: [
      mintQuantity.queryValue,
      allowlistEntry?.maxCanMint,
      allowlistEntry?.price,
      allowlistEntry?.proof[0],
    ],
    overrides: {
      value: totalPurchasePrice,
    },
  })

  const {
    write: purchasePresale,
    /*
    data: presalePurchaseData,
    isLoading: presalePurchaseLoading,
    isSuccess: presalePurchaseSuccess,
    */
  } = useContractWrite({
    ...presalePurchaseConfig,
    onSuccess() {
      onSuccessCallback()
    },
  })

  /* Checks */
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
      value={
        {
          collectionData,
          onMintCallback: onMintCallback,
          purchase,
          purchasePresale,
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
          saleStatus: saleStatus,
        } as DropsContractReturnTypes
      }>
      {children}
    </DropsContractContext.Provider>
  )
}
