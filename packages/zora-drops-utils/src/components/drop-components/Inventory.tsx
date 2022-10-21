/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'
import { MetaDataProps } from '../../typings'

export function Inventory({ label = 'NFTs sold:' }: MetaDataProps) {
  const { inventory } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--inventory`}>
      {label ? <span className="drops-ui__sales-info--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__sales-info--copy">{inventory?.prettyInventory}</span>
    </p>
  )
}
