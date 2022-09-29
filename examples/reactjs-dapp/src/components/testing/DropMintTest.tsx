import React from "react";
import { DropsContractProvider, useDropsContractProvider, addIPFSGateway } from "@public-assembly/zora-drops-utils";

function MintUI() {
  const {
    collectionData: data,
    collectionAddress,
    mintQuantity,
    totalPrice,
    errors: {
      insufficientFunds
    },
    purchaseLimit: {
      maxAmount,
    },
    inventory: {
      prettyInventory
    },
    setMintQuantity,
    purchase
  } = useDropsContractProvider()
  
  const src = React.useMemo(() =>
    data?.editionMetadata?.imageURI ? addIPFSGateway(data?.editionMetadata?.imageURI) : '',
    [data, data?.editionMetadata?.imageURI])

  return (
    <div className="grid p-4 grid-cols-3 border border-solid border-1 rounded-xl gap-4">
      <div className="aspect-square h-full relative rounded-xl overflow-hidden shadow-sm">
        <img className="inset-0 absolute" src={src} />
      </div>
      <div className="flex flex-col col-span-2 h-full justify-between">
        <div>
          <h3 className="text-lg">{data?.name}</h3>
          <p>{collectionAddress}</p>
          <p>{data?.editionMetadata?.description}</p>
          <p>Maximum per address: {maxAmount}</p>
          <p>Sold: {prettyInventory} NFTs</p>
          <p>Price: {totalPrice?.pretty}Ξ</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="mint-quantity"
            step="1"
            min="1"
            max={maxAmount}
            value={mintQuantity?.name}
            onChange={setMintQuantity}
            className="form-input px-4 py-3 rounded-full"
          />
          <button
            onClick={purchase}
            className={`
            bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full
            ${insufficientFunds ? 'pointer-events-none opacity-30' : ''}
            `}
          >
          {!insufficientFunds
            ? <span>Purchase {mintQuantity?.name} NFT{`${mintQuantity?.queryValue > 1 ? 's' : ''}`}</span>
            : <span>Insufficient Funds</span>
          }
          </button>
        </div>
      </div>
      
    </div>
  )
}

export function DropMintTest({collectionAddress}: {collectionAddress: string}) {
  return (
    <DropsContractProvider
      collectionAddress={collectionAddress}
    >
      <MintUI />
    </DropsContractProvider>
  )
}