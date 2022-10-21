/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

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
