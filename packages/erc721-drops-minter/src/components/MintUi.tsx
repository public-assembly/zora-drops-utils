import React from 'react'
import {
  useDropsContractProvider,
  addIPFSGateway,
} from '@public-assembly/zora-drops-utils'
import { useEnsName } from 'wagmi'

export function MintUI() {
  const {
    collectionData: data,
    collectionAddress,
    mintQuantity,
    totalPrice,
    transaction: { purchaseLoading, purchaseSuccess, txHash },
    errors: { insufficientFunds },
    purchaseLimit: { maxAmount, prettyMaxAmount },
    inventory: { prettyInventory },
    balance: { walletBalance, walletLimit },
    mintStatus: { isActive, isEnded, startDate, endDate },
    setMintQuantity,
    purchase,
  } = useDropsContractProvider()

  const src = React.useMemo(
    () =>
      data?.editionMetadata?.imageURI
        ? addIPFSGateway(data?.editionMetadata?.imageURI)
        : '',
    [data, data?.editionMetadata?.imageURI]
  )

  const creator = React.useMemo(() => data?.creator && data?.creator, [data])

  const { data: ensName } = useEnsName({
    address: data?.creator,
  })

  return (
    <div className="border-1 grid grid-cols-3 gap-4 rounded-xl border border-solid p-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm">
        <img className="absolute inset-0 object-cover" src={src} />
      </div>
      <div className="col-span-2 flex h-full flex-col justify-between">
        <div>
          <h3 className="text-lg">{data?.name}</h3>
          <p>Artist: {ensName ? ensName : creator}</p>
          <p>{data?.editionMetadata?.description}</p>
          <hr className="my-2"></hr>
          <p>Collection Address: {collectionAddress}</p>
          <p>Maximum per address: {prettyMaxAmount}</p>
          <p>Sold: {prettyInventory} NFTs</p>
          <p>Price: {totalPrice?.pretty}Ξ</p>
          {!isEnded ? (
            <>
              <p>Minting Starts: {startDate?.pretty}</p>
              {!endDate?.pretty ? null : (
                <p>Minting Ends: {JSON.stringify(endDate, null, 2)}</p>
              )}
            </>
          ) : (
            <p>Sale has ended</p>
          )}
          {isActive && <p>Minting Active</p>}
          <p>
            You Own: {walletBalance} NFT
            {`${walletBalance > 1 || walletBalance === 0 ? 's' : ''}`}
          </p>
          <hr className="my-2"></hr>
        </div>
        <div>
          {purchaseLoading ? 'Tx Processing' : ''}
          {purchaseSuccess ? 'Minted!' : ''}
          <br />
          {txHash ? txHash : ''}
        </div>
        {!walletLimit ? (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="mint-quantity"
              step="1"
              min="1"
              max={maxAmount - Number(walletBalance)}
              value={mintQuantity?.name}
              onChange={setMintQuantity}
              className={`
                  form-input rounded-full px-4 py-3
                  ${insufficientFunds ? 'pointer-events-none opacity-30' : ''}
                `}
            />
            <button
              onClick={purchase}
              className={`
                drops-minter__mint-button border-1 border
                ${insufficientFunds ? 'pointer-events-none opacity-30' : ''}
                `}>
              {!insufficientFunds ? (
                <span>
                  Purchase {mintQuantity?.name} NFT
                  {`${mintQuantity?.queryValue > 1 || walletBalance === 0 ? 's' : ''}`}
                </span>
              ) : (
                <span>Insufficient Funds</span>
              )}
            </button>
          </div>
        ) : (
          <div className="py-4">
            <span>You have minted the maximum amount per wallet.</span>
          </div>
        )}
      </div>
    </div>
  )
}
