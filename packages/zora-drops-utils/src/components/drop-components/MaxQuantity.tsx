/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'
import { MetaDataProps } from '../../typings'

export function MaxQuantity({ label = 'Maximum per address:' }: MetaDataProps) {
  const { purchaseLimit } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--max-quantity`}>
      {label ? <span className="drops-ui__sales-info--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__sales-info--copy">{purchaseLimit?.prettyMaxAmount}</span>
    </p>
  )
}
