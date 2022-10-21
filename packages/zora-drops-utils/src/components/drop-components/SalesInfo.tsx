/* @ts-ignore */
import React from 'react'
import { CollectionAddress } from './CollectionAddress'
import { MaxQuantity } from './MaxQuantity'
import { Inventory } from './Inventory'
import { TotalPrice } from './TotalPrice'
import { SalesTiming } from './SalesTiming'
import { SaleActiveAlert } from './SaleActiveAlert'
import { SaleEndedAlert } from './SaleEndedAlert'
import { WalletBalance } from './WalletBalance'

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
