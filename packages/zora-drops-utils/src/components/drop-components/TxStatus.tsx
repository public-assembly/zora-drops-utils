/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

export function TxStatus({ ...props }) {
  const {
    transaction: { purchaseLoading, purchaseSuccess, txHash, purchaseWaitLoading },
    networkId,
  } = useDropsContractProvider()

  console.log('network id: ', networkId)

  return (
    <div className={`drops-ui__tx--component`} {...props}>
      <p className={`drops-ui__tx`}>
        {purchaseLoading || purchaseWaitLoading ? (
          <span className="drops-ui__tx-processing-alert">Tx Processing</span>
        ) : (
          <>
            {purchaseSuccess ? (
              <span className="drops-ui__tx-success-alert">Minted!</span>
            ) : null}
          </>
        )}
        <br />
        {txHash && (
          <a
            href={`${
              networkId == '1'
                ? 'https://etherscan.io/' + txHash
                : 'https://goerli.etherscan.io/' + txHash
            }`}
            className="drops-ui__tx-hash underline">
            txHash
          </a>
        )}
      </p>
    </div>
  )
}
