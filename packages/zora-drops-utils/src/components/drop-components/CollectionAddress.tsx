/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'
import { MetaDataProps } from '../../typings'
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
