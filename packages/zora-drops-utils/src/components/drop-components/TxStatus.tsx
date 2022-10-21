/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

export function TxStatus({ ...props }) {
  const {
    transaction: { purchaseLoading, purchaseSuccess, txHash },
  } = useDropsContractProvider()
  return (
    <div className={`drops-ui__tx--component`} {...props}>
      <p className={`drops-ui__tx`}>
        {purchaseLoading && (
          <span className="drops-ui__tx-processing-alert">Tx Processing</span>
        )}
        {purchaseSuccess && <span className="drops-ui__tx-success-alert">Minted!</span>}
        <br />
        {txHash && <span className="drops-ui__tx-hash">txHash</span>}
      </p>
    </div>
  )
}
