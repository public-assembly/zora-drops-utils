/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

export function SaleEndedAlert() {
  const { mintStatus } = useDropsContractProvider()
  if (!mintStatus?.isEnded) return null
  return (
    <p className={`drops-ui__sales-info--sale-ended-alert`}>
      <span className="drops-ui__sales-info--alert">Sale has ended</span>
    </p>
  )
}
