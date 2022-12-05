/* @ts-ignore */
import * as React from 'react'
import { useDropsContractProvider } from '../../context/DropsContractProvider'

interface TxFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  useOpenSea?: boolean
  useZoraMarket?: boolean
}

export function TxFeedback({
  useOpenSea = false,
  useZoraMarket = false,
  ...props
}: TxFeedbackProps) {
  const { transaction, networkId, collectionAddress } = useDropsContractProvider()

  if (!transaction?.txHash) return null

  return (
    <div className="mt-[15px]" {...props}>
      {transaction?.txHash && transaction?.purchaseLoading ? (
        <div>
          You're transaction is processing,{' '}
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href={`https://${networkId === '5' ? 'goerli.' : ''}etherscan.io/tx/${
              transaction?.txHash
            }`}>
            View on Etherscan
          </a>
        </div>
      ) : transaction?.txHash &&
        !transaction?.purchaseLoading &&
        transaction?.purchaseSuccess ? (
        <div className="flex flex-col gap-[3px]">
          <span>You're transaction was successfull!</span>
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href={`https://${networkId === '5' ? 'goerli.' : ''}etherscan.io/tx/${
              transaction?.txHash
            }`}>
            View on Etherscan
          </a>
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href={`https://${
              networkId === '5' ? 'testnet.' : ''
            }create.zora.co/collections/${collectionAddress}`}>
            View on Zora Create
          </a>
          {useZoraMarket && networkId === '1' && (
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href={`https://market.zora.co/collections/${collectionAddress}`}>
              View on Zora Marketplace
            </a>
          )}

          {useOpenSea && (
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href={`https://${
                networkId === '5' ? 'testnets.' : ''
              }opensea.io/assets?search[query]=${collectionAddress}`}>
              View on Opensea
            </a>
          )}
        </div>
      ) : null}
    </div>
  )
}
