/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'
import { MetaDataProps } from '../../types'
import { shortenAddress } from '../../lib'

export function CollectionAddress({
  label = 'Collection address:',
  truncateAddress = false,
}: MetaDataProps & { truncateAddress?: boolean }) {
  const { collectionAddress } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--collection-address`}>
      {label ? <span className="drops-ui__sales-info--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__sales-info--copy">
        {truncateAddress ? shortenAddress(collectionAddress) : collectionAddress}
      </span>
    </p>
  )
}

export function MaxQuantity({ label = 'Maximum per address:' }: MetaDataProps) {
  const { purchaseLimit } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--max-quantity`}>
      {label ? <span className="drops-ui__sales-info--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__sales-info--copy">{purchaseLimit?.prettyMaxAmount}</span>
    </p>
  )
}

export function Inventory({ label = 'NFTs sold:' }: MetaDataProps) {
  const { inventory } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--inventory`}>
      {label ? <span className="drops-ui__sales-info--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__sales-info--copy">{inventory?.prettyInventory}</span>
    </p>
  )
}

/* TODO: make symbol prop */
export function TotalPrice({
  label = 'Total price:',
  ethSymbol = 'ETH',
}: MetaDataProps & { ethSymbol?: string }) {
  const { totalPrice } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--total-price`}>
      {label ? <span className="drops-ui__sales-info--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__sales-info--copy">
        {totalPrice?.pretty}
        <span className="drops-ui__sales-info--eth-symbol">{ethSymbol}</span>
      </span>
    </p>
  )
}

/* TODO: This could be cleaner */
export function SalesTiming({
  mintStartLabel = 'Minting Starts:',
  mintEndLabel = 'Minting Ends:',
}: {
  mintStartLabel?: string
  mintEndLabel?: string
}) {
  const { mintStatus } = useDropsContractProvider()
  if (mintStatus?.isEnded) return null
  return (
    <p className={`drops-ui__sales-info--sales-timing`}>
      <span className="drops-ui__sales-info--title">{mintStartLabel}&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{mintStatus?.startDate?.pretty}</span>
      {!mintStatus?.endDate?.pretty ? null : (
        <>
          <span className="drops-ui__sales-info--title">{mintEndLabel}&nbsp;</span>
          <span className="drops-ui__sales-info--copy">
            {JSON.stringify(mintStatus?.endDate, null, 2)}
          </span>
        </>
      )}
    </p>
  )
}

export function SaleActiveAlert() {
  const { mintStatus } = useDropsContractProvider()
  if (!mintStatus?.isActive) return null
  return (
    <p className={`drops-ui__sales-info--sale-active-alert`}>
      <span className="drops-ui__sales-info--alert">Minting Active</span>
    </p>
  )
}

export function SaleEndedAlert() {
  const { mintStatus } = useDropsContractProvider()
  if (!mintStatus?.isEnded) return null
  return (
    <p className={`drops-ui__sales-info--sale-ended-alert`}>
      <span className="drops-ui__sales-info--alert">Sale has ended</span>
    </p>
  )
}

export function WalletBalance() {
  const { balance } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--balance`}>
      <span className="drops-ui__sales-info--title">You Own:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">
        {balance?.walletBalance}&nbsp;NFT
        {`${balance?.walletBalance > 1 || balance?.walletBalance === 0 ? 's' : ''}`}
      </span>
    </p>
  )
}

export function SalesInfo({ useLabels, ...props }: { useLabels?: boolean }) {
  return (
    <div className={`drops-ui__sales-info--component`} {...props}>
      <CollectionAddress label={useLabels} />
      <MaxQuantity label={useLabels} />
      <Inventory label={useLabels} />
      <TotalPrice label={useLabels} />
      <SalesTiming />
      <SaleActiveAlert />
      <SaleEndedAlert />
      <WalletBalance />
    </div>
  )
}
