// @ts-nocheck
import * as React from 'react'
import { BigNumber } from 'ethers'
import { useContractRead, useAccount, useSigner } from 'wagmi'
import zoraDropsABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json'
import { ERC721Drop__factory } from '../constants/typechain'
import { ethers } from 'ethers'
import { useSWRDrop } from '../hooks'
import { dateFormat } from '../constants'
import {
  DropsContractReturnTypes,
  DropsContractProviderProps,
  AllowListEntry,
} from './../typings'
import { useSaleStatus } from '../hooks/useSaleStatus'
import { useAllowlistEntry } from '../hooks/useAllowlistEntry'

const DEFAULT_MINT_QUANTITY = {
  name: '1',
  queryValue: 1,
}

const DropsContractContext = React.createContext<DropsContractReturnTypes>(
  {} as DropsContractReturnTypes
)

export function DropsContractProvider({
  children,
  collectionAddress,
  networkId = '1',
  ipfsGateway,
  refreshInterval = 10000,
  onSuccessCallback = () => {},
  onMintCallback = () => {},
}: DropsContractProviderProps) {
  const { data: collectionData } = useSWRDrop({
    contractAddress: collectionAddress,
    networkId: networkId,
    refreshInterval: refreshInterval,
    ipfsGateway: ipfsGateway,
  })
  const [error, setError] = React.useState<any | undefined>(undefined)
  const [purchaseLoading, setPurchaseLoading] = React.useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = React.useState(false)
  const [purchaseData, setPurchaseData] = React.useState<undefined | any>(undefined)
  const [mintQuantity, setMintQuantity] = React.useState(DEFAULT_MINT_QUANTITY)

  const { address } = useAccount()

  const saleStatus = useSaleStatus({ collectionData: collectionData })

  const { allowlistEntry, accessAllowed } = useAllowlistEntry({
    merkleRoot: saleStatus?.presaleMerkleRoot,
    address: address,
  })

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

  const { data: balanceOf } = useContractRead({
    /* @ts-ignore */
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: false,
    cacheOnBlock: true,
    enabled: false,
  })

  /* initialize contract */
  const { data: signer } = useSigner()

  const drop = React.useMemo(
    () => (signer ? new ERC721Drop__factory(signer).attach(collectionAddress) : null),
    [signer, collectionAddress]
  )

  const checkHasContract = React.useCallback(
    async (address: string) => {
      const code = await signer?.provider?.getCode(address)
      if ((code?.length || 0) <= 2) {
        console.error('Request is on the wrong network')
      }
    },
    [signer]
  )

  /* PublicSale Purchase */
  const purchase = React.useCallback(async () => {
    if (!drop || !collectionData?.salesConfig) return
    await checkHasContract(drop.address)
    try {
      const tx = await drop.purchase(mintQuantity.queryValue, {
        value: totalPurchasePrice,
      })
      setPurchaseLoading(true)
      setPurchaseData(tx)
      if (tx) {
        await tx.wait(2)
        setPurchaseLoading(false)
        setPurchaseSuccess(true)
        onSuccessCallback()
      }
      return tx
    } catch (err) {
      setError(err)
    }
  }, [drop, collectionData?.salesConfig, mintQuantity?.queryValue])

  /* PreSale Purchase */
  const purchasePresale = React.useCallback(
    async (quantity: number, allowlistEntry?: AllowListEntry) => {
      if (!drop || !allowlistEntry) return
      await checkHasContract(drop.address)
      try {
        const tx = await drop.purchasePresale(
          quantity,
          allowlistEntry.maxCanMint,
          BigNumber.from(allowlistEntry.price),
          allowlistEntry.proof.map((e: any) => `0x${e}`),
          {
            value: BigNumber.from(allowlistEntry.price).mul(BigNumber.from(quantity)),
          }
        )
        setPurchaseLoading(true)
        setPurchaseData(tx)
        if (tx) {
          await tx.wait(2)
          setPurchaseLoading(false)
          setPurchaseSuccess(true)
          onSuccessCallback()
        }
        return tx
      } catch (err) {
        setError(err)
      }
    },
    [drop]
  )

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

  const maxPerAddress = React.useMemo(() => {
    return saleStatus?.presaleIsActive && allowlistEntry
      ? allowlistEntry?.maxCanMint
      : Number(collectionData?.salesConfig?.maxSalePurchasePerAddress) || 1
  }, [collectionData, mintQuantity, saleStatus, allowlistEntry])

  const purchaseLimit = React.useMemo(() => {
    return {
      maxAmount: maxPerAddress,
      pastAmount: mintQuantity.queryValue > Number(maxPerAddress),
      prettyMaxAmount: maxPerAddress === 4294967295 ? '∞' : maxPerAddress,
    }
  }, [mintQuantity, maxPerAddress])

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
        walletLimit: balanceOf >= maxPerAddress,
        walletBalance: Number(balanceOf),
      }
    } catch (err) {
      console.error(err)
    }
  }, [purchaseLimit, balanceOf, maxPerAddress])

  const prettyPurchasePrice = React.useMemo(() => {
    try {
      return totalPurchasePrice ? ethers.utils.formatUnits(totalPurchasePrice) : ''
    } catch (err) {
      // console.error(err)
    }
  }, [totalPurchasePrice])

  /**
   * TODO: Remove the below
   */
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
        collectionAddress: collectionAddress,
        networkId: networkId,
        ipfsGateway,
        collectionData,
        onMintCallback: onMintCallback,
        purchase,
        purchasePresale,
        transaction: {
          purchaseData: purchaseData,
          purchaseLoading: purchaseLoading,
          purchaseSuccess: purchaseSuccess,
          txHash: purchaseData && purchaseData?.hash,
        },
        mintQuantity,
        setMintQuantity: handleUpdateMintQuantity,
        totalPrice: {
          raw: totalPurchasePrice,
          pretty: prettyPurchasePrice,
        },
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
        allowList: {
          allowlistEntry,
          accessAllowed,
        },
      }}>
      {children}
    </DropsContractContext.Provider>
  )
}

export function useDropsContractProvider() {
  return React.useContext(DropsContractContext)
}
