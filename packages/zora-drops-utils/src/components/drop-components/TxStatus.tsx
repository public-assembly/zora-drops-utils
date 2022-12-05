/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

export function TxStatus({ ...props }) {
  const { transaction } = useDropsContractProvider()
  return (
    <div className={`drops-ui__tx--component`} {...props}>
      <p className={`drops-ui__tx`}>
        {transaction?.purchaseLoading && (
          <span className="drops-ui__tx-processing-alert">Tx Processing</span>
        )}
        {transaction?.purchaseSuccess && (
          <span className="drops-ui__tx-success-alert">Minted!</span>
        )}
        <br />
        {transaction?.txHash && (
          <span className="drops-ui__tx-hash">txHash: {transaction?.txHash}</span>
        )}
      </p>
    </div>
  )
}
