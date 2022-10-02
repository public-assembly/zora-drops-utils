/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'

export function TxStatus() {
  const {
    transaction: { purchaseLoading, purchaseSuccess, txHash },
  } = useDropsContractProvider()
  return (
    <p className={`drops-ui__tx`}>
      {purchaseLoading && (
        <span className="drops-ui__tx-processing-alert">Tx Processing</span>
      )}
      {purchaseSuccess && <span className="drops-ui__tx-success-alert">Minted!</span>}
      <br />
      {txHash && <span className="drops-ui__tx-hash">txHash</span>}
    </p>
  )
}
