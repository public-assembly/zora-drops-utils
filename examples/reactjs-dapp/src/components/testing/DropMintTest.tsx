import { DropsContractProvider, useDropsContractProvider } from "@public-assembly/zora-drops-utils";

function MintUI() {
  const {
    collectionData,
    mintQuantity,
    setMintQuantity,
    purchase
  } = useDropsContractProvider()
  
  return (
    <div className="flex flex-col p-4 border border-solid border-1 rounded-xl">
      <div className="flex flex-col gap-2">
        {collectionData?.name}
        <input
          type="number"
          name="mint-quantity"
          step="1"
          min="1"
          value={mintQuantity?.name}
          onChange={setMintQuantity}
          className="form-input px-4 py-3 rounded-full"
        />
        <button onClick={purchase} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Purchase {mintQuantity?.name} NFT{`${mintQuantity?.queryValue > 1 ? 's' : ''}`}
        </button>
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