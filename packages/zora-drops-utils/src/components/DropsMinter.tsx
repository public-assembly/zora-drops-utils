/* @ts-ignore */
import * as React from 'react'
import { DropsContractProvider } from './../context/DropsContractProvider'
import { DropsContractProps } from '../typings'

import {
  Metadata,
  MintButton,
  MintQuantity,
  SalesInfo,
  Thumbnail,
  TxStatus,
} from './drop-components'

interface DropsMinter extends React.HTMLAttributes<HTMLElement> {}

export function DropsMinter({
  collectionAddress,
  networkId = '1',
  ipfsGateway,
  refreshInterval,
  ...props
}: DropsContractProps & DropsMinter) {
  if (!collectionAddress) return null
  return (
    <DropsContractProvider
      collectionAddress={collectionAddress}
      networkId={networkId}
      ipfsGateway={ipfsGateway}
      refreshInterval={refreshInterval}>
      <div
        className={`drops-ui__minter--wrapper border-1 grid w-full gap-4 rounded-xl border border-solid p-4`}
        {...props}>
        <div className="relative col-span-2 w-full">
          <Thumbnail />
        </div>
        <div className="drops-ui__minter--ui-wrapper col-span-2 flex h-full flex-col justify-between">
          <Metadata />
          <hr className="drops-ui__minter--separator my-2"></hr>
          <SalesInfo />
          <hr className="drops-ui__minter--separator my-2"></hr>
          <TxStatus />
          <div className="drops-ui__minter--form-wrapper grid grid-cols-2 gap-2">
            <MintButton className="flex w-full items-center" />
            <MintQuantity className="w-full" />
          </div>
        </div>
      </div>
    </DropsContractProvider>
  )
}
