/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

export function SaleActiveAlert() {
  const { mintStatus } = useDropsContractProvider()
  if (!mintStatus?.isActive) return null
  return (
    <p className={`drops-ui__sales-info--sale-active-alert`}>
      <span className="drops-ui__sales-info--alert">Minting Active</span>
    </p>
  )
}
