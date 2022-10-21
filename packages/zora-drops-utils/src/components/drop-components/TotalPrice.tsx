/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'
import { MetaDataProps } from '../../typings'

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
