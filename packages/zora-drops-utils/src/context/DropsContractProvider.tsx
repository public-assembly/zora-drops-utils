import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import zoraDropsABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json'
import { useSWRDrop } from '../hooks'

const DEFAULT_MINT_QUANTITY = {
  name: '1',
  queryValue: 1,
}

export type DropsContractProps = {
  children?: React.ReactNode
  collectionAddress?: string
}

export type DropsContractReturnTypes = {
  purchase?: () => void
  setMintQuantity?: React.ChangeEventHandler<HTMLInputElement>
  collectionData?: any
  collectionAddress?: string
  mintQuantity?: {
    name: string
    queryValue: number
  }
}

const DropsContractContext = React.createContext<DropsContractReturnTypes>({
  purchase: () => {},
  setMintQuantity: undefined,
  collectionData: undefined,
  collectionAddress: undefined,
  mintQuantity: DEFAULT_MINT_QUANTITY,
})

export function useDropsContractProvider() {
  return React.useContext(DropsContractContext)
}

export function DropsContractProvider({
  children,
  collectionAddress,
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

  const { config } = usePrepareContractWrite({
    addressOrName: collectionAddress,
    contractInterface: zoraDropsABI.abi,
    functionName: 'purchase',
    args: [mintQuantity.queryValue],
    overrides: {
      value: totalPurchasePrice,
    },
  })

  const { write: purchase } = useContractWrite(config)

  return (
    <DropsContractContext.Provider
      value={{
        purchase,
        mintQuantity,
        setMintQuantity: handleUpdateMintQuantity,
        collectionData,
        collectionAddress: collectionAddress,
      }}>
      {children}
    </DropsContractContext.Provider>
  )
}
